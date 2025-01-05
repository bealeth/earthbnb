'use client';

import { SafeReport, SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { format } from 'date-fns';
import Button from "../Button";

interface ReportCardProps {
    data: SafeReport;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    secondActionLabel?: string;
    currentUser?: SafeUser | null;
}

const ReportCard: React.FC<ReportCardProps> = ({
    data,
    onAction,
    disabled,
    actionLabel,
    secondActionLabel,
    actionId = "",
}) => {
    const router = useRouter();

    const handleAction = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            onAction?.(actionId);
        },
        [onAction, actionId, disabled]
    );

    return (
        <div
            onClick={() => router.push(`/reports/${data.id}`)}
            className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-2 wl-full p-4 bg-white rounded-lg shadow-md">
                <div className="font-semibold text-lg">
                    Reporte ID: {data.id}
                </div>
                <div className="font-light text-neutral-500">
                    Origen del reporte: {data.id|| "Usuario desconocido"}
                </div>
                <div className="text-sm text-neutral-400">
                    Fecha de reporte: {format(new Date(data.createdAt), 'PP')}
                </div>
                <div className="text-sm text-neutral-400">
                    Alojamiento reportado: {data.reportedListingId}
                </div>
                <div className="font-light text-neutral-700">
                    Razón: {data.reason || "No especificada"}
                </div>
                {onAction && actionLabel && (
                    <div className="mt-4">
                        <Button
                            disabled={disabled}
                            small
                            label={actionLabel}
                            onClick={handleAction}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReportCard;
