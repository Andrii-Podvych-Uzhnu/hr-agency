# Архітектура компонентів проєкту HR.agency

| Компонент | Тип | Причина |
| :--- | :--- | :--- |
| `app/page.js` | **Server** | Статична головна сторінка, SEO оптимізація. |
| `app/dashboard/page.js` | **Server** | Отримання даних статистики на сервері (getVacancyStats). |
| `Header.jsx` | **Server** | Відображення статичного меню навігації. |
| `VacancyCard.jsx` | **Server** | Статичний рендер інформації про вакансію для швидкого завантаження. |
| `StatsCard.jsx` | **Server** | Просте форматування отриманих даних (props -> JSX). |
| `VacancyFilter.jsx` | **Client** | Використовує `useState` для введення тексту та фільтрації масиву в реальному часі. |
| `FavoriteButton.jsx` | **Client** | Використовує `onClick` та React Context для керування станом лайків. |
| `FavoritesContext.jsx`| **Client** | Використовує `useState` та `createContext` для глобального стану. |
| `DashboardShell.jsx` | **Client** | Використовує `useState` для перемикання (згортання/розгортання) бічного меню. |

