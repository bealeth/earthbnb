'use client';

import React, { useState } from 'react';
import { SafeUser } from '@/app/types';
import ReportsPage from './ReportPage';

interface CenterViewProps {
  currentUser?: SafeUser | null; // Información del usuario actual
}

const CenterView: React.FC<CenterViewProps> = ({ currentUser }) => {

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      {/* Mensaje de bienvenida */}
      <header className="bg-blue text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">{currentUser ? `Bienvenido, ${currentUser.name}` : 'Bienvenido, invitado'}</h1>
        </div>
      </header>

      {/* Un texto de separación o título si es necesario */}
      <div className="text-center mb-6 text-xl font-semibold text-blue"></div>
      <div className="p-6 bg-white shadow-md rounded-md mt-4">
        <ReportsPage />
      </div>
    </div>
  );
};

export default CenterView;
