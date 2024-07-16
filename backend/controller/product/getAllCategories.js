const getAllCategories = async (req, res) => {
  try {
    // Aqui você deve buscar as categorias do seu banco de dados
    const categories = await Category.find(); // ajuste conforme seu modelo
    res.json({ data: categories });
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    res.status(500).json({ message: "Erro ao buscar categorias" });
  }
};

module.exports = getAllCategories;
