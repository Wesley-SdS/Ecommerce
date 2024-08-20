import React, { useEffect, useState } from "react";
import SummaryApi from "../common/index";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(SummaryApi.allProduct.url);
      const dataResponse = await response.json();
      console.log("Fetched Products:", dataResponse.data); // Log para depuração
      setProducts(dataResponse?.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 mx-8 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <ProductCard key={product._id || index} data={product} />
      ))}
    </div>
  );
};

export default ProductList;
