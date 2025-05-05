
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Building2, Sparkles, LayoutGrid } from "lucide-react";
import { ServiceCategory } from "./ServicesContext";

interface ServiceFiltersProps {
  activeCategory: string;
  onCategoryChange: (value: string) => void;
}

const ServiceFilters = ({ activeCategory, onCategoryChange }: ServiceFiltersProps) => {
  const handleValueChange = (value: string) => {
    onCategoryChange(value as ServiceCategory);
  };

  const categories = [
    { id: "all", label: "Все услуги", icon: <LayoutGrid className="h-4 w-4 mr-2" /> },
    { id: "residential", label: "Для дома", icon: <Home className="h-4 w-4 mr-2" /> },
    { id: "commercial", label: "Для бизнеса", icon: <Building2 className="h-4 w-4 mr-2" /> },
    { id: "special", label: "Специальные", icon: <Sparkles className="h-4 w-4 mr-2" /> },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Фильтр услуг</h2>
      <Tabs value={activeCategory} onValueChange={handleValueChange} className="w-full">
        <TabsList className="w-full md:w-auto grid grid-cols-2 md:grid-cols-4 gap-2">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex items-center justify-center"
            >
              {category.icon}
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ServiceFilters;
