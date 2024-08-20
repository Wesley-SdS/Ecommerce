import React, { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useProductCategory from "../helpers/productCategory";
import HeroSection from "./HeroSection";
import Collections from "./Collections";
import "../index.css";
import SummaryApi from "../common";
import Slider from "react-slick";
import PropTypes from "prop-types";

const CATEGORY_ICONS = [
  {
    src: "https://cdn.awsli.com.br/1837/1837706/arquivos/security.png",
    alt: "Loja Segura",
    title: "Loja 100% Segura",
    subtitle: "Selo de Segurança"
  },
  {
    src: "https://cdn.awsli.com.br/1837/1837706/arquivos/brasil.png",
    alt: "Entregamos em todo o Brasil",
    title: "Entregamos",
    subtitle: "Em todo o Brasil"
  },
  {
    src: "https://cdn.awsli.com.br/1837/1837706/arquivos/iconcardtarja.png",
    alt: "Formas de pagamento",
    title: "Formas de pagamento",
    subtitle: "Simples e Seguras"
  },
  {
    src: "https://cdn.awsli.com.br/1837/1837706/arquivos/truck.png",
    alt: "Frete Gratis para São Paulo",
    title: "Frete Gratis",
    subtitle: "para São Paulo"
  },
  {
    src: "https://cdn.awsli.com.br/1837/1837706/arquivos/discount.png",
    alt: "Desconto de 10%",
    title: "Desconto de 10%",
    subtitle: "em compras a partir de R$ 200,00"
  }
];

const NavBar = () => {
  const { t } = useTranslation(); // Hook para tradução
  const location = useLocation();
  const categories = useProductCategory();
  console.log("NavBar Categories:", categories);

  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(true); // Inicialmente, considerando o carregamento

  const productsRef = useRef(null); // Referência para a seção de produtos

  const fetchCategoryProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(SummaryApi.categoryProduct.url);
      const dataResponse = await response.json();
      setLoading(false);
      if (dataResponse && dataResponse.data) {
        setCategoryProduct(dataResponse.data);
      } else {
        console.error(
          "Erro ao obter dados de categoria de produtos:",
          dataResponse
        );
      }
    } catch (error) {
      console.error("Erro na requisição de categoria de produtos:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const translateCategory = (category) => {
    const key = `admin.product_categories.${category
      .toLowerCase()
      .replace(/ /g, "_")}`;
    return t(key, { defaultValue: category });
  };

  // Condição para não renderizar a NavBar na página '/Admin'
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Não renderizar o NavBar se a rota for uma rota de administração
  if (isAdminRoute) {
    return null;
  }

  return (
    <div className="overflow-hidden mx-4">
      <header className="text-red-950 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="w-full font-semibold text-lg my-4">
            <div className="flex justify-between items-center mx-10 px-4">
              {loading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <div
                      className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden animate-pulse"
                      key={"categoryLoading" + index}
                    ></div>
                  ))
                : categoryProduct.map((product, index) => (
                    <React.Fragment key={product.category}>
                      <Link
                        to={`/product-category?category=${product.value}`}
                        className="cursor-pointer relative group"
                        onClick={scrollToProducts}
                      >
                        <p className="text-center text-sm md:text-base capitalize">
                          {translateCategory(product.category)}
                        </p>
                        <span className="absolute bottom-0 left-0 w-0 h-1 bg-red-900 transition-all duration-300 group-hover:w-full"></span>
                      </Link>
                      {index < categoryProduct.length - 1 && (
                        <span className="mx-2">|</span>
                      )}
                    </React.Fragment>
                  ))}
            </div>
          </div>
        </div>

        <HeroSection />
        <div className="w-full">
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={2500}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  infinite: true,
                  dots: true
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]}
          >
            {CATEGORY_ICONS.map((icon, index) => (
              <IconCard key={index} {...icon} />
            ))}
          </Slider>
        </div>
        <div ref={productsRef}>
          <Collections />
        </div>
      </header>
    </div>
  );
};

const IconCard = ({ src, alt, title, subtitle }) => (
  <div className="flex items-center justify-center space-x-4 w-full p-4">
    <img src={src} alt={alt} className="w-8 h-8 object-contain mb-2" />
    <div className="text-center">
      <p className="font-semibold">{title}</p>
      <p className="text-sm">{subtitle}</p>
    </div>
  </div>
);

IconCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default NavBar;
