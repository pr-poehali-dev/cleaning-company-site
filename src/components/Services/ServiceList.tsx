
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useServices, ServiceCategory } from "./ServicesContext";

interface ServiceListProps {
  activeCategory: string;
}

const ServiceList = ({ activeCategory }: ServiceListProps) => {
  const { services } = useServices();

  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredServices.map((service) => (
        <Card key={service.id} className="hover:shadow-lg transition-shadow group h-full flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="mb-2">{service.icon}</div>
              {service.popular && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Популярная
                </Badge>
              )}
            </div>
            <CardTitle>{service.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="mt-2">
              <p className="font-semibold text-lg text-blue-600">{service.price}</p>
              <p className="text-sm text-gray-500">{service.priceType}</p>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Link to={service.link} className="w-full">
              <Button variant="outline" className="w-full text-blue-600 border-blue-200 group-hover:border-blue-300">
                Подробнее <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ServiceList;
