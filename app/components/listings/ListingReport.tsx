import React, { useState } from 'react';
import Button from '../Button';

interface ListingReportProps {
  reason: string;
  setReason: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (data: { reason: string }) => Promise<void>;
  disabled?: boolean;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListingReport: React.FC<ListingReportProps> = ({
  isVisible,
  setIsVisible,
  reason,
  setReason,
  onSubmit,
  disabled,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!reason.trim()) {
      alert('Por favor, proporciona una descripción del problema.');
      return;
    }

    setLoading(true);

    try {
      await onSubmit({ reason: reason.trim() });
      alert('Reporte enviado con éxito.');
      setIsVisible(false); // Cierra el formulario de reporte
      setReason(''); // Limpia la descripción
    } catch {
      alert('Error enviando reporte.');
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div>
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        aria-expanded={isVisible}
        className="text-gray2 underline hover:text-blue-700"
      >
        {isVisible ? 'No reportar' : 'Reportar alojamiento'}
      </button>

      {isVisible && (
        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
          <h2 className="text-lg font-medium mb-4">Reportar un problema</h2>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Descríbenos el problema"
            className="w-full p-2 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 outline-none mb-4"
            rows={4}
          />
          <Button
            disabled={disabled || loading}
            label={loading ? 'Enviando...' : 'Enviar reporte'}
            onClick={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default ListingReport;
