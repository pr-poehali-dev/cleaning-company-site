
import Layout from "@/components/ui/Layout";
import HeroSection from "@/components/HomePage/HeroSection";
import ServicesPreview from "@/components/HomePage/ServicesPreview";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesPreview />
      
      {/* Преимущества компании */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Почему выбирают нас</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Мы гарантируем высокое качество услуг и индивидуальный подход к каждому клиенту
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Опытные специалисты</h3>
              <p className="text-gray-600">
                Наши сотрудники проходят тщательный отбор и специальное обучение
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Эко-средства</h3>
              <p className="text-gray-600">
                Используем безопасные для людей и окружающей среды чистящие средства
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p className="text-gray-600">
                Если вас не устроит результат, мы проведем повторную уборку бесплатно
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Удобное расписание</h3>
              <p className="text-gray-600">
                Работаем 7 дней в неделю в удобное для вас время
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Призыв к действию */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Готовы заказать уборку?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Оставьте заявку сейчас, и мы свяжемся с вами в течение 15 минут для уточнения деталей
          </p>
          <a href="/booking" className="inline-block bg-white text-blue-600 py-3 px-8 rounded-md font-medium text-lg hover:bg-gray-100 transition-colors">
            Оставить заявку
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
