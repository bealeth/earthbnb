import React, { useState } from 'react';
import Button from '../Button';

interface ListingReportProps {
  reason: string;
  setReason: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  disabled?: boolean;
}

const ListingReport: React.FC<ListingReportProps> = ({
  reason,
  setReason,
  onSubmit,
  disabled,
}) => {
  // Estado local para controlar la visibilidad del formulario
  const [isVisible, setIsVisible] = useState(false);

  // Función para alternar visibilidad
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      {/* Leyenda para abrir/cerrar el formulario */}
      <button
        onClick={toggleVisibility}
        className="text-gray2 underline hover:text-blue-700"
      >
        {isVisible ? "No reportar" : "Reportar alojamiento"}
      </button>

      {/* Mostrar el formulario solo si isVisible es true */}
      {isVisible && (
        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
          <h2 className="text-lg font-medium mb-4">Reportar un problema</h2>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describenos el problema"
            className="w-full p-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            rows={4}
          />
          <Button
            disabled={disabled}
            label="Enviar reporte"
            onClick={onSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default ListingReport;
