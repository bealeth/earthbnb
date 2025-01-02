'use client';
import React, { useCallback } from 'react';
import { SafeUser } from '../types';
import useRentModal from '../hooks/useRentModel';
import useLoginModal from '../hooks/useLoginModal';
import Button from '../components/Button';

interface CHProps {
    currentUser?: SafeUser | null
}

const BeHostPage: React.FC<CHProps> = ({ currentUser }) => {
    const loginModel = useLoginModal();
    const rentModel = useRentModal();

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModel.onOpen();
        }
        
        rentModel.onOpen();
    }, [currentUser, loginModel]);

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Header */}
      <header className="bg-blue text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Conviértete en anfitrión</h1>
          <p className="mt-4 text-lg">
            Descubre los beneficios de ser anfitrión en Earthbnb y crea experiencias inolvidables mientras cuidas el planeta.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 space-y-16">
        {/* Section 1: Beneficios principales */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-semibold text-blue mb-4">Comparte tu espacio, crea momentos únicos</h2>
            <p className="text-lg leading-relaxed">
              Al unirte como anfitrión, no solo obtendrás ingresos adicionales, sino que también formarás parte de una comunidad que valora el turismo sostenible. Comparte tu hogar con viajeros conscientes y ayuda a cuidar el planeta.
            </p>
          </div>
          <div className="col-span-1">
            <img
              src="https://images.pexels.com/photos/5847648/pexels-photo-5847648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Anfitrión acogiendo a viajeros"
              className="rounded-lg shadow-md"
            />
          </div>
        </section>

        {/* Section 2: Cómo funciona */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-blue mb-6">¿Cómo funciona?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">1. Publica tu espacio</h3>
              <p>Configura tu anuncio fácilmente y establece reglas, precios y disponibilidad.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">2. Recibe a los huéspedes</h3>
              <p>Conéctate con viajeros y asegúrate de que su experiencia sea inolvidable.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">3. Genera ingresos</h3>
              <p>Obtén ingresos adicionales mientras compartes tu hogar.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Botón de llamada a la acción */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold text-blue mb-6">¿Listo para ser anfitrión?</h2>
          <p className="text-lg leading-relaxed mb-6">
            Únete a miles de anfitriones que están transformando el turismo en un viaje consciente y sostenible. Tu espacio puede ser el hogar de un gran recuerdo.
          </p>
            <Button label={'Conviértete en anfitrión'} onClick={onRent}/>
        </section>
      </main>
    </div>
  );
};

export default BeHostPage;
