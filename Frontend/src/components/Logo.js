import React from "react";
import logo from "../assets/melhordograo.png"; // Atualize o caminho conforme necessário

const Logo = ({ w, h }) => {
  return <img src={logo} width={w} height={h} alt="Logo" />;
};

export default Logo;
