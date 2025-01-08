import React from 'react';
import AvatarProfile from './AvatarProfile';
import Button from './Button'; // Asegúrate de importar tu componente Button

interface ProfileBoardProps {
  name: string;
  bio: string;
  image: string;
  createdAt: string;
}

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  return date.toLocaleDateString('es-ES', options);
};

const ProfileBoard: React.FC<ProfileBoardProps> = ({ name, bio, image, createdAt }) => {
  // Manejo del clic en el botón de reporte
  const onReportClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert(`Has reportado al usuario ${name}. Se tomarán las acciones necesarias.`); // Cambia esta acción por lógica real de reporte
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Imagen del usuario */}
        <div className="w-full md:w-1/2">
          <AvatarProfile src={image} />
        </div>
        {/* Información del usuario */}
        <div className="flex-1 p-6">
          {/* Nombre */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">{name}</h1>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray2">Miembro desde el {formatDate(createdAt)}</p>
          </div>
          {/* Biografía */}
          <p className="mt-4 text-gray-700 text-sm leading-relaxed">{bio}</p>
          
          {/* Botón de Reportar */}
          <Button 
            label="Reportar Usuario" 
            onClick={onReportClick} 
            outline={true} 
            small={true} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileBoard;
