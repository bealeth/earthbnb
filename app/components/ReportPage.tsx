import React, { useEffect, useState } from "react";
import ReportsTable from "./ReportsTable"; // Ajusta el path según tu estructura
import { SafeReport } from "@/app/types"; // Asegúrate de que el path sea correcto

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<SafeReport[]>([]); // Estado para los reportes
  const [updatingReportId, setUpdatingReportId] = useState<string | null>(null); // ID del reporte en actualización

  // Función para obtener los reportes desde la API
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/reports"); // Asegúrate de que esta sea la URL correcta
        if (!response.ok) {
          throw new Error(`Error al obtener los reportes: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Datos recibidos desde la API:", data);

        if (!data.reports || !Array.isArray(data.reports)) {
          throw new Error("Formato de respuesta inesperado: Se esperaba un array");
        }

        setReports(data.reports);
      } catch (error) {
        console.error("Error al obtener los reportes:", error);
      }
    };

    fetchReports();
  }, []);

  // Función para actualizar un reporte
  const handleUpdateReport = async (
    id: string,
    status: string,
    sanctionAmount?: number,
    message?: string
  ) => {
    setUpdatingReportId(id); // Indica que el reporte está siendo actualizado
    try {
      const response = await fetch(`/api/reports/${id}`, {
        method: "PATCH", // Asegúrate de usar PATCH
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, sanctionAmount, message }),
      });
  
      if (!response.ok) {
        throw new Error(`Error al actualizar el reporte: ${response.statusText}`);
      }
  
      const updatedReport = await response.json();
  
      // Actualiza el estado local con el reporte modificado
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === id ? { ...report, ...updatedReport } : report
        )
      );
    } catch (error) {
      console.error("Error al actualizar el reporte:", error);
    } finally {
      setUpdatingReportId(null); // Resetea el ID de actualización
    }
  };
  
  // Función para eliminar un reporte
  const handleDeleteReport = async (id: string) => {
    setUpdatingReportId(id); // Indica que el reporte está siendo eliminado
    try {
      const response = await fetch(`/api/reports/${id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error(`Error al eliminar el reporte: ${response.statusText}`);
      }

      setReports((prevReports) =>
        prevReports.filter((report) => report.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el reporte:", error);
    } finally {
      setUpdatingReportId(null); // Resetea el ID de actualización
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Reportes</h1>
      <ReportsTable
        reports={reports}
        onUpdateReport={handleUpdateReport}
        onDeleteReport={handleDeleteReport}
        updatingReportId={updatingReportId}
      />
    </div>
  );
};

export default ReportsPage;
