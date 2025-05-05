
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Типы для аутентификации
interface User {
  id: number;
  username: string;
  role: 'admin' | 'moderator';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

// Создание контекста
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Хук для удобного доступа к контексту
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Провайдер аутентификации
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Проверяем авторизацию при загрузке компонента
  useEffect(() => {
    checkAuth();
  }, []);

  // Проверка аутентификации
  const checkAuth = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      // В реальном API здесь был бы запрос к серверу
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return false;
      }
      
      // Имитация запроса к API для проверки токена
      // В реальном приложении здесь будет запрос к серверу
      setTimeout(() => {
        // Получаем пользователя из localStorage для демонстрации
        const userData = localStorage.getItem('auth_user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
        setIsLoading(false);
      }, 500);
      
      return true;
    } catch (error) {
      console.error('Authentication check failed', error);
      setUser(null);
      setIsLoading(false);
      return false;
    }
  };

  // Логин пользователя
  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Здесь будет реальный API запрос
      // Для демонстрации используем моковый ответ
      
      // Моковые данные для демонстрации
      if (username === 'admin' && password === 'password') {
        const userData: User = {
          id: 1,
          username: 'admin',
          role: 'admin'
        };
        
        // Сохраняем токен и данные пользователя
        localStorage.setItem('auth_token', 'demo_token_12345');
        localStorage.setItem('auth_user', JSON.stringify(userData));
        
        setUser(userData);
        setIsLoading(false);
        toast.success('Авторизация успешна');
        return true;
      } else {
        setIsLoading(false);
        toast.error('Неверное имя пользователя или пароль');
        return false;
      }
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Ошибка при авторизации');
      setIsLoading(false);
      return false;
    }
  };

  // Выход из системы
  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
    toast.info('Вы вышли из системы');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
