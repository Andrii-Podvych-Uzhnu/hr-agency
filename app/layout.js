import "./globals.css";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; 

export const metadata = {
  title: "HR.agency",
  description: "Платформа для пошуку роботи",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body className="bg-slate-50 text-slate-900 font-sans flex flex-col min-h-screen">
        <FavoritesProvider>
          
          <Header />
          
       
          <main className="flex-grow">
            {children}
          </main>
          
         
          <Footer />

        </FavoritesProvider>
      </body>
    </html>
  );
}