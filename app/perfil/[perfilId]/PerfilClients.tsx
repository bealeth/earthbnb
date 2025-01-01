'use client';
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import Heading from "@/app/components/Heading";
import { SafeListing, SafeUser } from "@/app/types";

interface PClientProps{
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}
const PClient: React.FC<PClientProps> = ({
    listings,
    currentUser
}) => {
    const router = useRouter();

    return(
         <Container>
            <Heading
                title="Alojamientos del usuario"
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
                        actionLabel="Eliminar"
                        currentUser={currentUser}
                        />

                ))}
            </div>
        </Container>
    );
}

export default PClient;