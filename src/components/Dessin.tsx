import IDrawing from "@/Interface/IDrawing";
import Modal from "./Modal";
import { cacheTag } from "next/cache";

export default async function Dessin() {
  "use cache";
  cacheTag("dessins");

  const drawings: IDrawing[] = await fetch(
    `${process.env.API_URL}/images`,
  ).then((data) => data.json());

  return (
    <div className="bg-cyan-200 border-8 border-blue-500 p-6 mb-8">
      <h2
        className="text-3xl font-bold text-blue-600 mb-4"
        style={{ textShadow: "2px 2px 0px rgba(255,255,255,0.8)" }}
      >
        ✨ LES DESSINS/CRÉATIONS DE SAUCE ✨
      </h2>
      <Modal drawings={drawings} />
    </div>
  );
}
