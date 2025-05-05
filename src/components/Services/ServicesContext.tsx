
import { createContext, useContext, ReactNode } from "react";
import { Home, Building2, Sparkles, Droplets, Wind, ShowerHead, Trash2, Sofa, Construction } from "lucide-react";

// Определение типов
export type ServiceCategory = 
  | "all" 
  | "residential" 
  | "commercial" 
  | "special";

export interface ServiceType {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  icon: JSX.Element;
  category: ServiceCategory;
  price: string;
  priceType: string;
  popular?: boolean;
  link: string;
}

// Расширенный список услуг
const servicesData: ServiceType[] = [
  {
    id: 1,
    title: "Генеральная уборка квартиры",
    description: "Комплексная уборка всех помещений квартиры с удалением пыли, грязи и загрязнений.",
    longDescription: "Наши специалисты проведут тщательную уборку всех помещений, используя профессиональное оборудование и экологичные чистящие средства. Мы очистим все поверхности, вымоем полы, окна, сантехнику и кухонное оборудование.",
    icon: <Home className="h-8 w-8 text-blue-500" />,
    category: "residential",
    price: "от 3 000 ₽",
    priceType: "за услугу",
    popular: true,
    link: "/services/residential/general-cleaning"
  },
  {
    id: 2,
    title: "Поддерживающая уборка",
    description: "Регулярная уборка для поддержания чистоты в квартире или доме.",
    icon: <Droplets className="h-8 w-8 text-blue-500" />,
    category: "residential",
    price: "от 1 500 ₽",
    priceType: "за услугу",
    link: "/services/residential/regular-cleaning"
  },
  {
    id: 3,
    title: "Уборка после ремонта",
    description: "Специализированная уборка после проведения ремонтных или строительных работ.",
    icon: <Construction className="h-8 w-8 text-blue-500" />,
    category: "residential",
    price: "от 4 500 ₽",
    priceType: "за услугу",
    popular: true,
    link: "/services/residential/after-renovation"
  },
  {
    id: 4,
    title: "Ежедневная уборка офиса",
    description: "Регулярная уборка офисных помещений до или после рабочего дня.",
    icon: <Building2 className="h-8 w-8 text-blue-500" />,
    category: "commercial",
    price: "от 50 ₽",
    priceType: "за м²",
    popular: true,
    link: "/services/commercial/daily-office"
  },
  {
    id: 5,
    title: "Комплексная уборка бизнес-центра",
    description: "Полная уборка всех помещений бизнес-центра, включая места общего пользования.",
    icon: <Building2 className="h-8 w-8 text-blue-500" />,
    category: "commercial",
    price: "Договорная",
    priceType: "",
    link: "/services/commercial/business-center"
  },
  {
    id: 6,
    title: "Мытьё окон и фасадов",
    description: "Профессиональная очистка оконных и фасадных поверхностей любой сложности.",
    icon: <Wind className="h-8 w-8 text-blue-500" />,
    category: "special",
    price: "от 200 ₽",
    priceType: "за м²",
    link: "/services/special/window-cleaning"
  },
  {
    id: 7,
    title: "Химчистка мебели",
    description: "Глубокая чистка мягкой мебели с удалением пятен и неприятных запахов.",
    icon: <Sofa className="h-8 w-8 text-blue-500" />,
    category: "special",
    price: "от 1 000 ₽",
    priceType: "за единицу",
    link: "/services/special/upholstery-cleaning"
  },
  {
    id: 8,
    title: "Чистка санузлов",
    description: "Тщательная дезинфекция и чистка туалетов и ванных комнат.",
    icon: <ShowerHead className="h-8 w-8 text-blue-500" />,
    category: "special",
    price: "от 1 500 ₽",
    priceType: "за помещение",
    link: "/services/special/bathroom-cleaning"
  },
  {
    id: 9,
    title: "Вывоз мусора и утилизация",
    description: "Организация сбора, вывоза и утилизации бытовых и строительных отходов.",
    icon: <Trash2 className="h-8 w-8 text-blue-500" />,
    category: "special",
    price: "от 2 000 ₽",
    priceType: "за услугу",
    link: "/services/special/waste-removal"
  }
];

// Создание контекста
type ServicesContextType = {
  services: ServiceType[];
};

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

// Провайдер контекста
export const ServicesProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ServicesContext.Provider value={{ services: servicesData }}>
      {children}
    </ServicesContext.Provider>
  );
};

// Хук для использования контекста
export const useServices = () => {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
};
