import React from "react";
import { useTranslation } from "react-i18next";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <CategoryList />
      <BannerProduct />

      <HorizontalCardProduct
        category={"flours"}
        heading={t("product_categories.flours")}
      />
      <HorizontalCardProduct
        category={"combos"}
        heading={t("product_categories.combos")}
      />

      <VerticalCardProduct
        category={"flours"}
        heading={t("product_categories.flours")}
      />
      <VerticalCardProduct
        category={"combos"}
        heading={t("product_categories.combos")}
      />
      <VerticalCardProduct
        category={"grains"}
        heading={t("product_categories.grains")}
      />
      <VerticalCardProduct
        category={"pasta"}
        heading={t("product_categories.pasta")}
      />
    </div>
  );
};
