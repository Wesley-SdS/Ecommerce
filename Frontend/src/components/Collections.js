import React from "react";
import image1 from "../assets/banner/10.png";
import image2 from "../assets/banner/11.png";
import image3 from "../assets/banner/17.png";

const collections = [
  { name: "Coleção Mandura", image: image1 },
  { name: "Coleção Bonarda", image: image3 },
  { name: "Coleção Zuccardi", image: image2 }
];

const Collections = () => {
  return (
    <section className="py-12 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {collections.map((collection, index) => (
            <div key={index} className="relative overflow-hidden">
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-60 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105 rounded-lg"
              />
              <button className="absolute bottom-4 left-4 border hover:transform hover:scale-105 text-white font-xs py-2 px-4 rounded">
                Ver mais
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
