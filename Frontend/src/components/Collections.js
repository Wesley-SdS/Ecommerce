// src/components/Collections.js
import React from "react";

const collections = [
  { name: "Coleção Mandura", image: "/path-to-image1.jpg" },
  { name: "Coleção Bonarda", image: "/path-to-image2.jpg" },
  { name: "Coleção Zuccardi", image: "/path-to-image3.jpg" }
];

const Collections = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded overflow-hidden"
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                <button className="mt-4 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded">
                  Ver mais
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
