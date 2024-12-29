import EmptyState from "../../components/EmptyState";
import ClientOnly from "../../components/ClientOnly";
import getCurrentUser from "../../actions/getCurrentUser";
import ReportClients from "./ReportClients";
import getReports from "../../actions/getReports";

const ReportsPage = async () => {
  const currentUser = await getCurrentUser();

  // Verificar si el usuario está autenticado
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Acción no permitida"
          subtitle="Por favor, inicia sesión"
        />
      </ClientOnly>
    );
  }

  // Obtener todos los reportes
  const reports = await getReports({}); // Llama sin filtros para obtener todo

  // Verificar si no existen reportes
  if (reports.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No hay reportes disponibles"
          subtitle="Aún no hay reportes registrados en la plataforma"
        />
      </ClientOnly>
    );
  }

  // Renderizar los reportes en la página
  return (
    <ClientOnly>
      <ReportClients
        reports={reports} // Pasar todos los reportes obtenidos
        currentUser={currentUser} // Pasar el usuario actual
      />
    </ClientOnly>
  );
};

export default ReportsPage;
