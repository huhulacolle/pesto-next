"use client";

import IDrawing from "@/Interface/IDrawing";
import Image from "next/image";
import path from "path";
import { useState } from "react";
import Delete from "./Delete";

export default function Modal(props: {
  drawings: IDrawing[];
  action?: (formDate: FormData) => Promise<void>;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<IDrawing | null>(null);

  const openModal = (img: IDrawing) => {
    setSelectedImage(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {props.drawings.map(({ file, width, height }, i) => {
          const name = path.parse(file).name;
          const src = file;
          return (
            <div
              key={i}
              onClick={() => {
                const draw: IDrawing = {
                  file: src,
                  height,
                  width,
                };
                openModal(draw);
              }}
              className="flex flex-col justify-between h-full bg-linear-to-br from-pink-300 to-purple-300 border-4 border-purple-500 p-4 rounded hover:scale-110 transition cursor-pointer shadow-lg"
            >
              <div className="bg-white rounded p-3 mb-2 text-center">
                <Image
                  src={src}
                  alt={name}
                  width={width}
                  height={height}
                  className="mx-auto"
                  loading="lazy"
                />
              </div>

              <p className="font-bold text-center text-purple-800 text-sm">
                {name}
              </p>
              {props.action ? (
                <form action={props.action}>
                  <Delete file={path.parse(file).base} />
                </form>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
      {modalOpen && selectedImage && (
        <div
          className="fixed inset-0  flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-4 rounded shadow-lg animate-ridiculous border-4 border-purple-500"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.file}
              width={selectedImage.width}
              height={selectedImage.height}
              alt="dessin agrandi"
              className="max-w-[80vw] max-h-[80vh] object-contain rounded border-4 border-purple-500"
            />
            <button
              className="absolute top-2 right-2 text-xl font-bold text-red-600 cursor-pointer"
              onClick={closeModal}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
