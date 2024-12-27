import React from 'react';

const TermsAndConditionsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">

      <header className="text-blue py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Términos y Condiciones</h1>
          <p className="mt-2 text-lg text-gray2">
            Por favor, lee detenidamente los términos y condiciones que rigen el uso de nuestra plataforma.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        {/* Introducción */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-blue mb-4">Introducción</h2>
          <p className="text-lg leading-relaxed">
            Estos términos y condiciones describen las reglas y regulaciones para el uso de Earthbnb. Al acceder o 
            utilizar nuestra plataforma, aceptas cumplir con estos términos. Si no estás de acuerdo con alguno de 
            ellos, por favor no utilices nuestros servicios.
          </p>
        </section>

        {/* Uso de la plataforma */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-blue mb-4">Uso de la Plataforma</h2>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              <strong>Cuenta personal:</strong> Los usuarios deben proporcionar información precisa para crear una cuenta.
            </li>
            <li>
              <strong>Conducta apropiada:</strong> Se prohíbe el uso de nuestra plataforma para actividades ilegales o 
              dañinas.
            </li>
            <li>
              <strong>Anuncios y reservas:</strong> Los anfitriones son responsables de proporcionar detalles claros y 
              precisos de sus propiedades.
            </li>
            <li>
              <strong>Cancelaciones:</strong> Las políticas de cancelación pueden variar según el anfitrión y se 
              presentarán al momento de la reserva.
            </li>
          </ul>
        </section>

        {/* Responsabilidades del usuario */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-blue mb-4">Responsabilidades del Usuario</h2>
          <p className="text-lg leading-relaxed">
            Al usar Earthbnb, aceptas ser el único responsable de tus interacciones con otros usuarios y anfitriones. 
            También debes garantizar que las reservas y los pagos se realicen de manera legítima y conforme a nuestras 
            políticas.
          </p>
        </section>

        {/* Limitación de responsabilidad */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-blue mb-4">Limitación de Responsabilidad</h2>
          <p className="text-lg leading-relaxed">
            Earthbnb no se hace responsable por daños o pérdidas ocasionadas por el uso de la plataforma. Los anfitriones 
            son responsables de las condiciones de sus propiedades, y los viajeros asumen los riesgos relacionados con 
            sus estadías.
          </p>
        </section>

        {/* Cambios a los términos */}
        <section>
          <h2 className="text-3xl font-semibold text-blue mb-4">Cambios a estos Términos</h2>
          <p className="text-lg leading-relaxed">
            Earthbnb se reserva el derecho de modificar estos términos en cualquier momento. Notificaremos a los usuarios 
            sobre cambios importantes mediante la plataforma o el correo registrado en su cuenta.
          </p>
        </section>
      </main>
    </div>
  );
};

export default TermsAndConditionsPage;
