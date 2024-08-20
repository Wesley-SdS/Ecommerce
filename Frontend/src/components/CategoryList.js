import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.categoryProduct.url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const dataResponse = await response.json();
      if (dataResponse && dataResponse.data) {
        setCategoryProduct(dataResponse.data);
      } else {
        console.error("Dados inválidos recebidos:", dataResponse);
      }
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((_, index) => (
              <div
                className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden animate-pulse bg-gray-200"
                key={index}
              ></div>
            ))
          : categoryProduct.map((product) => (
              <Link
                to={`/product-category?category=${encodeURIComponent(
                  product.category
                )}`}
                className="cursor-pointer text-center"
                key={product.category}
              >
                <p className="text-sm md:text-base capitalize">
                  {product.category}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryList;
