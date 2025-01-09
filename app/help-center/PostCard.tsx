'use client';

import Image from "next/image";
import Button from "../components/Button";
import { useState } from "react";

interface PostCardProps {
  data: {
    id: string;
    title: string;
    detail: string; // Contenido completo del post
    image?: string;
    category: string;
  };
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
}) => {
  const [isContentVisible, setContentVisible] = useState(false);

  const toggleContentVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Evita que el clic navegue a otra página
    setContentVisible((prev) => !prev);
  };

  return (
    <div
      className="col-span-1 cursor-pointer group border rounded-lg p-4 hover:shadow-md transition"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
          aspect-square
          w-full
          relative
          overflow-hidden
          rounded-xl"
        >
          {data.image ? (
            <Image
              fill
              alt="Post Image"
              src={data.image}
              className="object-cover h-full w-full group-hover:scale-110 transition"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 animate-pulse" />
          )}
        </div>
        <div className="font-semibold text-lg">{data.title}</div>

        <Button
          label={isContentVisible ? "Ocultar contenido" : "Mostrar contenido"}
          onClick={toggleContentVisibility}
          small
          outline
        />

        {isContentVisible && (
          <div className="mt-2 text-gray-700">
            <p>{data.detail}</p>
          </div>
        )}

        {onAction && actionLabel && (
          <Button
            label={actionLabel}
            onClick={(e) => {
              e.stopPropagation();
              onAction(actionId);
            }}
            disabled={disabled}
            small
          />
        )}
      </div>
    </div>
  );
};

export default PostCard;
