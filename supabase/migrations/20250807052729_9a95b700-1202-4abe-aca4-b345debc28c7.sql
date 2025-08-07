-- 1. Проверка данных на дубликаты и NULL в Users.email
DO $$
BEGIN
  IF EXISTS (
    SELECT email
    FROM Users
    GROUP BY email
    HAVING COUNT(*) > 1 OR email IS NULL
  ) THEN
    RAISE EXCEPTION 'Users table contains duplicate or NULL emails. Please fix before migration.';
  END IF;
END $$;

-- 2. Создание таблицы profiles (если ещё не создана)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY,
  first_name text,
  last_name text,
  email text UNIQUE,
  role_id bigint REFERENCES UserRoles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Создание временной таблицы для маппинга bigint -> uuid
CREATE TEMP TABLE user_id_mapping (
  old_id bigint PRIMARY KEY,
  new_id uuid
);

-- 4. Перенос данных из Users в profiles и заполнение user_id_mapping
INSERT INTO profiles (id, first_name, last_name, email, role_id, created_at, updated_at)
SELECT gen_random_uuid(), first_name, last_name, email, role_id, registration_date, registration_date
FROM Users
ON CONFLICT (email) DO NOTHING;

INSERT INTO user_id_mapping (old_id, new_id)
SELECT u.id, p.id
FROM Users u
JOIN profiles p ON u.email = p.email;

-- 5. Проверка, что все user_id из зависимых таблиц имеют соответствие
DO $$
BEGIN
  IF EXISTS (
    SELECT user_id
    FROM UserAchievements
    WHERE user_id NOT IN (SELECT old_id FROM user_id_mapping)
  ) THEN
    RAISE EXCEPTION 'Some user_id in UserAchievements do not have a mapping in user_id_mapping';
  END IF;
  IF EXISTS (
    SELECT user_id
    FROM KPI
    WHERE user_id NOT IN (SELECT old_id FROM user_id_mapping)
  ) THEN
    RAISE EXCEPTION 'Some user_id in KPI do not have a mapping in user_id_mapping';
  END IF;
  IF EXISTS (
    SELECT user_id
    FROM ProcessData
    WHERE user_id NOT IN (SELECT old_id FROM user_id_mapping)
  ) THEN
    RAISE EXCEPTION 'Some user_id in ProcessData do not have a mapping in user_id_mapping';
  END IF;
  IF EXISTS (
    SELECT user_id
    FROM UserDataRelations
    WHERE user_id NOT IN (SELECT old_id FROM user_id_mapping)
  ) THEN
    RAISE EXCEPTION 'Some user_id in UserDataRelations do not have a mapping in user_id_mapping';
  END IF;
  IF EXISTS (
    SELECT user_id
    FROM AssessmentData
    WHERE user_id NOT IN (SELECT old_id FROM user_id_mapping)
  ) THEN
    RAISE EXCEPTION 'Some user_id in AssessmentData do not have a mapping in user_id_mapping';
  END IF;
  IF EXISTS (
    SELECT user_id
    FROM DiagnosticData
    WHERE user_id NOT IN (SELECT old_id FROM user_id_mapping)
  ) THEN
    RAISE EXCEPTION 'Some user_id in DiagnosticData do not have a mapping in user_id_mapping';
  END IF;
  IF EXISTS (
    SELECT user_id
    FROM CuratorActions
    WHERE user_id NOT IN (SELECT old_id FROM user_id_mapping)
  ) THEN
    RAISE EXCEPTION 'Some user_id in CuratorActions do not have a mapping in user_id_mapping';
  END IF;
  IF EXISTS (
    SELECT curator_id
    FROM CuratorActions
    WHERE curator_id NOT IN (SELECT old_id FROM user_id_mapping)
  ) THEN
    RAISE EXCEPTION 'Some curator_id in CuratorActions do not have a mapping in user_id_mapping';
  END IF;
  IF EXISTS (
    SELECT user_id
    FROM ExperienceData
    WHERE user_id NOT IN (SELECT old_id FROM user_id_mapping)
  ) THEN
    RAISE EXCEPTION 'Some user_id in ExperienceData do not have a mapping in user_id_mapping';
  END IF;
  IF EXISTS (
    SELECT user_id
    FROM Intentions
    WHERE user_id NOT IN (SELECT old_id FROM user_id_mapping)
  ) THEN
    RAISE EXCEPTION 'Some user_id in Intentions do not have a mapping in user_id_mapping';
  END IF;
  IF EXISTS (
    SELECT user_id
    FROM Interactions
    WHERE user_id NOT IN (SELECT old_id FROM user_id_mapping)
  ) THEN
    RAISE EXCEPTION 'Some user_id in Interactions do not have a mapping in user_id_mapping';
  END IF;
  IF EXISTS (
    SELECT user_id
    FROM StateData
    WHERE user_id NOT IN (SELECT old_id FROM user_id_mapping)
  ) THEN
    RAISE EXCEPTION 'Some user_id in StateData do not have a mapping in user_id_mapping';
  END IF;
  IF EXISTS (
    SELECT user_id
    FROM ParticipationData
    WHERE user_id NOT IN (SELECT old_id FROM user_id_mapping)
  ) THEN
    RAISE EXCEPTION 'Some user_id in ParticipationData do not have a mapping in user_id_mapping';
  END IF;
