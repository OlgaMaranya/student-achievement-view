import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
  display_name?: string
  department?: string
  job_title?: string
  employee_id?: string
  ad_username?: string
  ad_domain?: string
  role_id?: number
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (username: string, password: string, domain: string) => Promise<boolean>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Проверяем существующую сессию при загрузке
  useEffect(() => {
    checkExistingSession()
  }, [])

  const checkExistingSession = async () => {
    try {
      const token = localStorage.getItem('ad_session_token')
      const userData = localStorage.getItem('ad_user_data')
      
      if (token && userData) {
        // Проверяем валидность токена
        if (isTokenValid(token)) {
          setUser(JSON.parse(userData))
        } else {
          // Токен истек, очищаем данные
          localStorage.removeItem('ad_session_token')
          localStorage.removeItem('ad_user_data')
        }
      }
    } catch (error) {
      console.error('Ошибка проверки сессии:', error)
      localStorage.removeItem('ad_session_token')
      localStorage.removeItem('ad_user_data')
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (username: string, password: string, domain: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ad-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({ username, password, domain })
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Ошибка авторизации:', data.error)
        return false
      }

      if (data.success) {
        // Сохраняем данные сессии
        localStorage.setItem('ad_session_token', data.token)
        localStorage.setItem('ad_user_data', JSON.stringify(data.user))
        setUser(data.user)
        return true
      }

      return false
    } catch (error) {
      console.error('Ошибка при входе:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('ad_session_token')
    localStorage.removeItem('ad_user_data')
    setUser(null)
  }

  const refreshUser = async () => {
    // Обновляем данные пользователя из системы
    await checkExistingSession()
  }

  const isTokenValid = (token: string): boolean => {
    try {
      // Простая проверка JWT токена
      const parts = token.split('.')
      if (parts.length !== 3) return false
      
      const payload = JSON.parse(atob(parts[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      
      return payload.exp > currentTime
    } catch {
      return false
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}