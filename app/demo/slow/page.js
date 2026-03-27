export default async function SlowPage() {
  await new Promise(resolve => setTimeout(resolve, 3000))

  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const rawPosts = await response.json()

  const realHrContent = [
    {
      title: "Аналітика зарплат в IT: Q3",
      body: "Детальний звіт по медіанних зарплатах розробників, тестувальників та менеджерів. Як змінився ринок за останній квартал."
    },
    {
      title: "Як AI змінює процес рекрутингу",
      body: "Автоматизація скринінгу резюме та первинних інтерв'ю. Які інструменти використовують сучасні HR-агенції."
    },
    {
      title: "Тренди ремоуту: повернення в офіси?",
      body: "Дослідження формату роботи топ-50 IT компаній. Гібрид, фулл-ремоут чи класичний офіс — що обирає бізнес."
    },
    {
      title: "Огляд ринку Junior спеціалістів",
      body: "Конкуренція серед початківців досягла максимуму. Як виділитися серед сотень кандидатів на одну вакансію."
    },
    {
      title: "Чому Senior'и відхиляють оффери",
      body: "Головні причини відмов після успішних технічних співбесід. Що важливіше за зарплату для досвідчених спеціалістів."
    },
    {
      title: "Ефективний онбординг новачків",
      body: "Як зробити перші тижні роботи нового співробітника максимально продуктивними та комфортними. Чек-ліст для HR."
    }
  ]

  const posts = rawPosts.slice(0, 6).map((post, index) => ({
    ...post,
    title: realHrContent[index]?.title || post.title,
    body: realHrContent[index]?.body || post.body
  }))

  return (
    <div className="bg-slate-50 min-h-screen w-full py-16 font-sans">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Аналітика (Затримка 3 сек)</h1>

        <div className="bg-amber-50 p-6 rounded-2xl mb-10 border border-amber-200 shadow-sm">
          <p className="text-amber-900 font-medium leading-relaxed">
            Ця сторінка імітує довге завантаження важких даних. При переході сюди ви побачите loading.js зі спіннером протягом 3 секунд.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white rounded-[1.5rem] shadow-sm p-8 border border-slate-100 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold mb-4 text-slate-900 capitalize">{post.title}</h2>
              <p className="text-slate-600 font-medium leading-relaxed">{post.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}