'use client';
import { useCallback, useState } from "react";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import { SafeReport, SafeUser } from "../../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ReportCard from "../../components/reports/ReportCard";

interface ReportClientProps{
    reports: SafeReport[];
    currentUser?: SafeUser | null;
}
const ReportClient: React.FC<ReportClientProps> = ({
    reports,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) =>{
        setDeletingId(id);

        axios.delete(`/api/reports/${id}`)
        .then (()=>{
            toast.success('Reporte Eliminado');
            router.refresh();
        })
        .catch((error)=>{
            toast.error(error?.response?.data?.error);
        })
        .finally(()=>{
            setDeletingId('');
        });
    },[router]);
    return(
         <Container>
            <Heading
                title="Reportes"
                subtitle="Administra los reportes que han llegado"
            />
            <div
            className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grids-cols-3
            lg:gris-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8">
                {reports.map((report) =>(
                    <ReportCard
                        key={report.id}
                        data={report}
                        actionId={report.id}
                        onAction={onCancel}
                        disabled={deletingId == report.id}
                        actionLabel="Eliminar"
                        secondActionLabel="Contestar"
                        currentUser={currentUser}
                        />

                ))}
            </div>
        </Container>
    );
}

export default ReportClient;