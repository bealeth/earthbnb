import React from "react";

type UserProfileProps = {
  name: string | null;
  joinedDate: string;
  profilePicture: string;
  bio: string;
};

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  joinedDate,
  profilePicture,
  bio,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <header className="flex flex-col items-center mb-6">
        <img
          src={profilePicture}
          alt={`${name || "Usuario"}'s profile`}
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        <h1 className="text-2xl font-bold mt-4">{name || "Nombre desconocido"}</h1>
        <p className="text-sm text-gray-500">
          Miembro desde: {new Date(joinedDate).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>
      <div>
        <h2 className="text-lg font-semibold mb-2">Biografía</h2>
        <p className="text-gray-700">{bio || "Este usuario aún no ha añadido una biografía."}</p>
      </div>
    </div>
  );
};

export default UserProfile;
