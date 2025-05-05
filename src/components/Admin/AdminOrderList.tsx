
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, CheckCircle, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ordersApi, Order } from "@/lib/api";

const AdminOrderList = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await ordersApi.getAll();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError("Не удалось загрузить список заказов");
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось загрузить список заказов",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: Order["status"]) => {
    try {
      await ordersApi.updateStatus(id, status);
      
      // Обновляем список заказов локально без перезагрузки
      setOrders(prev => 
        prev.map(order => 
          order.id === id ? { ...order, status } : order
        )
      );
      
      toast({
        title: "Успешно",
        description: `Статус заказа изменен на "${getStatusText(status)}"`,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось обновить статус заказа",
      });
    }
  };

  // Возвращает текст статуса на русском языке
  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "new": return "Новый";
      case "confirmed": return "Подтвержден";
      case "completed": return "Выполнен";
      case "cancelled": return "Отменен";
      default: return "Неизвестно";
    }
  };

  // Возвращает цветной значок для статуса
  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Новый</Badge>;
      case "confirmed":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Подтвержден</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Выполнен</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Отменен</Badge>;
      default:
        return <Badge>Неизвестно</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <Button onClick={fetchOrders} variant="outline" className="mt-4">
          Попробовать снова
        </Button>
      </div>
    );
  }

  // Временная имитация данных для демонстрации, пока нет реального API
  const mockOrders: Order[] = [
    {
      id: 1,
      customerName: "Иванов Иван",
      customerPhone: "+7 (999) 123-45-67",
      customerEmail: "ivanov@example.com",
      serviceId: 1,
      serviceName: "Генеральная уборка квартиры",
      date: "2025-05-10",
      time: "10:00",
      status: "new",
      comment: "Нужно помыть окна",
      createdAt: "2025-05-04T08:30:00Z",
      updatedAt: "2025-05-04T08:30:00Z"
    },
    {
      id: 2,
      customerName: "Петрова Анна",
      customerPhone: "+7 (999) 765-43-21",
      customerEmail: "petrova@example.com",
      serviceId: 2,
      serviceName: "Уборка офиса",
      date: "2025-05-12",
      time: "14:00",
      status: "confirmed",
      createdAt: "2025-05-03T15:20:00Z",
      updatedAt: "2025-05-03T16:45:00Z"
    },
    {
      id: 3,
      customerName: "Сидоров Алексей",
      customerPhone: "+7 (999) 555-55-55",
      serviceId: 3,
      serviceName: "Мытьё окон и фасадов",
      date: "2025-05-08",
      time: "12:30",
      status: "completed",
      comment: "Большие окна на первом этаже",
      createdAt: "2025-05-01T11:10:00Z",
      updatedAt: "2025-05-08T14:30:00Z"
    },
    {
      id: 4,
      customerName: "Козлова Елена",
      customerPhone: "+7 (999) 888-77-66",
      customerEmail: "kozlova@example.com",
      serviceId: 1,
      serviceName: "Генеральная уборка квартиры",
      date: "2025-05-07",
      time: "09:00",
      status: "cancelled",
      comment: "Клиент отменил",
      createdAt: "2025-05-02T10:05:00Z",
      updatedAt: "2025-05-05T09:15:00Z"
    }
  ];

  const displayOrders = orders.length > 0 ? orders : mockOrders;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-medium">Список заказов</h3>
          <p className="text-sm text-gray-500">
            Управление заказами на клининговые услуги
          </p>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Клиент</TableHead>
              <TableHead>Услуга</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-gray-500">{order.customerPhone}</p>
                  </div>
                </TableCell>
                <TableCell>{order.serviceName}</TableCell>
                <TableCell>
                  <div>
                    <p>{format(new Date(order.date), 'dd.MM.yyyy', {locale: ru})}</p>
                    <p className="text-sm text-gray-500">{order.time}</p>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    {order.status === "new" && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-green-600 border-green-200"
                          onClick={() => handleUpdateStatus(order.id, "confirmed")}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-600 border-red-200"
                          onClick={() => handleUpdateStatus(order.id, "cancelled")}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {order.status === "confirmed" && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-green-600 border-green-200"
                        onClick={() => handleUpdateStatus(order.id, "completed")}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminOrderList;
