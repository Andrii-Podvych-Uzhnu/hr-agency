import Link from 'next/link';

const BriefcaseIcon = () => (
  <svg width="32" height="32" className="text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7zM5 11l-.224 1.341c-.2.9.224 1.834 1.13 1.933a8.1 8.1 0 009.18 0c.906-.1 1.33-.933 1.13-1.833L16 11M5 11h11" />
  </svg>
);

const ChatIcon = () => (
  <svg width="32" height="32" className="text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
);

const ChartIcon = () => (
  <svg width="32" height="32" className="text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm12 0v-10a2 2 0 00-2-2h-2a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z" />
  </svg>
);

export default function Home() {
  return (
    <div className="font-sans">
      <main>
        <section className="bg-white py-20 md:py-32 border-b border-slate-100">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <div className="inline-flex items-center bg-indigo-50 text-indigo-700 text-xs px-4 py-1.5 rounded-full font-medium mb-8">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Платформа №1 для IT-рекрутингу
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-950 leading-tight tracking-tighter mb-8">
              HR: Вакансії та<br />
              <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent italic text-6xl">Правдиві Відгуки</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-12 max-w-2xl mx-auto">
              Ми поєднуємо таланти з ідеальними роботодавцями через прозорість та глибоку аналітику ринку.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/vacancies" className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-100">
                Знайти роботу
              </Link>
              <Link href="/candidates" className="bg-white text-slate-950 border border-slate-200 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition shadow-sm">
                Наші кандидати
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-slate-950 text-center mb-16 tracking-tight">
              Наші переваги
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-indigo-50 h-14 w-14 rounded-2xl flex items-center justify-center mb-8">
                  <BriefcaseIcon />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 tracking-tight">Актуальні вакансії</h3>
                <p className="text-slate-600 leading-relaxed">
                  Тільки перевірені пропозиції від топових IT-компаній. Ми фільтруємо спам та застарілі оголошення.
                </p>
              </div>
              <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 md:translate-y-4">
                <div className="bg-indigo-50 h-14 w-14 rounded-2xl flex items-center justify-center mb-8">
                  <ChatIcon />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 tracking-tight">Чесні відгуки</h3>
                <p className="text-slate-600 leading-relaxed">
                  Дізнайтеся реальний стан справ у компанії від діючих співробітників. Жодної цензури від роботодавців.
                </p>
              </div>
              <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-indigo-50 h-14 w-14 rounded-2xl flex items-center justify-center mb-8">
                  <ChartIcon />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 tracking-tight">Аналіз ринку</h3>
                <p className="text-slate-600 leading-relaxed">
                  Стежте за динамікою зарплат та попитом на технології. Будьте на крок попереду конкурентів.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}