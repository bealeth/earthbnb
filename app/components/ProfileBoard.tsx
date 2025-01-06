import React from 'react';

interface ProfileBoardProps {
  name: string;
  bio: string;
  imageUrl: string;
}

const ProfileBoard: React.FC<ProfileBoardProps> = ({ name, bio, imageUrl }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Encabezado con imagen */}
      <div className="flex flex-col md:flex-row">
        {/* Imagen del usuario */}
        <div className="w-full md:w-1/3">
          <img
            className="h-48 md:h-auto w-full object-cover"
            src={imageUrl}
            alt={`Foto de ${name}`}
          />
        </div>
        {/* Información del usuario */}
        <div className="flex-1 p-6">
          {/* Nombre y etiqueta */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">{name}</h1>
            <span className="bg-pink-500 text-white px-3 py-1 rounded-md text-xs">
              Años como anfitrión
            </span>
          </div>
          {/* Biografía */}
          <p className="mt-4 text-gray-700 text-sm leading-relaxed">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileBoard;
