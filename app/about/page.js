import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
  
      <nav className="py-6 border-b">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-indigo-600 font-bold text-xl tracking-tight">
            HR-Agency
          </Link>
        </div>
      </nav>

      <main className="flex-grow">
     
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Ми змінюємо підхід до найму та пошуку роботи
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              HR-Agency — це екосистема, де професіонали знаходять своє покликання, 
              а компанії — лідерів, які рухають бізнес вперед. Ми віримо в прозорість, 
              чесність та силу правильного вибору.
            </p>
          </div>
        </section>

      
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша місія</h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Створювати ідеальні пари між роботодавцем та спеціалістом, базуючись 
                  не лише на Hard Skills, а й на культурному коді та спільних цінностях.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600 font-bold">01</div>
                    <p className="text-gray-700"><strong>Прозорість:</strong> Кожен відгук проходить перевірку на достовірність.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600 font-bold">02</div>
                    <p className="text-gray-700"><strong>Ефективність:</strong> Розумні фільтри допомагають знайти роботу за лічені хвилини.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600 font-bold">03</div>
                    <p className="text-gray-700"><strong>Довіра:</strong> Ми захищаємо приватність наших користувачів та дані компаній.</p>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-600 h-64 md:h-96 rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center text-white p-8">
                 <div className="text-center">
                    <div className="text-6xl font-bold mb-2">10k+</div>
                    <div className="text-indigo-200">Успішних кейсів найму</div>
                 </div>
              </div>
            </div>
          </div>
        </section>


        <section className="py-20 bg-indigo-900 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Готові зробити наступний крок?</h2>
            <Link href="/" className="bg-white text-indigo-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
              Переглянути вакансії
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-10 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 mb-2">© 2026 HR-Agency. Всі права захищені.</p>
          <div className="flex justify-center gap-6 mt-4 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition">Політика конфіденційності</a>
            <a href="#" className="hover:text-white transition">Умови використання</a>
          </div>
        </div>
      </footer>
    </div>
  );
}