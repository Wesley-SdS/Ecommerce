import React, { useContext, useState } from "react";
import scrollTop from "../helpers/scrollTop";
import displayINRCurrency from "../helpers/displayCurrency";
import Context from "../context";
import addToCart from "../helpers/addToCart";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const handleQuantityChange = (event) => {
    const value = Math.max(1, Number(event.target.value));
    setQuantity(value);
  };

  const incrementQuantity = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const handleBuyProductViaWhatsApp = (product) => {
    const message = `Olá, gostaria de comprar ${product.productName} (${quantity})!`;
    window.location.href = `https://wa.me/5511960924734?text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all">
      {loading
        ? loadingList.map((product, index) => (
            <div
              key={index}
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-lg border p-4 relative transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <div className="bg-red-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
              <div className="p-4 grid gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2"></p>
                <div className="flex gap-3">
                  <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                  <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                </div>
                <button className="text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse"></button>
              </div>
            </div>
          ))
        : data.map((product) => (
            <div
              key={product?._id}
              className="w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] bg-white rounded-lg border p-4 relative transition-transform transform hover:scale-105 hover:shadow-xl"
              onClick={scrollTop}
            >
              {product?.discountPercentage && (
                <div className="absolute top-0 left-0 bg-red-600 text-white px-2 py-1 rounded-br-lg">
                  {product?.discountPercentage}% OFF
                </div>
              )}
              <div className="h-48 p-4 flex justify-center items-center">
                <img
                  src={product?.productImage[0]}
                  alt={product?.productName}
                  className="object-cover h-full hover:scale-110 transition-all rounded"
                />
              </div>
              <div className="p-4 grid gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                  {product?.productName}
                </h2>
                <p className="capitalize text-slate-500">{product?.category}</p>
                <div className="flex gap-3">
                  <p className="text-red-600 font-medium">
                    {displayINRCurrency(product?.sellingPrice)}
                  </p>
                  <p className="text-slate-500 line-through">
                    {displayINRCurrency(product?.price)}
                  </p>
                </div>
                <div className="mt-2 flex justify-center items-center gap-2">
                  <div className="flex items-center">
                    <button
                      className="border border-r-0 rounded-l px-2 py-2 text-gray-600"
                      onClick={(e) => decrementQuantity(e)}
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
                      className="border border-l-0 rounded-r px-2 py-2 text-gray-600"
                      onClick={(e) => incrementQuantity(e)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="bg-red-900 text-white px-4 py-2 rounded flex items-center justify-center w-full hover:bg-red-800 transition-colors"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
                <button
                  className="bg-green-700 text-white w-full text-xs px-2 py-2 rounded flex items-center justify-center hover:bg-green-600 transition-colors mt-2"
                  onClick={() => handleBuyProductViaWhatsApp(product)}
                >
                  <FaWhatsapp className="mr-2 w-4 h-4" /> Comprar pelo WhatsApp
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default VerticalCard;
