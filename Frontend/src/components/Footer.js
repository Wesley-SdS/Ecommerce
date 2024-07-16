import React from "react";
import {
  FaWhatsapp,
  FaEnvelope,
  FaGooglePlusG,
  FaTwitter,
  FaInstagram
} from "react-icons/fa";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 p-4">
          <Link to={"/"}>
            <Logo w={250} h={50} />
          </Link>
          <p className=" text-justify">
            Melhor do Grão, sua loja de referência para produtos saudáveis e
            nutritivos! Nossa missão é oferecer a você uma ampla variedade de
            produtos de alta qualidade que atendem às suas necessidades
            alimentares específicas.
          </p>
          <p>
            Aqui, você encontrará uma vasta seleção de itens sem glúten, sem
            lactose, sem adição de açúcares, todos ricos em proteínas e
            incrivelmente saudáveis. Priorizamos a sua saúde e bem-estar,
            garantindo que cada produto disponível seja da mais alta qualidade.
          </p>
        </div>
        <div className="w-full md:w-1/4 pl-10 p-4">
          <h3 className="font-bold mb-4">Categorias</h3>
          <ul className="">
            <li className="py-1 hover:text-red-900">
              <Link to="/categoria/barra-de-proteina">Barra de Proteína</Link>
            </li>
            <li className="py-1 hover:text-red-900">
              <Link to="/categoria/combos">Combos</Link>
            </li>
            <li className="py-1 hover:text-red-900">
              <Link to="/categoria/farinhas-e-graos">Farinhas e grãos</Link>
            </li>
            <li className="py-1 hover:text-red-900">
              <Link to="/categoria/massas">Massas</Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 p-4">
          <h3 className="font-bold mb-4">Institucional</h3>
          <ul>
            <li className="py-1 hover:text-red-900">
              <Link to="/quem-somos">Quem Somos</Link>
            </li>
            <li className="py-1 hover:text-red-900 ">
              <Link to="/receitas">Receitas</Link>
            </li>
            <li className="py-1 hover:text-red-900">
              <Link to="/como-comprar">Como Comprar</Link>
            </li>
            <li className="py-1 hover:text-red-900">
              <Link to="/politica-melhor-do-grao">Política Melhor do Grão</Link>
            </li>
            <li className="py-1 hover:text-red-900">
              <Link to="/formas-de-pagamento">Formas de Pagamentos</Link>
            </li>
            <li className="py-1 hover:text-red-900">
              <Link to="/politica-de-trocas-e-devolucoes">
                Política de Trocas e Devoluções
              </Link>
            </li>
            <li className="py-1 hover:text-red-900">
              <Link to="/ganho-de-massa-muscular">Ganho de Massa Muscular</Link>
            </li>
            <li className="py-1 hover:text-red-900">
              <Link to="/promocoes-e-regulamentos">
                Promoções e Regulamentos
              </Link>
            </li>
            <li className="py-1 hover:text-red-900">
              <Link to="/politica-de-privacidade">Política de privacidade</Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 p-4">
          <h3 className="font-bold mb-4">Contato</h3>
          <ul>
            <li className="flex items-center space-x-2 py-1">
              <FaWhatsapp /> <span>Whatsapp: (11) 96486-4357</span>
            </li>
            <li className="flex items-center space-x-2 py-1">
              <FaEnvelope /> <span>E-mail: contato@melhordograo.com.br</span>
            </li>
          </ul>
          <p className="mt-4">
            Horario de Atendimento
            <br />
            Seg. à Sex. 9h às 22h
          </p>
          <button className="bg-red-950 text-white mt-4 px-6 py-2 rounded-lg hover:bg-red-900">
            FALE CONOSCO
          </button>
        </div>
        <div className="w-full mt-4 flex justify-center">
          <h3 className="font-bold mr-4">Acompanhe nas Redes</h3>
          <ul className="flex space-x-4 ">
            <li className="">
              <Link>
                <FaGooglePlusG className=" flex w-7 h-7 hover:text-red-900" />
              </Link>
            </li>
            <li>
              <Link href="#">
                <FaTwitter className=" flex w-7 h-7 hover:text-red-900" />
              </Link>
            </li>
            <li>
              <Link>
                <FaInstagram className=" flex w-7 h-7 hover:text-red-900" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
