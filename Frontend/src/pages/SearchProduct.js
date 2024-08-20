import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SummaryApi from "../common";
import VerticalCard from "../components/VerticalCard";

const SearchProduct = () => {
  const { t } = useTranslation();
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef(null);

  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.searchProduct.url + query.search);
    const dataResponse = await response.json();
    setLoading(false);

    setData(dataResponse.data);
    scrollToResults();
  };

  const scrollToResults = () => {
    if (resultsRef.current) {
      window.scrollTo({
        top: resultsRef.current.offsetTop - 150,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">{t("common.loading")}</p>}

      <p className="text-lg font-semibold my-3" ref={resultsRef}>
        {t("common.search_results")} {data.length}
      </p>

      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">
          {t("common.no_data_found")}
        </p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
