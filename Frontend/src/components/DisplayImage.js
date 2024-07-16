import React from "react";
import { CgClose } from "react-icons/cg";

const DisplayImage = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
      <div className="relative max-w-sm max-h-sm sm:max-w-md sm:max-h-md">
        <img
          src={imageUrl}
          alt="Full Screen"
          className="w-full h-full object-contain border border-red-950 rounded"
          onClick={onClose} // Fecha ao clicar na imagem
        />
        <div
          className="absolute top-2 right-2 cursor-pointer rounded-full p-1"
          onClick={onClose}
        >
          <CgClose className="text-red-950 text-2xl hover:text-red-900" />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
