import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./buttons.css";
import './../landing/landing-style.css'
import Provider from "@/user-dashboard/utils/Provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mi Saluteca - Tu historial médico, siempre contigo",
  description: "Gestiona tu salud y la de tu familia de forma segura y privada",
  icons: {
    icon: "/saludchiquito_ojbsip.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className} suppressHydrationWarning>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
