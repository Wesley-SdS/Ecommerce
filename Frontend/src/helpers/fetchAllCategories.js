import SummaryApi from "../common";

const fetchAllCategories = async () => {
  const response = await fetch(SummaryApi.getAllCategories.url, {
    method: SummaryApi.getAllCategories.method,
    headers: {
      "content-type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar categorias");
  }

  const dataResponse = await response.json();
  return dataResponse;
};

export default fetchAllCategories;
