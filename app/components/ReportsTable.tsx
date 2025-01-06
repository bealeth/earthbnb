import React, { useState } from "react";
import { SafeReport } from "@/app/types";
import Button from "../components/Button";
import Input from "../components/inputs/Input";
import { ReportStatus } from "@prisma/client"; // Asegúrate de importar el enum

interface ReportsTableProps {
  reports: SafeReport[];
  onUpdateReport: (
    id: string,
    status: ReportStatus, // Usar el enum ReportStatus en lugar de string
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
  const [sanctionAmounts, setSanctionAmounts] = useState<{ [id: string]: number | undefined }>({});
  const [visibleSanctionInput, setVisibleSanctionInput] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<ReportStatus | "">("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSanctionChange = (id: string, value: string) => {
    setSanctionAmounts({ ...sanctionAmounts, [id]: parseFloat(value) || 0 });
  };

  const filteredReports = reports
    .filter((report) => {
      const statusMatches =
        filterStatus === ""
          ? true
          : filterStatus === ReportStatus.POR_RESOLVER
          ? report.status === ReportStatus.POR_RESOLVER
          : report.status === ReportStatus.SOLUCIONADO;

      return statusMatches;
    })
    .sort((a, b) => {
      if (sortBy === "createdAt") {
        return sortOrder === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium">Ordenar por</label>
          <select
            className="border p-2 rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Fecha de creación</option>
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
            onChange={(e) => setFilterStatus(e.target.value as ReportStatus | "")}
          >
            <option value="">Todos</option>
            <option value={ReportStatus.POR_RESOLVER}>Pendientes</option>
            <option value={ReportStatus.SOLUCIONADO}>Resueltos</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium">Buscar</label>
          <input
            type="text"
            placeholder="Buscar por nombre, correo o motivo"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      <table className="border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr>
            <th className="border px-4 py-2">Reportero</th>
            <th className="border px-4 py-2">Usuario Reportado</th>
            <th className="border px-4 py-2">Motivo</th>
            <th className="border px-4 py-2">Estado</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.length === 0 ? (
            <tr>
              <td colSpan={5} className="border px-4 py-2 text-center">
                No hay reportes disponibles
              </td>
            </tr>
          ) : (
            filteredReports.map((report) => (
              <tr key={report.id}>
                <td className="border px-4 py-2">
                  {report.reporterId || "Desconocido"} <br />
                  <span className="text-sm text-gray-500">
                    {report.reporterId || "Sin correo"}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  {report.reportedUserId || "Desconocido"} <br />
                  <span className="text-sm text-gray-500">
                    {report.reportedUserId || "Sin correo"}
                  </span>
                </td>
                <td className="border px-4 py-2">{report.reason || "Sin motivo"}</td>
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
                              ReportStatus.SOLUCIONADO,  // Cambié este valor a SOLUCIONADO
                              sanctionAmounts[report.id],
                              "Amonestación aplicada"
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
