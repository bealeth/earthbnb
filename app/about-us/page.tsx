import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Header */}
      <header className="bg-blue text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Sobre Earthbnb</h1>
          <p className="mt-2 text-lg">
            Tu compañero de viajes ecológicos. Descubre el mundo mientras cuidas el planeta.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10 space-y-16">
        {/* Misión */}
        <section className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img
              src="https://images.pexels.com/photos/17005724/pexels-photo-17005724/free-photo-of-madera-naturaleza-hombre-pajaro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Explorando naturaleza"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-blue mb-4">Nuestra Misión</h2>
            <p className="text-lg leading-relaxed">
              En Earthbnb, estamos comprometidos con conectar viajeros y anfitriones que comparten un amor por el 
              planeta. Creamos una plataforma que fomenta el turismo responsable, alojamientos sostenibles y una 
              experiencia de viaje consciente. Nuestra misión es demostrar que explorar el mundo y cuidar el medio 
              ambiente no son objetivos opuestos, ¡sino complementarios!
            </p>
          </div>
        </section>

        {/* Valores */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue mb-4 text-center">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong>Sustentabilidad:</strong> Promovemos prácticas ecológicas en todos los aspectos del viaje.
                </li>
                <li>
                  <strong>Comunidades locales:</strong> Respetamos y apoyamos a las culturas y economías locales.
                </li>
              </ul>
            </div>
            <div>
              <ul className="list-disc pl-5 space-y-3">
                <li>
                  <strong>Innovación:</strong> Buscamos soluciones creativas para reducir el impacto ambiental del turismo.
                </li>
                <li>
                  <strong>Transparencia:</strong> Creemos en compartir nuestras prácticas y objetivos con honestidad.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Impacto Ambiental */}
        <section className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-blue mb-4">Nuestro Impacto Ambiental</h2>
            <p className="text-lg leading-relaxed">
              Desde 2024, hemos ayudado a miles de viajeros a optar por opciones de alojamiento más responsables. 
              Trabajamos activamente para educar y capacitar a nuestros anfitriones con prácticas ecológicas como la 
              utilización de energía renovable, compostaje y el uso de materiales sostenibles en sus propiedades. 🌱✨
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.pexels.com/photos/6130040/pexels-photo-6130040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Valores ecológicos"
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
