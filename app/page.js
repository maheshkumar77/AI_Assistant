//import Image from "next/image";
import SpeechToText from "./Component/Spetchtoword"
export default function Home() {
  return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <SpeechToText/>
      </main>
  );
}
