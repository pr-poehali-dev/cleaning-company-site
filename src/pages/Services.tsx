
import { useState } from "react";
import Layout from "@/components/ui/Layout";
import ServiceList from "@/components/Services/ServiceList";
import ServiceFilters from "@/components/Services/ServiceFilters";
import { ServicesProvider } from "@/components/Services/ServicesContext";

const Services = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  return (
    <Layout>
      <div className="bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Наши услуги</h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Мы предлагаем полный спектр клининговых услуг для частных лиц и организаций.
            Выберите подходящую услугу или свяжитесь с нами для индивидуального предложения.
          </p>
        </div>
      </div>
      
      <ServicesProvider>
        <div className="container mx-auto px-4 py-12">
          <ServiceFilters 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory} 
          />
          <ServiceList activeCategory={activeCategory} />
        </div>
      </ServicesProvider>
    </Layout>
  );
};

export default Services;
