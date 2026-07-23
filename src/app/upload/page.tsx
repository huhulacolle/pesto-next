import IDrawing from "@/Interface/IDrawing";
import path from "path";
import sizeOf from "image-size";
import fs from "fs/promises";
import Modal from "@/components/Modal";
import UploadButton from "@/components/UploadButton";
import { revalidatePath } from "next/cache";
import sharp from "sharp";

export const dynamic = "force-dynamic";

export default async function UploadPage() {
  const dir = path.join(process.cwd(), "public", "pesto");
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

  const uploadDrawing = async (formData: FormData) => {
    "use server";

    // await new Promise(resolve => setTimeout(resolve, 10000));

    const file = formData.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return;
    }

    const uploadPath = path.join(dir, `${path.parse(file.name).name}.png`);

    const bytes = await file.arrayBuffer();

    const pngBuffer = await sharp(Buffer.from(bytes)).png().toBuffer();

    await fs.writeFile(uploadPath, pngBuffer);

    revalidatePath("/upload");
  };

  return (
    <>
      <div className=" gap-4 mb-8">
        <div className="bg-orange-300 border-4 border-red-700 p-4 text-center">
          <p className="text-4xl font-bold text-red-700">UPLOAD DES DESS1</p>
        </div>
      </div>
      <div className=" gap-4 mb-8  cursor-pointer">
        <UploadButton action={uploadDrawing} />
      </div>
      <div className="bg-cyan-200 border-8 border-blue-500 p-6 mb-8">
        <h2
          className="text-3xl font-bold text-blue-600 mb-4"
          style={{ textShadow: "2px 2px 0px rgba(255,255,255,0.8)" }}
        >
          ✨ LES DESSINS/CRÉATIONS DE SAUCE ✨
        </h2>
        <Modal drawings={drawings} />
      </div>
    </>
  );
}
