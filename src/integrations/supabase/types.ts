export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string
          control_body: string | null
          id: number
          inserted_at: string
          level_id: number
          points: number
          title: string
          type_id: number
          updated_at: string
          validity_period: string | null
        }
        Insert: {
          category: string
          control_body?: string | null
          id?: number
          inserted_at?: string
          level_id: number
          points: number
          title: string
          type_id: number
          updated_at?: string
          validity_period?: string | null
        }
        Update: {
          category?: string
          control_body?: string | null
          id?: number
          inserted_at?: string
          level_id?: number
          points?: number
          title?: string
          type_id?: number
          updated_at?: string
          validity_period?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "achievements_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "achievements_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "typesofachievements"
            referencedColumns: ["id"]
          },
        ]
      }
      activities: {
        Row: {
          activity_name: string
          description: string | null
          id: number
          inserted_at: string
          updated_at: string
        }
        Insert: {
          activity_name: string
          description?: string | null
          id?: number
          inserted_at?: string
          updated_at?: string
        }
        Update: {
          activity_name?: string
          description?: string | null
          id?: number
          inserted_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      activitydescriptions: {
        Row: {
          activity_name: string
          description: string | null
          end_date: string | null
          id: number
          inserted_at: string
          level_id: number | null
          start_date: string | null
          type_id: number | null
          updated_at: string
        }
        Insert: {
          activity_name: string
          description?: string | null
          end_date?: string | null
          id?: number
          inserted_at?: string
          level_id?: number | null
          start_date?: string | null
          type_id?: number | null
          updated_at?: string
        }
        Update: {
          activity_name?: string
          description?: string | null
          end_date?: string | null
          id?: number
          inserted_at?: string
          level_id?: number | null
          start_date?: string | null
          type_id?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_descriptions_level_id_fkey"
            columns: ["level_id"]
            isOneToOne: false
            referencedRelation: "levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "activity_descriptions_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "typesofachievements"
            referencedColumns: ["id"]
          },
        ]
      }
      assessmentdata: {
        Row: {
          feedback: string | null
          id: number
          inserted_at: string
          score_value: number
          timestamp: string
          type_id: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          feedback?: string | null
          id?: number
          inserted_at?: string
          score_value: number
          timestamp: string
          type_id: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          feedback?: string | null
          id?: number
          inserted_at?: string
          score_value?: number
          timestamp?: string
          type_id?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_data_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "assessmenttypes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      assessmenttypes: {
        Row: {
          id: number
          inserted_at: string
          type_name: string
          updated_at: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          type_name: string
          updated_at?: string
        }
        Update: {
          id?: number
          inserted_at?: string
          type_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      competencies: {
        Row: {
          competency_name: string
          description: string | null
          id: number
          inserted_at: string
          updated_at: string
        }
        Insert: {
          competency_name: string
          description?: string | null
          id?: number
          inserted_at?: string
          updated_at?: string
        }
        Update: {
          competency_name?: string
          description?: string | null
          id?: number
          inserted_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          course_name: string
          description: string | null
          duration: number
          id: number
          inserted_at: string
          updated_at: string
        }
        Insert: {
          course_name: string
          description?: string | null
          duration: number
          id?: number
          inserted_at?: string
          updated_at?: string
        }
        Update: {
          course_name?: string
          description?: string | null
          duration?: number
          id?: number
          inserted_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      curatoractions: {
        Row: {
          action_type: string
          curator_id: string | null
          id: number
          inserted_at: string
          timestamp: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          action_type: string
          curator_id?: string | null
          id?: number
          inserted_at?: string
          timestamp: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          action_type?: string
          curator_id?: string | null
          id?: number
          inserted_at?: string
          timestamp?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "curator_actions_curator_id_fkey"
            columns: ["curator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curator_actions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnosticdata: {
        Row: {
          competency_id: number
          id: number
          inserted_at: string
          result_value: number
          timestamp: string
          tool_id: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          competency_id: number
          id?: number
          inserted_at?: string
          result_value: number
          timestamp: string
          tool_id: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          competency_id?: number
          id?: number
          inserted_at?: string
          result_value?: number
          timestamp?: string
          tool_id?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "diagnostic_data_competency_id_fkey"
            columns: ["competency_id"]
            isOneToOne: false
            referencedRelation: "competencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diagnostic_data_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "diagnostictools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diagnostic_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnostictools: {
        Row: {
          description: string | null
          id: number
          inserted_at: string
          tool_name: string
          updated_at: string
        }
        Insert: {
          description?: string | null
          id?: number
          inserted_at?: string
          tool_name: string
          updated_at?: string
        }
        Update: {
          description?: string | null
          id?: number
          inserted_at?: string
          tool_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      educationalcontent: {
        Row: {
          course_id: number
          creation_date: string
          description: string | null
          id: number
          inserted_at: string
          module_id: number
          title: string
          updated_at: string
        }
        Insert: {
          course_id: number
          creation_date: string
          description?: string | null
          id?: number
          inserted_at?: string
          module_id: number
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: number
          creation_date?: string
          description?: string | null
          id?: number
          inserted_at?: string
          module_id?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "educational_content_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "educational_content_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      employers: {
        Row: {
          company_name: string
          contact_info: string | null
          id: number
          inserted_at: string
          role_id: number
          updated_at: string
        }
        Insert: {
          company_name: string
          contact_info?: string | null
          id?: number
          inserted_at?: string
          role_id: number
          updated_at?: string
        }
        Update: {
          company_name?: string
          contact_info?: string | null
          id?: number
          inserted_at?: string
          role_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employers_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "userroles"
            referencedColumns: ["id"]
          },
        ]
      }
      experiencedata: {
        Row: {
          activity_id: number
          criteria: string | null
          goal: string | null
          id: number
          inserted_at: string
          outcome: string | null
          task: string | null
          timestamp: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          activity_id: number
          criteria?: string | null
          goal?: string | null
          id?: number
          inserted_at?: string
          outcome?: string | null
          task?: string | null
          timestamp: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          activity_id?: number
          criteria?: string | null
          goal?: string | null
          id?: number
          inserted_at?: string
          outcome?: string | null
          task?: string | null
          timestamp?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "experience_data_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experience_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      intentions: {
        Row: {
          category_id: number
          description: string
          id: number
          inserted_at: string
          source: string
          timestamp: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category_id: number
          description: string
          id?: number
          inserted_at?: string
          source: string
          timestamp: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category_id?: number
          description?: string
          id?: number
          inserted_at?: string
          source?: string
          timestamp?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "intentions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "preferencecategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "intentions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      interactions: {
        Row: {
          action_type: string
          content_id: number
          id: number
          inserted_at: string
          timestamp: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          action_type: string
          content_id: number
          id?: number
          inserted_at?: string
          timestamp: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          action_type?: string
          content_id?: number
          id?: number
          inserted_at?: string
          timestamp?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interactions_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "educationalcontent"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      kpi: {
        Row: {
          academic_rating: number
          cultural_rating: number
          id: number
          inserted_at: string
          scientific_rating: number
          semester_rating: number
          social_rating: number
          sports_rating: number
          total_points: number
          updated_at: string
          user_id: string | null
          valid_from: string
          valid_to: string | null
        }
        Insert: {
          academic_rating: number
          cultural_rating: number
          id?: number
          inserted_at?: string
          scientific_rating: number
          semester_rating: number
          social_rating: number
          sports_rating: number
          total_points: number
          updated_at?: string
          user_id?: string | null
          valid_from: string
          valid_to?: string | null
        }
        Update: {
          academic_rating?: number
          cultural_rating?: number
          id?: number
          inserted_at?: string
          scientific_rating?: number
          semester_rating?: number
          social_rating?: number
          sports_rating?: number
          total_points?: number
          updated_at?: string
          user_id?: string | null
          valid_from?: string
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kpi_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      levels: {
        Row: {
          id: number
          inserted_at: string
          name: string
          updated_at: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          name: string
          updated_at?: string
        }
        Update: {
          id?: number
          inserted_at?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      modules: {
        Row: {
          course_id: number
          id: number
          inserted_at: string
          module_name: string
          updated_at: string
        }
        Insert: {
          course_id: number
          id?: number
          inserted_at?: string
          module_name: string
          updated_at?: string
        }
        Update: {
          course_id?: number
          id?: number
          inserted_at?: string
          module_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      participationdata: {
        Row: {
          activity_id: number
          contribution: string | null
          employer_id: number | null
          id: number
          inserted_at: string
          role: string
          timestamp: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          activity_id: number
          contribution?: string | null
          employer_id?: number | null
          id?: number
          inserted_at?: string
          role: string
          timestamp: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          activity_id?: number
          contribution?: string | null
          employer_id?: number | null
          id?: number
          inserted_at?: string
          role?: string
          timestamp?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participation_data_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participation_data_employer_id_fkey"
            columns: ["employer_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participation_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      partnerrequests: {
        Row: {
          competencies: string
          deadline: string
          id: number
          inserted_at: string
          partner_id: number
          status: string
          timestamp: string
          updated_at: string
        }
        Insert: {
          competencies: string
          deadline: string
          id?: number
          inserted_at?: string
          partner_id: number
          status: string
          timestamp: string
          updated_at?: string
        }
        Update: {
          competencies?: string
          deadline?: string
          id?: number
          inserted_at?: string
          partner_id?: number
          status?: string
          timestamp?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_requests_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      preferencecategories: {
        Row: {
          category_name: string
          id: number
          inserted_at: string
          updated_at: string
        }
        Insert: {
          category_name: string
          id?: number
          inserted_at?: string
          updated_at?: string
        }
        Update: {
          category_name?: string
          id?: number
          inserted_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      processdata: {
        Row: {
          action_type: string
          course_id: number
          id: number
          inserted_at: string
          timestamp: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          action_type: string
          course_id: number
          id?: number
          inserted_at?: string
          timestamp: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          action_type?: string
          course_id?: number
          id?: number
          inserted_at?: string
          timestamp?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "process_data_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "process_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          role_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          role_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "userroles"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          description: string | null
          end_date: string
          id: number
          inserted_at: string
          partner_id: number
          start_date: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          description?: string | null
          end_date: string
          id?: number
          inserted_at?: string
          partner_id: number
          start_date: string
          status: string
          title: string
          updated_at?: string
        }
        Update: {
          description?: string | null
          end_date?: string
          id?: number
          inserted_at?: string
          partner_id?: number
          start_date?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "employers"
            referencedColumns: ["id"]
          },
        ]
      }
      statecategories: {
        Row: {
          category_name: string
          id: number
          inserted_at: string
          updated_at: string
        }
        Insert: {
          category_name: string
          id?: number
          inserted_at?: string
          updated_at?: string
        }
        Update: {
          category_name?: string
          id?: number
          inserted_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      statedata: {
        Row: {
          category_id: number
          id: number
          inserted_at: string
          measurement_value: number
          timestamp: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          category_id: number
          id?: number
          inserted_at?: string
          measurement_value: number
          timestamp: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          category_id?: number
          id?: number
          inserted_at?: string
          measurement_value?: number
          timestamp?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "state_data_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "statecategories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "state_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      typesofachievements: {
        Row: {
          id: number
          inserted_at: string
          name: string
          updated_at: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          name: string
          updated_at?: string
        }
        Update: {
          id?: number
          inserted_at?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      userachievements: {
        Row: {
          achievement_id: number
          date_received: string
          document_confirmation: string | null
          id: number
          inserted_at: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          achievement_id: number
          date_received: string
          document_confirmation?: string | null
          id?: number
          inserted_at?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          achievement_id?: number
          date_received?: string
          document_confirmation?: string | null
          id?: number
          inserted_at?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      userdatarelations: {
        Row: {
          assessment_id: number | null
          diagnostic_id: number | null
          id: number
          inserted_at: string
          intention_id: number | null
          participation_id: number | null
          process_id: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assessment_id?: number | null
          diagnostic_id?: number | null
          id?: number
          inserted_at?: string
          intention_id?: number | null
          participation_id?: number | null
          process_id?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assessment_id?: number | null
          diagnostic_id?: number | null
          id?: number
          inserted_at?: string
          intention_id?: number | null
          participation_id?: number | null
          process_id?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_data_relations_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessmentdata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_data_relations_diagnostic_id_fkey"
            columns: ["diagnostic_id"]
            isOneToOne: false
            referencedRelation: "diagnosticdata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_data_relations_intention_id_fkey"
            columns: ["intention_id"]
            isOneToOne: false
            referencedRelation: "intentions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_data_relations_participation_id_fkey"
            columns: ["participation_id"]
            isOneToOne: false
            referencedRelation: "participationdata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_data_relations_process_id_fkey"
            columns: ["process_id"]
            isOneToOne: false
            referencedRelation: "processdata"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_data_relations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      userroles: {
        Row: {
          id: number
          inserted_at: string
          role_name: string
          updated_at: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          role_name: string
          updated_at?: string
        }
        Update: {
          id?: number
          inserted_at?: string
          role_name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
