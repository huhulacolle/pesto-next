"use client";

import { useRef, useState } from "react";
import flower from "@/assets/mario-wonder-talking-flower.gif";
import talk from "@/assets/mario-wonder-talking-flower talking.gif";
import Image from "next/image";

const audioFiles = [
  "/Fleur/sans-titre-2-2.wav",
  "/Fleur/sans-titre-3.wav",
  "/Fleur/sans-titre-4.wav",
  "/Fleur/sans-titre-5.wav",
  "/Fleur/sans-titre-6.wav",
  "/Fleur/sans-titre-7.wav",
  "/Fleur/sans-titre-8.wav",
  "/Fleur/sans-titre-9.wav",
  "/Fleur/sans-titre-10.wav",
  "/Fleur/sans-titre-11.wav",
  "/Fleur/sans-titre-12.wav",
  "/Fleur/sans-titre-13.wav",
  "/Fleur/sans-titre-14.wav",
  "/Fleur/sans-titre-15.wav",
  "/Fleur/sans-titre-16.wav",
  "/Fleur/sans-titre-17.wav",
  "/Fleur/sans-titre-18.wav",
  "/Fleur/sans-titre-19.wav",
  "/Fleur/sans-titre-20.wav",
  "/Fleur/sans-titre-21.wav",
];

export default function Cancan() {
  const [isActive, setIsActive] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getRandomDelay = () =>
    Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000;

  const getRandomIndex = (length: number) => Math.floor(Math.random() * length);

  const playSalut = () => {
    setIsTalking(true);
    const audio = new Audio("/Fleur/sans-titre-2.wav");
    audio.volume = 1;
    audio.play();
    audio.onended = () => {
      setIsTalking(false);
    };
  };

  const playRandom = () => {
    const randomIndex = getRandomIndex(audioFiles.length);

    setIsTalking(true);
    const audio = new Audio(audioFiles[randomIndex]);
    audio.volume = 1;
    audio.play();

    audio.onended = () => {
      setIsTalking(false);
      const delay = getRandomDelay();
      timerRef.current = setTimeout(playRandom, delay);
    };
  };

  const flowerTalk = async () => {
    setIsActive(true);
    playSalut();
    await new Promise((resolve) => setTimeout(resolve, 7000));
    playRandom();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isActive ? (
        <button
          onClick={flowerTalk}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg transition-transform hover:scale-110 cursor-pointer"
        >
          SECRET NE PAS CLIQUER ❌
        </button>
      ) : (
        <div className="flex flex-col items-center">
          <Image
            src={isTalking ? talk : flower}
            alt="Fleur Cancan"
            className="w-24 h-24"
            loading="eager"
          />
        </div>
      )}
    </div>
  );
}