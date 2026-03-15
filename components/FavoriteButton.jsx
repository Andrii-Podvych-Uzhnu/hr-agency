'use client'
import { useFavorites } from '@/contexts/FavoritesContext'

export default function FavoriteButton({ vacancyId }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const liked = isFavorite(vacancyId)

  return (
    <button
      onClick={(e) => {
        e.preventDefault(); // Щоб не спрацьовував перехід на сторінку, якщо кнопка всередині Link
        toggleFavorite(vacancyId);
      }}
      className={`p-3 rounded-full transition-all duration-300 shadow-sm flex items-center justify-center ${
        liked 
        ? 'bg-red-50 text-red-500 hover:bg-red-100' 
        : 'bg-white border border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-500'
      }`}
      title={liked ? 'Видалити зі збережених' : 'Зберегти вакансію'}
    >
      <svg className="w-6 h-6 transform transition-transform active:scale-75" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={liked ? 0 : 2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  )
}