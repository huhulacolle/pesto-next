import IDrawing from "@/Interface/IDrawing";
import Modal from "@/components/Modal";
import UploadButton from "@/components/UploadButton";
import { cacheTag, updateTag } from "next/cache";
import path from "path";
import sharp from "sharp";

export default async function UploadPage() {
  "use cache";
  cacheTag("dessins");

  const username = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASSWORD;

  const drawings: IDrawing[] = await fetch(
    `${process.env.API_URL}/images`,
  ).then((data) => data.json());

  const uploadDrawing = async (formData: FormData) => {
    "use server";

    const file = formData.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return;
    }

    const bytes = await file.arrayBuffer();

    const pngBuffer = await sharp(Buffer.from(bytes)).png().toBuffer();

    const formData2 = new FormData();

    formData2.append(
      "file",
      new Blob([new Uint8Array(pngBuffer)], { type: "image/png" }),
      `${path.parse(file.name).name}.png`,
    );

    try {
      const token = btoa(username + ":" + password);

      await fetch(`${process.env.API_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: "Basic " + token,
        },
        body: formData2,
      });
    } catch (error) {
      alert(error);
    } finally {
      updateTag("dessins");
    }
  };

  const deleteDrawing = async (formData: FormData) => {
    "use server";
    const fileName = formData.get("delete") as string;

    try {
      const token = btoa(username + ":" + password);

      await fetch(`${process.env.API_URL}/${fileName}`, {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + token,
        },
      });
    } catch (error) {
      alert(error);
    } finally {
      updateTag("dessins");
    }
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
        <Modal drawings={drawings} action={deleteDrawing} />
      </div>
    </>
  );
}
