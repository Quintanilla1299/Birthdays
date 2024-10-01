"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Gift, Music, Cat } from 'lucide-react';

const flowers = [
  { id: 1, message: "Cada día contigo es un regalo." },
  { id: 2, message: "Tu sonrisa ilumina mi mundo." },
  { id: 3, message: "Eres la melodía más dulce en la sinfonía de mi vida." },
  { id: 4, message: "Contigo, cada momento es mágico." },
  { id: 5, message: "Tu amor es el mejor regalo que he recibido." }
];

const titleText = "Feliz cumpleaños N°24";
const subtitleText = "De Adrián para Anixi";
const dateText = "13/10/2024";

export default function BirthdayGarden() {
  const [openFlower, setOpenFlower] = useState(null);
  const [butterflyPosition, setButterflyPosition] = useState({ x: 0, y: 0 });
  const [caughtButterflies, setCaughtButterflies] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const controls = useAnimation();
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    };

    // Escuchar la primera interacción del usuario para iniciar la reproducción
    window.addEventListener('click', handleInteraction);

    const interval = setInterval(() => {
      setButterflyPosition({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      });
    }, 3000);

    return () => {
      window.removeEventListener('click', handleInteraction);
      clearInterval(interval);
    };
  }, []);

  const handleFlowerClick = (id) => {
    setOpenFlower(id === openFlower ? null : id);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleButterflyClick = () => {
    setCaughtButterflies(prev => prev + 1);
    controls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 }
    });
  };

  const handleTreeClick = () => {
    setShowVideo(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-sky-300 to-green-200 overflow-hidden">

      {/* Sol */}
      <div className="absolute top-5 right-5 w-16 h-16 bg-yellow-300 rounded-full animate-pulse sm:w-20 sm:h-20" />

      {/* Árbol central */}
      <div 
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        
      >
        <div className="w-28 h-60 bg-brown-600 rounded-b-full sm:w-40 sm:h-80" />
        <div className="w-60 h-48 bg-green-500 rounded-full -mt-24 sm:w-80 sm:h-60 sm:-mt-40" />
        <Gift onClick={handleTreeClick} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 text-red-500 cursor-pointer" />
      </div>

      {/* Flores */}
      {flowers.map((flower, index) => (
        <motion.div
          key={flower.id}
          className="absolute cursor-pointer"
          style={{
            left: `${(index + 1) * 15}%`,
            bottom: '10%'
          }}
          whileHover={{ scale: 1.1 }}
          onClick={() => handleFlowerClick(flower.id)}
        >
          <div className="w-16 h-20 sm:w-20 sm:h-24">
            <div className="w-full h-12 sm:h-16 bg-green-500 rounded-full" />
            <div className={`w-full h-12 sm:h-16 ${openFlower === flower.id ? 'bg-pink-400' : 'bg-pink-300'} rounded-full -mt-6 sm:-mt-8 flex items-center justify-center`}>
              <Heart className={`w-6 h-6 sm:w-8 sm:h-8 ${openFlower === flower.id ? 'text-red-500' : 'text-red-400'}`} />
            </div>
          </div>
          {openFlower === flower.id && (
            <div className="absolute bottom-full mb-2 p-2 bg-white rounded shadow-lg text-xs sm:text-sm w-40 sm:w-48">
              {flower.message}
            </div>
          )}
        </motion.div>
      ))}

      {/* Mariposa */}
      <motion.div
        className="absolute cursor-pointer"
        style={{ left: butterflyPosition.x, top: butterflyPosition.y }}
        animate={controls}
        onClick={handleButterflyClick}
      >
        <Cat className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
      </motion.div>

      {/* Contador de mariposas */}
      <div className="absolute top-2 left-2 bg-white p-1 rounded shadow sm:top-4 sm:left-4 sm:p-2">
        Gatos adoptados: {caughtButterflies}
      </div>

      {/* Video modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-2 sm:p-4 rounded-lg">
            <video ref={videoRef} width="320" height="180" className="sm:w-640 sm:h-360" controls>
              <source src="multimedia/happy-birthday.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
            <button 
              className="mt-2 px-2 py-1 sm:mt-4 sm:px-4 sm:py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => setShowVideo(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Música de fondo */}
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4">
        <Music className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
        <audio ref={audioRef} loop>
          <source src="multimedia/twenty one pilots - Smithereens (Official Audio).mp3" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}
