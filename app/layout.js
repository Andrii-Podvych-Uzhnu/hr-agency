import "./globals.css";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; 
import { Toaster } from "sonner"; 


const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HR.agency — Вакансії та Правдиві Відгуки",
    template: "%s | HR.agency", 
  },
  description: "Сучасна екосистема для прозорого рекрутингу в IT. Перевірені вакансії, аналітика зарплат та анонімні відгуки про компанії без цензури.",
  keywords: ["IT вакансії", "робота в IT", "рекрутинг", "HR платформа", "відгуки про ІТ компанії", "пошук роботи"],
  authors: [{ name: "HR.agency Team" }],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "/",
    siteName: "HR.agency",
    title: "HR.agency — Вакансії та Правдиві Відгуки",
    description: "Сучасна екосистема для прозорого рекрутингу в IT. Перевірені вакансії, аналітика зарплат та анонімні відгуки про компанії.",
    images: [
      {
        url: "/og-image.svg", 
        width: 1200,
        height: 630,
        alt: "HR.agency — Платформа для IT-рекрутингу",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HR.agency — Вакансії та Правдиві Відгуки",
    description: "Сучасна екосистема для прозорого рекрутингу в IT. Знаходь роботу мрії.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className="h-full">
      <body className="antialiased bg-white text-slate-900 font-sans flex flex-col min-h-screen">
        <AuthProvider>
          <FavoritesProvider>
            
            <Header />
            
            <main className="flex-1 w-full bg-white">
              {children}
            </main>
            
            <Footer />

            <Toaster richColors position="top-right" closeButton /> 

          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}