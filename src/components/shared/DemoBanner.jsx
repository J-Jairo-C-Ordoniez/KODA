"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";

const STORAGE_KEY = "modaestilo_demo_banner_dismissed";

export default function DemoBanner() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, "true");
      setVisible(false);
    }, 350);
  };

  if (!visible) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-9998 bg-black/60 backdrop-blur-sm"
        style={{
          animation: closing
            ? "fadeOut 0.35s ease forwards"
            : "fadeIn 0.35s ease forwards",
        }}
        onClick={handleClose}
        aria-hidden="true"
      />

      <dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-banner-title"
        aria-describedby="demo-banner-desc"
        className="fixed inset-0 z-9999 flex items-center justify-center p-4 w-full h-full bg-black/0"
      >
        <article className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl bg-foreground">
          <div className="p-8 text-center">
            <span className="text-red-600 inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-5 bg-red-200 border border-red-400">
              Versión Demo
            </span>

            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center border border-yellow-600 bg-yellow-100">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
            </div>

            <h2
              id="demo-banner-title"
              className="text-sm font-bold mb-3 text-primary/90 uppercase tracking-wider"
            >
              Estás viendo una demo
            </h2>

            <p
              id="demo-banner-desc"
              className="text-sm leading-relaxed mb-7 text-primary/80 tracking-wider"
            >
              Este entorno es únicamente para mostrar el proyecto. Los datos
              pueden ser de prueba y algunas funciones pueden estar limitadas.
              <br />
              <br />
              Si deseas explorar la versión productiva, visítala aquí:
            </p>

            <Link
              href="https://modayestilo.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 mb-4 bg-primary hover:bg-primary/80 text-foreground"
            >
              <ArrowRight className="w-4 h-4" />
              Ir a la versión productiva
            </Link>

            <div>
              <button
                onClick={handleClose}
                className="text-sm tracking-wider transition-colors duration-200 underline underline-offset-2 text-primary/80"
              >
                Entendido, continuar en la demo
              </button>
            </div>
          </div>
        </article>
      </dialog>
    </>
  );
}
