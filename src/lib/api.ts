
import axios from 'axios';
import { toast } from 'sonner';

// Настраиваем базовый инстанс axios
export const api = axios.create({
  baseURL: 'https://api.chisto-dom.ru/api/v1', // Замените на фактический адрес вашего API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Добавляем перехватчик для обработки токена авторизации
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Добавляем перехватчик для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Обрабатываем различные статусы ошибок
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 401) {
        // Неавторизован
        localStorage.removeItem('auth_token');
        toast.error('Сессия истекла. Пожалуйста, войдите снова.');
        // Здесь можно добавить редирект на страницу логина
      } else if (status === 403) {
        // Запрещено
        toast.error('У вас нет доступа к этому ресурсу');
      } else if (status === 404) {
        // Не найдено
        toast.error('Запрашиваемый ресурс не найден');
      } else if (status === 500) {
        // Ошибка сервера
        toast.error('Ошибка сервера. Пожалуйста, попробуйте позже');
      } else {
        // Другие ошибки
        const message = data?.message || 'Произошла ошибка';
        toast.error(message);
      }
    } else if (error.request) {
      // Запрос был сделан, но ответ не получен
      toast.error('Сервер не отвечает. Проверьте подключение к интернету');
    } else {
      // Ошибка при настройке запроса
      toast.error('Ошибка при выполнении запроса');
    }
    
    return Promise.reject(error);
  }
);

// Типизированные функции для работы с API
interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
}

// Сервисы
export interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export const servicesApi = {
  getAll: async (params?: PaginationParams) => {
    const response = await api.get<Service[]>('/services', { params });
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get<Service>(`/services/${id}`);
    return response.data;
  },
  
  create: async (data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post<Service>('/services', data);
    return response.data;
  },
  
  update: async (id: number, data: Partial<Omit<Service, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const response = await api.put<Service>(`/services/${id}`, data);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  }
};

// Заказы
export interface Order {
  id: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceId: number;
  serviceName: string;
  date: string;
  time: string;
  status: 'new' | 'confirmed' | 'completed' | 'cancelled';
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export const ordersApi = {
  getAll: async (params?: PaginationParams) => {
    const response = await api.get<Order[]>('/orders', { params });
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },
  
  create: async (data: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'serviceName'>) => {
    const response = await api.post<Order>('/orders', data);
    return response.data;
  },
  
  update: async (id: number, data: Partial<Omit<Order, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const response = await api.put<Order>(`/orders/${id}`, data);
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/orders/${id}`);
    return response.data;
  },
  
  updateStatus: async (id: number, status: Order['status']) => {
    const response = await api.patch<Order>(`/orders/${id}/status`, { status });
    return response.data;
  }
};
