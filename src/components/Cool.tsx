import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export default async function Cool() {
  const dir = path.join(process.cwd(), "public", "pesto");
  const entries = await fs.readdir(dir);

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-lime-300 border-4 border-green-700 p-4 text-center">
        <p className="text-4xl font-bold text-green-700"> {entries.length} </p>
        <p className="text-sm font-bold text-green-700">CRÉATIONS</p>
      </div>
      <div className="bg-orange-300 border-4 border-red-700 p-4 text-center">
        <p className="text-4xl font-bold text-red-700">∞</p>
        <p className="text-sm font-bold text-red-700">TALENT</p>
      </div>
      <div className="bg-pink-300 border-4 border-pink-700 p-4 text-center">
        <p className="text-4xl font-bold text-pink-700">100%</p>
        <p className="text-sm font-bold text-pink-700">COOL 😎</p>
      </div>
    </div>
  );
}
