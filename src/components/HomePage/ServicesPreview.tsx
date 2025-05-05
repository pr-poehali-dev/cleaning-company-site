
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Building2, Sparkles } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Уборка квартир",
    description: "Комплексная уборка жилых помещений с использованием профессиональных средств и оборудования.",
    icon: <Home className="h-8 w-8 text-blue-500" />,
    link: "/services/residential"
  },
  {
    id: 2,
    title: "Уборка офисов",
    description: "Профессиональный клининг офисных помещений любого размера и сложности.",
    icon: <Building2 className="h-8 w-8 text-blue-500" />,
    link: "/services/commercial"
  },
  {
    id: 3,
    title: "Специальные услуги",
    description: "Мытьё окон, химчистка мебели, уборка после ремонта и другие специализированные услуги.",
    icon: <Sparkles className="h-8 w-8 text-blue-500" />,
    link: "/services/special"
  }
];

const ServicesPreview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши услуги</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Предлагаем широкий спектр клининговых услуг, чтобы сделать ваш дом или офис идеально чистыми
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow group">
              <CardHeader className="pb-2">
                <div className="mb-2">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
              <CardFooter>
                <Link to={service.link}>
                  <Button variant="ghost" className="text-blue-600 group-hover:text-blue-700">
                    Подробнее <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/services">
            <Button variant="outline" size="lg" className="group">
              Все услуги
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
