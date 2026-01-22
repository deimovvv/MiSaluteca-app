import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Mi Saluteca - Tu historial médico, siempre contigo",
  description: "Gestiona tu salud y la de tu familia de forma segura y privada",
  icons: {
    icon: "https://res.cloudinary.com/dfoh7ntxq/image/upload/v1766024851/saludchiquito_ojbsip.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