END $$;

-- 6. Обновление user_id и curator_id в таблицах с использованием user_id_mapping
ALTER TABLE UserAchievements ADD COLUMN temp_user_id uuid;
UPDATE UserAchievements
SET temp_user_id = (SELECT new_id FROM user_id_mapping WHERE old_id = user_id);
ALTER TABLE UserAchievements DROP CONSTRAINT user_achievements_user_id_fkey;
ALTER TABLE UserAchievements DROP COLUMN user_id;
ALTER TABLE UserAchievements RENAME COLUMN temp_user_id TO user_id;
ALTER TABLE UserAchievements ADD CONSTRAINT user_achievements_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id);

ALTER TABLE KPI ADD COLUMN temp_user_id uuid;
UPDATE KPI
SET temp_user_id = (SELECT new_id FROM user_id_mapping WHERE old_id = user_id);
ALTER TABLE KPI DROP CONSTRAINT kpi_user_id_fkey;
ALTER TABLE KPI DROP COLUMN user_id;
ALTER TABLE KPI RENAME COLUMN temp_user_id TO user_id;
ALTER TABLE KPI ADD CONSTRAINT kpi_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id);

ALTER TABLE ProcessData ADD COLUMN temp_user_id uuid;
UPDATE ProcessData
SET temp_user_id = (SELECT new_id FROM user_id_mapping WHERE old_id = user_id);
ALTER TABLE ProcessData DROP CONSTRAINT process_data_user_id_fkey;
ALTER TABLE ProcessData DROP COLUMN user_id;
ALTER TABLE ProcessData RENAME COLUMN temp_user_id TO user_id;
ALTER TABLE ProcessData ADD CONSTRAINT process_data_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id);

ALTER TABLE UserDataRelations ADD COLUMN temp_user_id uuid;
UPDATE UserDataRelations
SET temp_user_id = (SELECT new_id FROM user_id_mapping WHERE old_id = user_id);
ALTER TABLE UserDataRelations DROP CONSTRAINT user_data_relations_user_id_fkey;
ALTER TABLE UserDataRelations DROP COLUMN user_id;
ALTER TABLE UserDataRelations RENAME COLUMN temp_user_id TO user_id;
ALTER TABLE UserDataRelations ADD CONSTRAINT user_data_relations_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id);

ALTER TABLE AssessmentData ADD COLUMN temp_user_id uuid;
UPDATE AssessmentData
SET temp_user_id = (SELECT new_id FROM user_id_mapping WHERE old_id = user_id);
ALTER TABLE AssessmentData DROP CONSTRAINT assessment_data_user_id_fkey;
ALTER TABLE AssessmentData DROP COLUMN user_id;
ALTER TABLE AssessmentData RENAME COLUMN temp_user_id TO user_id;
ALTER TABLE AssessmentData ADD CONSTRAINT assessment_data_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id);

ALTER TABLE DiagnosticData ADD COLUMN temp_user_id uuid;
UPDATE DiagnosticData
SET temp_user_id = (SELECT new_id FROM user_id_mapping WHERE old_id = user_id);
ALTER TABLE DiagnosticData DROP CONSTRAINT diagnostic_data_user_id_fkey;
ALTER TABLE DiagnosticData DROP COLUMN user_id;
ALTER TABLE DiagnosticData RENAME COLUMN temp_user_id TO user_id;
ALTER TABLE DiagnosticData ADD CONSTRAINT diagnostic_data_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id);

