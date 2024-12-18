'use client';
import { useCallback, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, safeReservation, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

interface PClientProps{
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}
const PClient: React.FC<PClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) =>{
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
        .then (()=>{
            toast.success('Propiedad Eliminada');
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
                title="Propiedades"
                subtitle="Administra tus propiedades"
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
                {listings.map((listing) =>(
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingId == listing.id}
                        actionLabel="Eliminar"
                        currentUser={currentUser}
                        />

                ))}
            </div>
        </Container>
    );
}

export default PClient;