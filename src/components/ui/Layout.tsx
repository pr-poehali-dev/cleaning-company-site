
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            ЧистоДом
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Главная
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
              Услуги
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              О нас
            </Link>
            <Link to="/contacts" className="text-gray-700 hover:text-blue-600 transition-colors">
              Контакты
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/booking">
              <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                Заказать уборку
              </Button>
            </Link>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white p-4 border-t animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Главная
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">
                Услуги
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                О нас
              </Link>
              <Link to="/contacts" className="text-gray-700 hover:text-blue-600 transition-colors">
                Контакты
              </Link>
              <div className="flex space-x-4 pt-2">
                <Link to="/cart">
                  <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/booking">
                  <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                    Заказать
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ЧистоДом</h3>
              <p className="text-gray-300">Профессиональная клининговая компания, предоставляющая услуги высочайшего качества.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Контакты</h3>
              <p className="text-gray-300 mb-2">Телефон: +7 (XXX) XXX-XX-XX</p>
              <p className="text-gray-300 mb-2">Email: info@chistodom.ru</p>
              <p className="text-gray-300">Адрес: ул. Пример, 123, Москва</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Меню</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                    Главная
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                    Услуги
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                    О нас
                  </Link>
                </li>
                <li>
                  <Link to="/contacts" className="text-gray-300 hover:text-white transition-colors">
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© 2025 ЧистоДом. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