ALTER TABLE CuratorActions ADD COLUMN temp_user_id uuid;
ALTER TABLE CuratorActions ADD COLUMN temp_curator_id uuid;
UPDATE CuratorActions
SET temp_user_id = (SELECT new_id FROM user_id_mapping WHERE old_id = user_id),
    temp_curator_id = (SELECT new_id FROM user_id_mapping WHERE old_id = curator_id);
ALTER TABLE CuratorActions DROP CONSTRAINT curator_actions_user_id_fkey;
ALTER TABLE CuratorActions DROP CONSTRAINT curator_actions_curator_id_fkey;
ALTER TABLE CuratorActions DROP COLUMN user_id;
ALTER TABLE CuratorActions DROP COLUMN curator_id;
ALTER TABLE CuratorActions RENAME COLUMN temp_user_id TO user_id;
ALTER TABLE CuratorActions RENAME COLUMN temp_curator_id TO curator_id;
ALTER TABLE CuratorActions ADD CONSTRAINT curator_actions_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id);
ALTER TABLE CuratorActions ADD CONSTRAINT curator_actions_curator_id_fkey FOREIGN KEY (curator_id) REFERENCES profiles(id);

ALTER TABLE ExperienceData ADD COLUMN temp_user_id uuid;
UPDATE ExperienceData
SET temp_user_id = (SELECT new_id FROM user_id_mapping WHERE old_id = user_id);
ALTER TABLE ExperienceData DROP CONSTRAINT experience_data_user_id_fkey;
ALTER TABLE ExperienceData DROP COLUMN user_id;
ALTER TABLE ExperienceData RENAME COLUMN temp_user_id TO user_id;
ALTER TABLE ExperienceData ADD CONSTRAINT experience_data_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id);

ALTER TABLE Intentions ADD COLUMN temp_user_id uuid;
UPDATE Intentions
SET temp_user_id = (SELECT new_id FROM user_id_mapping WHERE old_id = user_id);
ALTER TABLE Intentions DROP CONSTRAINT intentions_user_id_fkey;
ALTER TABLE Intentions DROP COLUMN user_id;
ALTER TABLE Intentions RENAME COLUMN temp_user_id TO user_id;
ALTER TABLE Intentions ADD CONSTRAINT intentions_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id);

ALTER TABLE Interactions ADD COLUMN temp_user_id uuid;
UPDATE Interactions
SET temp_user_id = (SELECT new_id FROM user_id_mapping WHERE old_id = user_id);
ALTER TABLE Interactions DROP CONSTRAINT interactions_user_id_fkey;
ALTER TABLE Interactions DROP COLUMN user_id;
ALTER TABLE Interactions RENAME COLUMN temp_user_id TO user_id;
ALTER TABLE Interactions ADD CONSTRAINT interactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id);

ALTER TABLE StateData ADD COLUMN temp_user_id uuid;
UPDATE StateData
SET temp_user_id = (SELECT new_id FROM user_id_mapping WHERE old_id = user_id);
ALTER TABLE StateData DROP CONSTRAINT state_data_user_id_fkey;
ALTER TABLE StateData DROP COLUMN user_id;
ALTER TABLE StateData RENAME COLUMN temp_user_id TO user_id;
ALTER TABLE StateData ADD CONSTRAINT state_data_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id);

ALTER TABLE ParticipationData ADD COLUMN temp_user_id uuid;
UPDATE ParticipationData
SET temp_user_id = (SELECT new_id FROM user_id_mapping WHERE old_id = user_id);
ALTER TABLE ParticipationData DROP CONSTRAINT participation_data_user_id_fkey;
ALTER TABLE ParticipationData DROP COLUMN user_id;
ALTER TABLE ParticipationData RENAME COLUMN temp_user_id TO user_id;
ALTER TABLE ParticipationData ADD CONSTRAINT participation_data_user_id_fkey FOREIGN KEY (user_id) REFERENCES profiles(id);

-- 7. Удаление старой таблицы Users с CASCADE
DROP TABLE Users CASCADE;

-- 8. Удаление временной таблицы
DROP TABLE user_id_mapping;

-- 9. Обновление триггера updated_at для profiles
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();