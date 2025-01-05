import React, { useState } from 'react';
import Button from '../Button';
import RentModal from '../modals/RentModal';
import ReportModal from '../modals/ReportModal';

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
    } catch (error) {
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
        
          <ReportModal/>
      )}
    </div>
  );
};

export default ListingReport;
