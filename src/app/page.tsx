import Cool from "@/components/Cool";
import Dessin from "@/components/Dessin";

export const dynamic = "force-dynamic";

export default function Home() {
  "use cache";

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Cool />
      <Dessin />
    </div>
  );
}
