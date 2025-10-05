//layout.tsx

// app/(frontend)/layout.tsx (ОСНОВНОЙ ШАБЛОН САЙТА)

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Если шрифты установлены
import "./styles.css"; // Ваши глобальные стили
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./globals.css";

// Шрифты
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// Метаданные
export const metadata: Metadata = {
    title: "Payload E-commerce Store", // Обновим тайтл
    description: "Наш интернет-магазин, созданный на Next.js и Payload CMS.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className={`${geistSans.variable} ${geistMono.variable}`}>
            <body>
                <Header />                
               <main className="flex-grow">
                    {/* {children} — здесь будет вставлено содержимое page.tsx */}
                    {children} 
                </main>
                <Footer />
            </body>
        </html>
    );
}