
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { servicesApi, Service } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

const AdminServiceList = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await servicesApi.getAll();
      setServices(data);
      setError(null);
    } catch (err) {
      setError("Не удалось загрузить список услуг");
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось загрузить список услуг",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить эту услугу?")) {
      try {
        await servicesApi.delete(id);
        setServices(services.filter((service) => service.id !== id));
        toast({
          title: "Успешно",
          description: "Услуга была удалена",
        });
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Не удалось удалить услугу",
        });
      }
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "residential":
        return <Badge className="bg-green-100 text-green-800">Для дома</Badge>;
      case "commercial":
        return <Badge className="bg-blue-100 text-blue-800">Для бизнеса</Badge>;
      case "special":
        return <Badge className="bg-purple-100 text-purple-800">Специальная</Badge>;
      default:
        return <Badge>Другое</Badge>;
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
        <Button onClick={fetchServices} variant="outline" className="mt-4">
          Попробовать снова
        </Button>
      </div>
    );
  }

  // Временная имитация данных для демонстрации, пока нет реального API
  const mockServices: Service[] = [
    {
      id: 1,
      title: "Генеральная уборка квартиры",
      description: "Комплексная уборка всех помещений квартиры с удалением пыли, грязи и загрязнений.",
      price: 3000,
      category: "residential",
      createdAt: "2025-04-15T14:30:00Z",
      updatedAt: "2025-04-20T10:15:00Z"
    },
    {
      id: 2,
      title: "Уборка офиса",
      description: "Профессиональный клининг офисных помещений любого размера и сложности.",
      price: 5000,
      category: "commercial",
      createdAt: "2025-04-10T09:45:00Z",
      updatedAt: "2025-04-18T16:20:00Z"
    },
    {
      id: 3,
      title: "Мытьё окон и фасадов",
      description: "Профессиональная очистка оконных и фасадных поверхностей любой сложности.",
      price: 2000,
      category: "special",
      createdAt: "2025-04-05T11:30:00Z",
      updatedAt: "2025-04-12T14:10:00Z"
    }
  ];

  const displayServices = services.length > 0 ? services : mockServices;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-medium">Список всех услуг</h3>
          <p className="text-sm text-gray-500">
            Управление услугами клининговой компании
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Добавить услугу
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Обновлено</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayServices.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.id}</TableCell>
                <TableCell>{service.title}</TableCell>
                <TableCell>{getCategoryBadge(service.category)}</TableCell>
                <TableCell>{service.price} ₽</TableCell>
                <TableCell>
                  {formatDistanceToNow(new Date(service.updatedAt), {
                    addSuffix: true,
                    locale: ru,
                  })}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminServiceList;
