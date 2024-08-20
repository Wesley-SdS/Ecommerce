import React from "react";
import { useTranslation } from "react-i18next";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import ProductList from "../components/ProductList";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p className="flex justify-center text-2xl font-bold">
        Nossos Queridinhos
      </p>
      <div className="mx-4">
        <VerticalCardProduct clas category={"pasta"} heading={t("")} />
      </div>

      <ProductList />
    </div>
  );
};
