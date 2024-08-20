import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {
  const {
    productName = "Produto Sem Nome",
    brandName = "",
    productImage = "",
    originalPrice,
    sellingPrice = 0,
    discountPercentage,
    _id // Supondo que _id é o ID do produto
  } = data;

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const value = Math.max(1, Number(event.target.value));
    setQuantity(value);
  };

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const handleBuyProduct = () => {
    // Lógica para comprar o produto com a quantidade selecionada
  };

  const handleBuyProductViaWhatsApp = () => {
    // Lógica para comprar o produto via WhatsApp com a quantidade selecionada
  };

  return (
    <div className="w-full border p-4 rounded-lg  relative transition-transform transform hover:scale-105 hover:shadow-xl">
      {discountPercentage && (
        <div className="absolute top-0 left-0 bg-red-600 text-white px-2 py-1 rounded-br-lg">
          {discountPercentage}% OFF
        </div>
      )}
      <div className="flex justify-center">
        <Link to={`/product/${_id}`} className="flex justify-center">
          <img
            src={productImage}
            alt={productName}
            className="h-52 w-52 object-cover rounded"
          />
        </Link>
      </div>
      <div className="mt-2 text-center">
        <Link to={`/product/${_id}`} className="font-bold text-lg">
          <h2>{productName}</h2>
        </Link>
        {brandName && (
          <Link to={`/product/${_id}`} className="text-sm text-gray-500">
            {brandName}
          </Link>
        )}
        {originalPrice !== undefined && (
          <p className="text-sm text-gray-400 line-through">{`R$ ${originalPrice.toFixed(
            2
          )}`}</p>
        )}
        <p className="text-lg text-red-600 font-bold">{`R$ ${sellingPrice.toFixed(
          2
        )}`}</p>

        <div className="mt-2 flex justify-center items-center gap-2">
          <div className="flex items-center">
            <button
              className="border border-r-0 rounded-l px-2 py-2 text-gray-600 "
              onClick={decrementQuantity}
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              className="border-t border-b text-center w-4 py-2"
              min="1"
              readOnly
            />
            <button
              className="border border-l-0 rounded-r px-2 py-2 text-gray-600 "
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
          <button
            className="bg-red-900 text-white px-4 py-2 rounded flex items-center justify-center w-full hover:bg-red-800 transition-colors"
            onClick={handleBuyProduct}
          >
            Comprar
          </button>
        </div>

        <button
          className="bg-green-700 text-white w-full text-xs px-2 py-2 rounded flex items-center justify-center hover:bg-green-600 transition-colors mt-2"
          onClick={handleBuyProductViaWhatsApp}
        >
          <FaWhatsapp className="mr-2 w-4 h-4" /> Comprar pelo WhatsApp
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
