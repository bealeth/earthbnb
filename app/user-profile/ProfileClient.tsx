'use client';
import { useState, useCallback } from "react";
import Container from "../components/Container";
import Heading2 from "../components/Heading2";
import { SafeListing, SafeUser } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import AvatarProfile from "../components/AvatarProfile";
import Modal from "../components/Modal";
import Button from "../components/Button"; 
import ImageUpload from "../components/inputs/ImageUpload";

interface PClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PClient: React.FC<PClientProps> = ({ listings, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    bio: currentUser?.bio || "",
    password: "",
    image: currentUser?.image || "",
  });

  const [passwordError, setPasswordError] = useState<string>("");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
    // Validación cuando la contraseña cambia
    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password: string) => {
    // Regla de validación
    if (password.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres.");
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("La contraseña debe contener al menos una mayúscula.");
    } else if (!/\d/.test(password)) {
      setPasswordError("La contraseña debe contener al menos un número.");
    } else {
      setPasswordError("");
    }
  };

  const handleSaveChanges = () => {
    // Si hay algún error de validación en la contraseña, no permitir guardar los cambios
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    axios
      .put(`/api/users`, { ...editForm, id: currentUser?.id })
      .then(() => {
        toast.success("Perfil actualizado");
        setIsEditing(false);
        router.refresh();
      })
      .catch(() => toast.error("Hubo un error al actualizar el perfil"));
  };

  const handleImageChange = (url: string) => {
    setEditForm((prev) => ({ ...prev, image: url }));
  };

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Propiedad eliminada");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8 mb-10">
        <AvatarProfile src={currentUser?.image} />
        <div className="text-center md:text-left">
          <Heading2
            title={currentUser?.name ?? "Nombre desconocido"}
            subtitle={"Colaborador en Earthbnb"}
          />
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              <span className="font-bold">Teléfono:</span> {currentUser?.phone || "No especificado"}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Balance:</span> ${currentUser?.walletBalance ?? 0}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Tiempo en la app:</span>{" "}
              {new Date(currentUser?.createdAt || "").toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-bold">Biografía:</span>{" "}
              {currentUser?.bio || "No especificada"}
            </p>
          </div>
          <div className="mt-4 w-full max-w-xs">
            <Button
              label="Editar Perfil"
              onClick={handleEditClick}
              outline={false}
              small={false}
            />
          </div>
        </div>
      </div>

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
          gap-8"
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            currentUser={currentUser}
          />
        ))}
      </div>

      {isEditing && (
        <Modal onClose={handleCloseModal}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">Nombre</label>
              <input
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">Teléfono</label>
              <input
                name="phone"
                value={editForm.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                type="text"
                placeholder="Número de Teléfono"
              />
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">Biografía</label>
              <textarea
                name="bio"
                value={editForm.bio}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Cuéntanos más sobre ti"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">Nueva Contraseña</label>
              <input
                name="password"
                value={editForm.password}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                type="password"
                placeholder="********"
              />
              {passwordError && (
                <p className="text-blue text-sm mt-1">{passwordError}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-md font-medium text-gray-700">Imagen de Perfil</label>
              <ImageUpload value={editForm.image} onChange={handleImageChange} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                label="Cancelar"
                onClick={handleCloseModal}
                outline={true}
                small={true}
              />
              <Button
                label="Guardar"
                onClick={handleSaveChanges}
                outline={false}
                small={true}
              />
            </div>
          </div>
        </Modal>
      )}
    </Container>
  );
};

export default PClient;
