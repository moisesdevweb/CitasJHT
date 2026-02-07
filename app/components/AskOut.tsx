"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import confetti from "canvas-confetti";

// --- CONFIGURACIÓN ---
const phrases = [
  "No",
  "¿Estás segura?",
  "¡Será genial!",
  "Por favor 🥺",
  "¡Mira al gatito!",
  "¡Está llorando! 😭",
  "¡No seas cruel!",
  "¡Voy a morir de amor!",
  "¡Di que sí!",
  "Andaaa...",
  "No te arrepentirás"
];

// --- NUEVAS URLs (Más estables para evitar error 404) ---
const gifs = [
  // 0: Feliz / Bailando (Inicio)
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NW5rMDg2bGVsdjFveHpxYXF4enhhdnM3ZXVudGc0NGtnbzBhN3lwZCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/9um7C26pOXFOiex4Qb/giphy.gif",
  // 1: Shock / Duda
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3U1emtidTlobnNzbzF1Nzd0b3U3MGxlYmk1djV0cTA1a216ZjhhYSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/EClkor8zYeOvs9StMN/giphy.gif",
  // 2: Triste cabeza abajo
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXI5dWphNHhycWk0YTl2ZWVpNGgwbXR6dGk5ZTF3dWh4ZW5yZjVsayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/S6dJse528X4MpfAWGE/giphy.gif", 
  // 3: Llorando
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXI5dWphNHhycWk0YTl2ZWVpNGgwbXR6dGk5ZTF3dWh4ZW5yZjVsayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/P53TSsopKicrm/giphy.gif",
  // 4: Llorando mucho
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3anIza2piYXFoczh5OWhhdG1nYjFveWZyb2ZtY3Jzc2RweDVzbXkzbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ar71Hyi0ZKejXzMoNs/giphy.gif",
  // 5: Gato tirado
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MjhrbG9vYnV2NDdoY2NmNTJ1NWU0MWUzOG9zajVsNzl2dm5xdmtoaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2SCG9rbE1X2FSemSje/giphy.gif"
];

// Gif del final (Beso / Abrazo)
const successGif = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHBjcWRpNGRhM3Qwc2k0eG9zdHVoajNqdXA4MWhoa3ZqeTNwbWdieiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dYfnPQ8FXSZhe/giphy.gif";

export default function AskOut() {
  const [noCount, setNoCount] = useState(0);
  const [view, setView] = useState<"ask" | "yes">("ask");
  const [noPos, setNoPos] = useState({ top: "0%", left: "0%" });
  const [isMoved, setIsMoved] = useState(false);

  // El botón "Sí" crece con cada "No"
  // Limitamos el crecimiento para que no rompa el diseño demasiado rápido
  const yesScale = 1 + noCount * 0.15; 
  
  // A partir de 8 intentos, el botón SÍ ocupa toda la pantalla
  const isFullScreenYes = noCount >= 8;

  // Seleccionamos el GIF y la frase actual
  const currentGif = gifs[Math.min(noCount, gifs.length - 1)];
  const currentPhrase = phrases[Math.min(noCount, phrases.length - 1)];

  // Función para mover el botón No a una posición aleatoria REAL
  const moveNoBtn = useCallback(() => {
    if (typeof window === "undefined") return;

    // Obtenemos dimensiones de la ventana
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Generamos coordenadas aleatorias (dejando un margen para que no se salga)
    // Usamos valores en píxeles para mayor precisión
    const randomX = Math.random() * (windowWidth - 150); // 150px ancho aprox botón
    const randomY = Math.random() * (windowHeight - 60); // 60px alto aprox botón

    setNoPos({ 
      left: `${randomX}px`, 
      top: `${randomY}px` 
    });
    
    setIsMoved(true);
  }, []);

  const handleNoInteraction = () => {
    setNoCount((prev) => prev + 1);
    moveNoBtn();
  };

  const onYes = () => {
    setView("yes");
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ec4899", "#8b5cf6", "#f43f5e"]
    });
  };

  const reset = () => {
    setNoCount(0);
    setView("ask");
    setIsMoved(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden relative z-10 selection:bg-pink-200">
      
      <AnimatePresence mode="wait">
        {view === "ask" ? (
          <motion.div
            key="ask"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center border border-white/50 relative"
          >
            {/* Imagen del Gatito */}
            <motion.div 
              key={currentGif} // Clave única para forzar la animación al cambiar de GIF
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="h-48 mb-6 flex items-center justify-center"
            >
              <img 
                src={currentGif} 
                alt="Gatito reacción" 
                className="h-full object-contain filter drop-shadow-md" 
              />
            </motion.div>

            <h1 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">
              ¿Quieres tener una cita conmigo? 🌹
            </h1>
            <p className="text-gray-500 font-medium mb-8">
              Janeth, promete ser inolvidable... ✨
            </p>

            <div className="flex items-center justify-center gap-4 relative h-16 w-full">
              
              {/* Botón SÍ */}
              <motion.button
                onClick={onYes}
                style={{
                  ...(isFullScreenYes ? {
                    position: "fixed",
                    inset: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 99,
                    fontSize: "4rem",
                    borderRadius: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                  } : {})
                }}
                animate={{ scale: isFullScreenYes ? 1 : yesScale }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 z-10"
              >
                {isFullScreenYes && <span className="text-lg block mb-4">¡Ya no hay otra opción! 😈</span>}
                {isFullScreenYes ? "¡SÍ!" : "Sí"}
              </motion.button>

              {/* Botón NO */}
              {!isFullScreenYes && (
                <motion.button
                  // Eventos para Desktop y Móvil
                  onMouseEnter={handleNoInteraction} 
                  onTouchStart={handleNoInteraction} // Mejor soporte para móvil
                  onClick={handleNoInteraction}
                  
                  // Estilos de posición
                  style={{
                    position: isMoved ? "fixed" : "static",
                    left: isMoved ? noPos.left : "auto",
                    top: isMoved ? noPos.top : "auto",
                  }}
                  
                  // Animación suave al moverse
                  animate={{ 
                    x: [0, -5, 5, -5, 5, 0], // Pequeño temblor antes de irse
                    transition: { duration: 0.2 } 
                  }}
                  
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors z-20 whitespace-nowrap cursor-pointer"
                >
                  {currentPhrase}
                </motion.button>
              )}
            </div>
          </motion.div>
        ) : (
          /* VISTA DE ÉXITO */
          <motion.div
            key="yes"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center border border-white/50"
          >
            <div className="h-48 mb-6 flex items-center justify-center">
              <img 
                src={successGif} 
                alt="Beso" 
                className="h-full object-contain filter drop-shadow-md" 
              />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
              ¡Sabía que dirías que sí! ❤️
            </h2>
            <p className="text-gray-500 text-lg mb-8 font-medium">
              ¡Paso por ti a las 8!
            </p>
            <button
              onClick={reset}
              className="text-sm text-gray-400 underline hover:text-gray-600 transition-colors"
            >
              Volver a jugar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}