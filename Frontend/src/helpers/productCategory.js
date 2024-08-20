import { useTranslation } from "react-i18next";

const useProductCategory = () => {
  const { t } = useTranslation();

  const categories = [
    {
      id: 1,
      label: t("admin.product_categories.protein_bars"),
      value: "Protein Bars"
    },
    { id: 2, label: t("admin.product_categories.combos"), value: "Combos" },
    { id: 3, label: t("admin.product_categories.grains"), value: "Grains" },
    { id: 4, label: t("admin.product_categories.flours"), value: "Flours" },
    { id: 5, label: t("admin.product_categories.pasta"), value: "Pasta" },
    { id: 6, label: t("admin.product_categories.feculas"), value: "Feculas" },
    {
      id: 7,
      label: t("admin.product_categories.supplements"),
      value: "Supplements"
    }
  ];

  // Adicione este console.log para verificar a tradução
  console.log("Categories:", categories);

  return categories;
};

export default useProductCategory;
