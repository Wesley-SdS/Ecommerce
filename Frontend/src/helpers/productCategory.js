import { useTranslation } from "react-i18next";

const useProductCategory = () => {
  const { t } = useTranslation();

  return [
    {
      id: 1,
      label: t("product_categories.protein_bars"),
      value: "Protein Bars"
    },
    { id: 2, label: t("product_categories.combos"), value: "combos" },
    { id: 3, label: t("product_categories.grains"), value: "grains" },
    { id: 4, label: t("product_categories.flours"), value: "flours" },
    { id: 5, label: t("product_categories.pasta"), value: "pasta" },
    { id: 6, label: t("product_categories.feculas"), value: "feculas" },
    { id: 7, label: t("product_categories.supplements"), value: "Suplementos" }
  ];
};

export default useProductCategory;
