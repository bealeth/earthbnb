import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import RentModal from "./components/models/RentModal";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/models/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/models/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import SearchModal from "./components/models/SearchModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Earthbnb",
  description: "Proyecto Escolar",
};

const poppins = Poppins({
  subsets: ['latin-ext'], // O 'latin-ext' si tu app usa acentos o caracteres adicionales.
  weight: ['400', '700'], // Asegúrate de incluir los pesos necesarios.
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="es">
      <body
        className={poppins.className}>
          <ClientOnly>
            <ToasterProvider/>
            <SearchModal/>
            <RentModal/>
            <LoginModal />
            <RegisterModal />
            <Navbar currentUser={currentUser}/>
          </ClientOnly>
          <div className="pb-20 pt-28">
            {children}
          </div>
      </body>
    </html>
  );
}
