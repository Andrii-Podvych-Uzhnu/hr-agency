export default async function PostsPage() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const rawPosts = await response.json()

  const realHrContent = [
    {
      title: "Як підготуватися до співбесіди з технічним лідом",
      body: "Технічна співбесіда — це не лише перевірка знань синтаксису, а й розуміння архітектури. Розбираємо найпопулярніші питання та патерни, які варто знати."
    },
    {
      title: "Топ-5 помилок у резюме Junior розробника",
      body: "Більшість резюме відхиляються ще на етапі скринінгу. Дізнайтеся, як правильно описати свої пет-проєкти та уникнути типових помилок новачків."
    },
    {
      title: "Ринок IT: тенденції та прогнози найму",
      body: "Які технології зараз на піку популярності? Аналізуємо поточний стан ринку праці та зарплатні очікування роботодавців."
    },
    {
      title: "Як успішно пройти лайв-кодинг інтерв'ю",
      body: "Писати код під наглядом завжди стрес. Практичні поради, як зберегти спокій, озвучувати свої думки та вирішувати алгоритмічні задачі."
    },
    {
      title: "Soft skills: чому вони важливіші, ніж ви думаєте",
      body: "Комунікація, вміння працювати в команді та вирішувати конфлікти часто стають вирішальним фактором при наймі мідлів та сеньйорів."
    },
    {
      title: "Як обговорювати зарплату на співбесіді",
      body: "Правильна аргументація своїх зарплатних очікувань. Коли варто називати цифру першим і як торгуватися за кращий оффер."
    },
    {
      title: "Віддалена робота vs Офіс: що обирають компанії",
      body: "Гібридний формат стає новим стандартом. Розглядаємо плюси та мінуси різних форматів роботи для розробників."
    },
    {
      title: "Як уникнути вигорання в IT сфері",
      body: "Постійні дедлайни та складні таски призводять до стресу. Ефективні методи тайм-менеджменту та збереження work-life balance."
    },
    {
      title: "Роль ментора у швидкому розвитку кар'єри",
      body: "Чому кожному джуну потрібен наставник та як його знайти. Переваги менторства для обох сторін процесу."
    }
  ]

  const posts = rawPosts.slice(0, 9).map((post, index) => ({
    ...post,
    title: realHrContent[index]?.title || post.title,
    body: realHrContent[index]?.body || post.body
  }))

  return (
    <div className="bg-slate-50 min-h-screen py-16 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-4 block">
            HR.agency Insights
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Кар'єрний <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Блог</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Поради для проходження співбесід, аналітика IT-ринку та інсайди від провідних рекрутерів.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group"
            >
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                {post.title}
              </h2>
              
              <p className="text-slate-500 mb-8 flex-grow leading-relaxed">
                {post.body}
              </p>
              
              <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                    HR
                  </div>
                  <span className="text-sm font-bold text-slate-400">Редакція</span>
                </div>
                <span className="text-sm font-bold text-indigo-600">Читати →</span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  )
}