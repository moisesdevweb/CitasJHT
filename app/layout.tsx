import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeartsBackground from "./components/HeartsBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Janeth, ¿Quieres ser mi cita? 🌹",
  description: "¿Quieres ser mi cita?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* FONDO DEGRADADO ESTILO TIKTOK */}
        <div className="fixed inset-0 bg-gradient-to-br from-[#ff9a9e] to-[#fad0c4] -z-20" />
        <HeartsBackground />
        <main className="relative z-10 min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}