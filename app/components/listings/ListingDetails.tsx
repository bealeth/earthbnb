import React, { useEffect, useState } from "react";

interface ListingDetailsProps {
    listingId: string;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({ listingId }) => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    return (
        <div className="p-6 bg-white shadow-md rounded-md">
            <h1 className="text-xl font-bold mb-4">Detalles del Listado</h1>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default ListingDetails;
