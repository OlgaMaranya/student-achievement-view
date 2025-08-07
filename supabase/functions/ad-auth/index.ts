import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ADUser {
  userPrincipalName: string
  displayName: string
  givenName: string
  surname: string
  mail: string
  department?: string
  jobTitle?: string
  employeeId?: string
}

interface ADAuthRequest {
  username: string
  password: string
  domain: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Метод не поддерживается' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const { username, password, domain }: ADAuthRequest = await req.json()

    console.log(`Попытка аутентификации пользователя: ${username}@${domain}`)

    // Здесь будет интеграция с вашей системой AD
    // Для демонстрации создаем mock-аутентификацию
    const isValidUser = await authenticateWithAD(username, password, domain)
    
    if (!isValidUser) {
      return new Response(
        JSON.stringify({ error: 'Неверные учетные данные' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Получаем информацию о пользователе из AD
    const adUser = await getUserFromAD(username, domain)
    
    if (!adUser) {
      return new Response(
        JSON.stringify({ error: 'Пользователь не найден в AD' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Проверяем существует ли профиль пользователя
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', adUser.mail)
      .single()

    let profile = existingProfile

    // Если профиль не существует, создаем его
    if (!profile) {
      const { data: newProfile, error: profileError } = await supabase
        .from('profiles')
        .insert({
          email: adUser.mail,
          first_name: adUser.givenName,
          last_name: adUser.surname,
          display_name: adUser.displayName,
          department: adUser.department,
          job_title: adUser.jobTitle,
          employee_id: adUser.employeeId,
          ad_username: username,
          ad_domain: domain
        })
        .select()
        .single()

      if (profileError) {
        console.error('Ошибка создания профиля:', profileError)
        return new Response(
          JSON.stringify({ error: 'Ошибка создания профиля пользователя' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      profile = newProfile
    } else {
      // Обновляем существующий профиль актуальными данными из AD
      const { data: updatedProfile, error: updateError } = await supabase
        .from('profiles')
        .update({
          first_name: adUser.givenName,
          last_name: adUser.surname,
          display_name: adUser.displayName,
          department: adUser.department,
          job_title: adUser.jobTitle,
          employee_id: adUser.employeeId,
          ad_username: username,
          ad_domain: domain,
          last_login: new Date().toISOString()
        })
        .eq('id', profile.id)
        .select()
        .single()

      if (updateError) {
        console.error('Ошибка обновления профиля:', updateError)
      } else {
        profile = updatedProfile
      }
    }

    // Генерируем JWT токен для сессии
    const sessionToken = await generateSessionToken(profile)

    console.log(`Успешная аутентификация пользователя: ${adUser.displayName}`)

    return new Response(
      JSON.stringify({
        success: true,
        user: profile,
        token: sessionToken,
        message: 'Аутентификация прошла успешно'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Ошибка в ad-auth:', error)
    return new Response(
      JSON.stringify({ error: 'Внутренняя ошибка сервера' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

// Функция аутентификации с AD (здесь интегрируйте с вашей системой)
async function authenticateWithAD(username: string, password: string, domain: string): Promise<boolean> {
  // TODO: Заменить на реальную интеграцию с вашим AD
  // Здесь должна быть логика подключения к AD через LDAP или API
  
  console.log(`Проверка учетных данных для ${username}@${domain}`)
  
  // Mock-аутентификация для демонстрации
  // В реальности здесь будет вызов к вашему AD сервису
  const validUsers = ['admin', 'user1', 'teacher1', 'student1']
  return validUsers.includes(username) && password.length >= 6
}

// Функция получения информации пользователя из AD
async function getUserFromAD(username: string, domain: string): Promise<ADUser | null> {
  // TODO: Заменить на реальную интеграцию с вашим AD
  // Здесь должна быть логика получения данных пользователя из AD
  
  console.log(`Получение данных пользователя ${username}@${domain} из AD`)
  
  // Mock-данные для демонстрации
  const mockUsers: Record<string, ADUser> = {
    'admin': {
      userPrincipalName: `admin@${domain}`,
      displayName: 'Администратор Системы',
      givenName: 'Администратор',
      surname: 'Системы',
      mail: `admin@${domain}`,
      department: 'IT Отдел',
      jobTitle: 'Системный администратор',
      employeeId: '001'
    },
    'teacher1': {
      userPrincipalName: `teacher1@${domain}`,
      displayName: 'Иван Петров',
      givenName: 'Иван',
      surname: 'Петров',
      mail: `teacher1@${domain}`,
      department: 'Кафедра математики',
      jobTitle: 'Преподаватель',
      employeeId: '101'
    },
    'student1': {
      userPrincipalName: `student1@${domain}`,
      displayName: 'Анна Сидорова',
      givenName: 'Анна',
      surname: 'Сидорова',
      mail: `student1@${domain}`,
      department: 'Факультет информатики',
      jobTitle: 'Студент',
      employeeId: '2024001'
    }
  }
  
  return mockUsers[username] || null
}

// Функция генерации JWT токена сессии
async function generateSessionToken(profile: any): Promise<string> {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }
  
  const payload = {
    sub: profile.id,
    email: profile.email,
    name: profile.display_name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 часа
  }
  
  // Простая реализация JWT для демонстрации
  const encodedHeader = btoa(JSON.stringify(header))
  const encodedPayload = btoa(JSON.stringify(payload))
  const signature = btoa(`${encodedHeader}.${encodedPayload}.secret`)
  
  return `${encodedHeader}.${encodedPayload}.${signature}`
}