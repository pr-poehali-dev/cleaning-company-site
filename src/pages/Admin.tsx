
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminServiceList from "@/components/Admin/AdminServiceList";
import AdminOrderList from "@/components/Admin/AdminOrderList";
import { Shield } from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("services");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Админ заголовок */}
      <header className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6" />
            <h1 className="text-xl font-bold">Панель управления ЧистоДом</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Администратор</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-auto mb-8">
            <TabsTrigger value="services">Услуги</TabsTrigger>
            <TabsTrigger value="orders">Заказы</TabsTrigger>
            <TabsTrigger value="clients">Клиенты</TabsTrigger>
            <TabsTrigger value="stats">Статистика</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Управление услугами</h2>
              <AdminServiceList />
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Управление заказами</h2>
              <AdminOrderList />
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Управление клиентами</h2>
              <p className="text-gray-500">Здесь будет размещен список клиентов</p>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Статистика и отчеты</h2>
              <p className="text-gray-500">Здесь будет размещена статистика и отчеты</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
