import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";

import pirat from "@/assets/pirat.webp";
import logoGif from "@/assets/logo.gif";
import old from "@/assets/old-pain.gif";
import Cancan from "@/components/Cancan";

export const metadata: Metadata = {
  title: "pesto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`antialiased`}>
      <body className="">
        <div
          className="min-h-screen"
          style={{
            background:
              "linear-gradient(45deg, #00ccff 0%, #ffcc00 25%, #ff00ff 50%, #00ff00 75%, #00ccff 100%)",
            backgroundSize: "400% 400%",
          }}
        >
          <div className="bg-yellow-300 border-8 border-red-500 p-6 shadow-lg">
            <div className="fixed top-0 right-0 pointer-events-none">
              <Image
                src={pirat}
                alt="decoration mario"
                className="w-32 h-32 opacity-80"
                unoptimized
              />
            </div>
            <div className="flex justify-center mb-4">
              <Image
                src={logoGif}
                alt="Logo"
                className="pixel-art"
                loading="eager"
                unoptimized
              />
            </div>
            <h1
              className="text-center text-4xl font-bold text-red-600"
              style={{
                textShadow: "3px 3px 0px rgba(0,0,0,0.3)",
                fontFamily: "Arial, sans-serif",
              }}
            >
              🌸 oyeux anniversaire à notre trans pref 🌸
            </h1>
            <p className="text-center text-lg text-purple-700 font-bold mt-2">
              PestoSauce
            </p>
          </div>
          {children}
          <Cancan />
          <div className="fixed bottom-0 left-0 pointer-events-none">
            <Image
              src={old}
              loading="eager"
              alt="decoration mario"
              className="w-32 h-32 opacity-80"
              unoptimized
            />
          </div>
          <footer className="bg-purple-600 text-yellow-300 text-center p-6 border-t-8 border-pink-500 font-bold">
            <p className="text-lg mb-2">
              🌟 PAGE CRÉÉE AVEC PAR HUHULACOLLE ET{" "}
              <a href="https://youtu.be/GhW8NTyDB_c?si=B2FPOCidUnP4p9sl" target="_blank">HUGOLEMARCHAN</a> ❤️ 🌟
            </p>
            <div className="mt-3 flex justify-center gap-2">
              <span>✨</span>
              <span>🎨</span>
              <span>🌸</span>
              <span>⭐</span>
              <span>🎵</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
