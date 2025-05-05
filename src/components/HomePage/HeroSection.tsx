
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-blue-50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Профессиональная уборка для вашего дома и офиса
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Мы предоставляем высококачественные клининговые услуги, 
            которые сделают ваше пространство безупречно чистым. 
            Доверьте уборку профессионалам!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/booking">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg">
                Заказать уборку
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="text-lg group">
                Наши услуги
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
