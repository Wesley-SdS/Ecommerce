import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight, FaWhatsapp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const scrollElement = useRef();
  const { fetchUserAddToCart } = useContext(Context);

  // Estado para controlar a quantidade de cada produto individualmente
  const [quantities, setQuantities] = useState({});

  const handleAddToCart = async (e, id) => {
    const quantity = quantities[id] || 1; // Usa a quantidade ou 1 se não estiver definida
    await addToCart(e, id, quantity);
    fetchUserAddToCart();
  };

  const handleQuantityChange = (event, id) => {
    const value = Math.max(1, Number(event.target.value));
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: value
    }));
  };

  const incrementQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1
    }));
  };

  const decrementQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.max(1, (prevQuantities[id] || 1) - 1)
    }));
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="relative w-full px-4 my-6">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block z-10"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white  shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block z-10"
          onClick={scrollRight}
        >
          <FaAngleRight className="" />
        </button>

        {loading
          ? loadingList.map((_, index) => (
              <div
                key={index}
                className="w-full min-w-[280px] max-w-[280px] bg-white border p-4 rounded-lg relative transition-transform transform hover:scale-105 hover:shadow-xl"
                style={{ height: "400px" }} // Define a altura fixa dos cards
              >
                <div className="bg-slate-200 h-48 flex justify-center items-center animate-pulse"></div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200"></h2>
                  <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2"></p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                    <p className="text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                  </div>
                  <button className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full animate-pulse"></button>
                </div>
              </div>
            ))
          : data.map((product) => (
              <div
                key={product?._id}
                className="w-full min-w-[280px] max-w-[280px] bg-white border p-4 rounded-lg relative transition-transform transform hover:scale-105 hover:shadow-xl"
                style={{ height: "400px" }} // Define a altura fixa dos cards
              >
                {product.discountPercentage && (
                  <div className="absolute top-0 left-0 bg-red-600 text-white px-2 py-1 rounded-br-lg">
                    {product.discountPercentage}% OFF
                  </div>
                )}
                <div className="flex justify-center">
                  <Link
                    to={`/product/${product._id}`}
                    className="flex justify-center"
                  >
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      className="object-cover h-48 w-full rounded"
                      style={{ height: "200px" }} // Define uma altura fixa para a imagem
                    />
                  </Link>
                </div>
                <div className="mt-2 text-center">
                  <Link
                    to={`/product/${product._id}`}
                    className="font-bold text-lg"
                  >
                    <h2 className="text-ellipsis line-clamp-1">
                      {product.productName}
                    </h2>
                  </Link>
                  <p className="capitalize text-slate-500">
                    {product.category}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium">
                      {displayINRCurrency(product.sellingPrice)}
                    </p>
                    {product.price && (
                      <p className="text-slate-500 line-through">
                        {displayINRCurrency(product.price)}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 flex justify-center items-center gap-2">
                    <div className="flex items-center">
                      <button
                        className="border border-r-0 rounded-l px-2 py-2 text-gray-600"
                        onClick={() => decrementQuantity(product._id)}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={quantities[product._id] || 1}
                        onChange={(e) => handleQuantityChange(e, product._id)}
                        className="border-t border-b text-center w-16 py-2"
                        min="1"
                        readOnly
                      />
                      <button
                        className="border border-l-0 rounded-r px-2 py-2 text-gray-600"
                        onClick={() => incrementQuantity(product._id)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="bg-red-900 text-white px-4 py-2 rounded flex items-center justify-center w-full hover:bg-red-800 transition-colors"
                      onClick={(e) => handleAddToCart(e, product._id)}
                    >
                      Comprar
                    </button>
                  </div>
                  <button
                    className="bg-green-700 text-white w-full text-xs px-2 py-2 rounded flex items-center justify-center hover:bg-green-600 transition-colors mt-2"
                    onClick={() =>
                      window.open(
                        `https://wa.me/?text=Ol%C3%A1%20gostaria%20de%20comprar%20o%20produto%20${product.productName}`,
                        "_blank"
                      )
                    }
                  >
                    <FaWhatsapp className="mr-2 w-4 h-4" /> Comprar pelo
                    WhatsApp
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default VerticalCardProduct;
