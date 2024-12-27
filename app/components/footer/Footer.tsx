'use client';

import React from 'react';
import FoItem from './FoItem';
import useRentModal from '@/app/hooks/useRentModel';
import { useRouter } from 'next/navigation';

const Footer: React.FC = () => {
  const rentModel = useRentModal();
  const router = useRouter();
  return (
    <footer className="bg-white text-blue py-8">
      <div className="container mx-auto flex justify-between items-start">
        <div className="footer-right font-semibold">
          <FoItem
            onClick={()=>router.push("/about-us")}
            label="Sobre nosotros"
          />
        </div>
        
        <div className="footer-right font-semibold">
          <FoItem
            onClick={()=>router.push("/terms")}
            label="Términos y condiciones"
          />
        </div>

        <div className="footer-right font-semibold">
          <FoItem
            onClick={rentModel.onOpen}
            label="Conviertete en anfitrión"
          />
        </div>
        <div className="footer-right font-semibold">
          <FoItem
            onClick={()=>router.push("/help-center")}
            label="Centro de ayuda"
          />
        </div>
      </div>
      <div className="footer-bottom mt-6  pt-4">
        <p className="text-center font-semibold">&copy; 2025 Earthbnb. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
