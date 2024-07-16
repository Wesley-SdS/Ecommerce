import React from "react";
import { Link } from "react-router-dom";
import useProductCategory from "../helpers/productCategory";
import HeroSection from "./HeroSection"; // ajuste o caminho se necessário
import Collections from "./Collections"; // ajuste o caminho se necessário

const NavBar = () => {
  const categories = useProductCategory();

  return (
    <div>
      <header className="border text-red-950 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">
            <button className="text-base hover:text-red-900">
              Ofertas Especiais
            </button>
          </div>
          <nav className="w-full">
            <ul className="flex justify-around items-center">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li className="flex items-center" key={category.id}>
                    <Link
                      to={`/category/${category.value}`}
                      className="hover:text-green-800"
                    >
                      {category.label}
                    </Link>
                    <span className="mx-2">|</span>
                  </li>
                ))
              ) : (
                <li>Nenhuma categoria encontrada</li>
              )}
            </ul>
          </nav>
        </div>
        <HeroSection />
        <div className="w-full">
          <div className="flex flex-wrap justify-between">
            <div className="flex items-center w-full md:w-auto p-2">
              <img
                src="https://cdn.awsli.com.br/1837/1837706/arquivos/security.png"
                alt="Loja Segura"
                className="w-8 h-8 object-contain mr-2"
              />
              <div>
                <p>Loja 100% Segura</p>
                <p>Selo de Segurança</p>
              </div>
            </div>
            <div className="flex items-center w-full md:w-auto p-2">
              <img
                src="https://cdn.awsli.com.br/1837/1837706/arquivos/brasil.png"
                alt="Entregamos em todo o Brasil"
                className="w-8 h-8 object-contain mr-2"
              />
              <div>
                <p>Entregamos</p>
                <p>Em todo o Brasil</p>
              </div>
            </div>
            <div className="flex items-center w-full md:w-auto p-2">
              <img
                src="https://cdn.awsli.com.br/1837/1837706/arquivos/iconcardtarja.png"
                alt="Formas de pagamento"
                className="w-8 h-8 object-contain mr-2"
              />
              <div>
                <p>Formas de pagamento</p>
                <p>Simples e Seguras</p>
              </div>
            </div>
            <div className="flex items-center w-full md:w-auto p-2">
              <img
                src="https://cdn.awsli.com.br/1837/1837706/arquivos/truck.png"
                alt="Frete Gratis para São Paulo"
                className="w-8 h-8 object-contain mr-2"
              />
              <div>
                <p>Frete Gratis</p>
                <p>para São Paulo</p>
              </div>
            </div>
            <div className="flex items-center w-full md:w-auto p-2">
              <img
                src="https://cdn.awsli.com.br/1837/1837706/arquivos/discount.png"
                alt="Desconto de 10%"
                className="w-8 h-8 object-contain mr-2"
              />
              <div>
                <p>Desconto de 10%</p>
                <p>em compras a partir de R$ 200,00</p>
              </div>
            </div>
          </div>
        </div>

        <Collections />
      </header>
    </div>
  );
};

export default NavBar;
