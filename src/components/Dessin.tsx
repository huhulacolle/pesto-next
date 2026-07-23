import fs from "fs/promises";
import path from "path";
import sizeOf from "image-size";
import IDrawing from "@/Interface/IDrawing";
import Modal from "./Modal";

export default async function Dessin() {
  const publicFolder = path.resolve('public')
  const dir = path.join(publicFolder, "pesto");
  const entries = await fs.readdir(dir);

  const drawings: IDrawing[] = await Promise.all(
    entries.map(async (file) => {
      const { width, height } = sizeOf(
        await fs.readFile(path.join(dir, file)),
      ) as {
        width: number;
        height: number;
      };
      return { file, width, height };
    }),
  );


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
