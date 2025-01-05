import React, { useState } from "react";
import { SafeReport } from "@/app/types";
import Button from "../components/Button";
import Input from "../components/inputs/Input";

interface ReportsTableProps {
  reports: SafeReport[];
  onUpdateReport: (
    id: string,
    status: string,
    sanctionAmount?: number,
    message?: string
  ) => void;
  onDeleteReport: (id: string) => void;
  updatingReportId: string | null;
}

const ReportsTable: React.FC<ReportsTableProps> = ({
  reports,
  onUpdateReport,
  onDeleteReport,
  updatingReportId,
}) => {
  const [sanctionAmounts, setSanctionAmounts] = useState<{ [id: string]: number }>({});
  const [visibleSanctionInput, setVisibleSanctionInput] = useState<string | null>(null);

  // Estados para filtros, ordenamiento y búsqueda
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Manejo del cambio en el input de amonestación
  const handleSanctionChange = (id: string, value: string) => {
    setSanctionAmounts({ ...sanctionAmounts, [id]: parseFloat(value) || 0 });
  };

  // Función para ordenar, filtrar y buscar en los reportes
  const filteredReports = reports
    .filter((report) => {
      // Filtrar por estado
      const statusMatches =
        filterStatus === ""
          ? true
          : filterStatus === "Avisos enviados"
          ? report.status === "Aviso enviado"
          : report.status === "Por resolver";

      // Filtrar por búsqueda
      const searchMatches =
        report.reportedListingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.reason.toLowerCase().includes(searchQuery.toLowerCase());

      return statusMatches && searchMatches;
    })
    .sort((a, b) => {
      if (sortBy === "createdAt") {
        return sortOrder === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === "reportedListingTitle") {
        return sortOrder === "asc"
          ? a.reportedListingTitle.localeCompare(b.reportedListingTitle)
          : b.reportedListingTitle.localeCompare(a.reportedListingTitle);
      }
      return 0;
    });

  return (
    <div>
      {/* Controles para filtro, ordenamiento y búsqueda */}
      <div className="mb-4 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium">Ordenar por</label>
          <select
            className="border p-2 rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Fecha de creación</option>
            <option value="reportedListingTitle">Nombre del alojamiento</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Orden</label>
          <select
            className="border p-2 rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Filtrar por estado</label>
          <select
            className="border p-2 rounded"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Avisos enviados">Avisos enviados</option>
            <option value="Pendiente">Pendientes</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Buscar</label>
          <input
            type="text"
            placeholder="Buscar por título o motivo"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      {/* Tabla de reportes */}
      <table className="border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr>
            <th className="border px-4 py-2">Título</th>
            <th className="border px-4 py-2">Motivo</th>
            <th className="border px-4 py-2">Estado</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.length === 0 ? (
            <tr>
              <td colSpan={4} className="border px-4 py-2 text-center">
                No hay reportes disponibles
              </td>
            </tr>
          ) : (
            filteredReports.map((report) => (
              <tr key={report.id}>
                <td className="border px-4 py-2">
                  {report.reportedListingTitle || "Desconocido"}
                </td>
                <td className="border px-4 py-2">{report.reason || "Desconocido"}</td>
                <td className="border px-4 py-2">{report.status || "Desconocido"}</td>
                <td className="border px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Button
                      label={visibleSanctionInput === report.id ? "Cancelar" : "Válido"}
                      onClick={() =>
                        setVisibleSanctionInput(
                          visibleSanctionInput === report.id ? null : report.id
                        )
                      }
                      outline={visibleSanctionInput === report.id}
                    />
                    {visibleSanctionInput === report.id && (
                      <>
                        <Input
                          id={`sanction-${report.id}`}
                          label="Cantidad"
                          type="number"
                          value={sanctionAmounts[report.id]?.toString() || ""}
                          onChange={(e) => handleSanctionChange(report.id, e.target.value)}
                        />
                        <Button
                          label="Guardar Amonestación"
                          onClick={() =>
                            onUpdateReport(
                              report.id,
                              "Aviso enviado",
                              sanctionAmounts[report.id],

                              "Aviso enviado"
                            )
                          }
                          disabled={updatingReportId === report.id}
                          outline
                        />
                      </>
                    )}
                    <Button
                      label="Inválido"
                      onClick={() => onDeleteReport(report.id)}
                      disabled={updatingReportId === report.id}
                      outline
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsTable;
