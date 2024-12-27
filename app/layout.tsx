import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import RentModal from "./components/modals/RentModal";
import ClientOnly from "./components/ClientOnly";

import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import SearchModal from "./components/modals/SearchModal";
import Footer from "./components/footer/Footer";



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
          <Footer/>
      </body>
    </html>
  );
}
