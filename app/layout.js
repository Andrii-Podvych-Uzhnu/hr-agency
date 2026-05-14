import "./globals.css";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; 

export const metadata = {
  title: "HR.agency",
  description: "Платформа для пошуку роботи",
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

          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}