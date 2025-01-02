import React from 'react';
import { FaCheckCircle, FaUserShield, FaTools, FaExclamationTriangle, FaSyncAlt } from 'react-icons/fa';

const TermsAndConditionsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">

      <header className="bg-blue text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Términos y Condiciones</h1>
          <p className="mt-4 text-lg">
            Por favor, lee detenidamente los términos y condiciones que rigen el uso de nuestra plataforma.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        {/* Introducción */}
        <section className="mb-16">
          <div className="flex items-center gap-4">
            <FaUserShield size={40} className="text-blue" />
            <h2 className="text-3xl font-semibold text-blue">Introducción</h2>
          </div>
          <p className="text-lg leading-relaxed mt-4">
            Estos términos y condiciones describen las reglas y regulaciones para el uso de Earthbnb. Al acceder o 
            utilizar nuestra plataforma, aceptas cumplir con estos términos. Si no estás de acuerdo con alguno de 
            ellos, por favor no utilices nuestros servicios.
          </p>
        </section>

        {/* Uso de la plataforma */}
        <section className="mb-16">
          <div className="flex items-center gap-4">
            <FaTools size={40} className="text-blue" />
            <h2 className="text-3xl font-semibold text-blue">Uso de la Plataforma</h2>
          </div>
          <ul className="list-disc pl-8 mt-4 space-y-3 text-lg">
            <li>
              <strong>Cuenta personal:</strong> Los usuarios deben proporcionar información precisa para crear una cuenta.
            </li>
            <li>
              <strong>Conducta apropiada:</strong> Se prohíbe el uso de nuestra plataforma para actividades ilegales o dañinas.
            </li>
            <li>
              <strong>Anuncios y reservas:</strong> Los anfitriones son responsables de proporcionar detalles claros y precisos 
              de sus propiedades.
            </li>
            <li>
              <strong>Cancelaciones:</strong> Las políticas de cancelación pueden variar según el anfitrión y se presentarán al momento 
              de la reserva.
            </li>
          </ul>
        </section>

        {/* Responsabilidades del usuario */}
        <section className="mb-16">
          <div className="flex items-center gap-4">
            <FaCheckCircle size={40} className="text-blue" />
            <h2 className="text-3xl font-semibold text-blue">Responsabilidades del Usuario</h2>
          </div>
          <p className="text-lg leading-relaxed mt-4">
            Al usar Earthbnb, aceptas ser el único responsable de tus interacciones con otros usuarios y anfitriones. 
            También debes garantizar que las reservas y los pagos se realicen de manera legítima y conforme a nuestras 
            políticas.
          </p>
        </section>

        {/* Limitación de responsabilidad */}
        <section className="mb-16">
          <div className="flex items-center gap-4">
            <FaExclamationTriangle size={40} className="text-blue" />
            <h2 className="text-3xl font-semibold text-blue">Limitación de Responsabilidad</h2>
          </div>
          <p className="text-lg leading-relaxed mt-4">
            Earthbnb no se hace responsable por daños o pérdidas ocasionadas por el uso de la plataforma. Los anfitriones 
            son responsables de las condiciones de sus propiedades, y los viajeros asumen los riesgos relacionados con 
            sus estadías.
          </p>
        </section>

        {/* Cambios a los términos */}
        <section>
          <div className="flex items-center gap-4">
            <FaSyncAlt size={40} className="text-blue" />
            <h2 className="text-3xl font-semibold text-blue">Cambios a estos Términos</h2>
          </div>
          <p className="text-lg leading-relaxed mt-4">
            Earthbnb se reserva el derecho de modificar estos términos en cualquier momento. Notificaremos a los usuarios 
            sobre cambios importantes mediante la plataforma o el correo registrado en su cuenta.
          </p>
        </section>
      </main>

    </div>
  );
};

export default TermsAndConditionsPage;
