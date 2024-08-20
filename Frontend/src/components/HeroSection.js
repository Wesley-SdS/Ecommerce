import React from "react";
import bannerImage from "../assets/banner/vinhos.png"; // Certifique-se que o caminho está correto

const HeroSection = () => {
  return (
    <section
      className="hero bg-cover bg-center  text-white min-h-96"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="flex  flex-col items-start ml-10   py-20 text-center">
        <button className="  bg-red-950 hover:bg-red-900 text-white font-semibold py-2 px-4 rounded mt-52">
          Comprar Agora
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
