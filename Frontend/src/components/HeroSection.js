// src/components/HeroSection.js
import React from "react";

const HeroSection = () => {
  return (
    <section
      className="hero bg-cover bg-center text-white"
      style={{ backgroundImage: "url(/path-to-your-image.jpg)" }}
    >
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold">Reserva Pinot Noir</h1>
        <p className="mt-4 text-2xl">Economize R$ 361,00</p>
        <p className="mt-2 text-xl">
          <span className="line-through">R$ 850,90</span> por{" "}
          <span className="font-bold">R$ 489,90</span>
        </p>
        <button className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Comprar Agora
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
