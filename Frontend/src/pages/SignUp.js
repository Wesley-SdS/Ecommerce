import React, { useState } from "react";
import signup from "../assets/Melhor-Favicon.png";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    profilePic: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageTobase64(file);
    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.ConfirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataApi = await dataResponse.json();

      if (dataApi.sucess) {
        toast.success(dataApi.message);
        navigate("/login");
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      console.log("Please check password and confirm password");
    }
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-2 py-5 w-full max-w-md mx-auto">
          <div className="w-48 h-48 mx-auto relative ">
            <div>
              <img src={data.profilePic || signup} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-sm text-center bg-opacity-80 cursor-pointer bg-gray-100 py-2 w-full transparen rounded-md absolute bottom-0">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form className="" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Nome:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label>E-mail:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Senha:</label>
              <div className="bg-slate-100 p-2 flex justify-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                  className="w-full h-full outline-none bg-transparent flex items-center"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>

              <label>Confirme a Senha:</label>
              <div className="bg-slate-100 p-2 flex justify-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter Confirm Password"
                  name="ConfirmPassword"
                  value={data.ConfirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full h-full outline-none bg-transparent flex items-center"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-red-950 text-white mt-4 px-6 py-2 w-full max-w-[150px] rounded-lg hover:bg-red-900">
              Inscrever-se
            </button>
          </form>
          <p className="my-4">
            Não tem uma conta?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-700 hover:text-red-950 hover:underline"
            >
              Inscrever-se
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
