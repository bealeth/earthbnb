'use client';

import toast from "react-hot-toast";
import axios from "axios";
import { useCallback, useState} from "react";
import { useRouter } from "next/navigation";
import { safeReservation, SafeUser } from "../types/index";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
  reservations: safeReservation[];
  currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');// Estado para ganancias por listingId

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservación cancelada");
        router.refresh();
      })
      .catch(() => {
        toast.error('Oh, no. Algo salió mal');
      })
      .finally(() => {
        setDeletingId('');
      });
  }, [router]);

  return (
    <Container>
      <Heading
        title="Reservaciones"
        subtitle="Reservas en tus propiedades"
      />
      <div
        className="
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {reservations.map((reservation) => (
          <div key={reservation.id}>
            <ListingCard
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancelar reserva del huésped"
              currentUser={currentUser}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
