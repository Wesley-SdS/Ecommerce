import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useProductCategory from "../helpers/productCategory";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common";

const CategoryProduct = () => {
  const { t } = useTranslation();
  const productCategory = useProductCategory();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    const formattedCategory = el.toLowerCase().replace(/ /g, "_");
    urlCategoryListObject[formattedCategory] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("asc");

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCategoryList
      })
    });

    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
    setLoading(false);
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked
    }));
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(
      (categoryKeyName) => selectCategory[categoryKeyName]
    );

    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el) => `category=${el}`).join("&&");
    navigate("/product-category?" + urlFormat);
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
    setData((prev) =>
      [...prev].sort((a, b) =>
        value === "asc"
          ? a.sellingPrice - b.sellingPrice
          : b.sellingPrice - a.sellingPrice
      )
    );
  };

  // Log the categories
  console.log("Product Categories:", productCategory);
  console.log("Selected Categories:", selectCategory);

  return (
    <div className="container mx-auto p-4">
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              {t("common.order_by")}
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  value="asc"
                />
                <label>{t("common.price_low_to_high")}</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  value="dsc"
                />
                <label>{t("common.price_high_to_low")}</label>
              </div>
            </form>
          </div>
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              {t("common.category")}
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((category) => {
                // Convert category values to lowercase and replace spaces
                const valueKey = category.value
                  .toLowerCase()
                  .replace(/ /g, "_");
                return (
                  <div className="flex items-center gap-3" key={category.id}>
                    <input
                      type="checkbox"
                      name="category"
                      checked={selectCategory[valueKey] || false}
                      value={valueKey}
                      id={valueKey}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={valueKey}>
                      {t(`admin.product_categories.${valueKey}`)}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            {t("common.search_results")} {data.length}
          </p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {loading ? (
              <p>{t("common.loading")}</p>
            ) : data.length === 0 ? (
              <p>{t("common.no_data_found")}</p>
            ) : (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
