import Cool from "@/components/Cool";
import Dessin from "@/components/Dessin";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <>
      <Cool />
      <Dessin />
    </>
  );
}
