import React, { useContext, useState } from "react";
import signup from "../assets/Melhor-Favicon.png";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import Context from "../context";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataResponse = await fetch(SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        // Armazenar o token no localStorage
        localStorage.setItem("authToken", dataApi.token);
        navigate("/");
        fetchUserDetails();
        fetchUserAddToCart();
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Failed to login. Please try again.");
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-2 py-5 w-full max-w-md mx-auto">
          <div className="w-48 h-48 mx-auto">
            <img src={signup} alt="login icons" />
          </div>
          <form className="" onSubmit={handleSubmit}>
            <div className="grid">
              <label>E-mail:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Senha:</label>
              <div className="bg-slate-100 p-2 flex justify-center">
                <input
                  type={showPassword ? "" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="w-full h-full outline-none bg-transparent flex items-center"
                />
                <div
                  className=" cursor-pointer text-xl "
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-950 "
              >
                Esqueceu sua senha ?
              </Link>
            </div>
            <button className="bg-red-950 text-white mt-4 px-6 py-2 w-full max-w-[150px] rounded-lg hover:bg-red-900">
              Entrar
            </button>
          </form>
          <p className="my-4">
            Não tem uma conta?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-700 hover:text-red-950 hover:underline"
            >
              Inscreva-se
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
