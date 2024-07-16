import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";

import Logo from "./Logo";
import SummaryApi from "../common";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import flagEN from "../assets/en.png";
import flagPT from "../assets/br.png";
import flagES from "../assets/es.png";
import Context from "../context";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentFlag, setCurrentFlag] = useState(flagEN);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const user = useSelector((state) => state?.user?.user);

  const changeLanguage = (language, flag) => {
    i18n.changeLanguage(language);
    setCurrentFlag(flag);
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include"
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-36 py-10 shadow-md fixed w-full z-40 bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="flex justify-center py-4">
          <Link to={"/"}>
            <Logo w={250} h={50} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-lg focus-within:shadow pl-2">
          <input
            type="text"
            placeholder={t("search_placeholder")}
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-950 flex items-center justify-center rounded-r-lg text-white cursor-pointer">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div
            className="relative group flex justify-center"
            onClick={() => setMenuDisplay((preve) => !preve)}
          >
            {user?._id && (
              <div className="text-2xl cursor-pointer">
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-16 h-16 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"Admin"}
                      className="whitespace-nowrap bg-slate-50 p-2"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      {t("Dashboard")}
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <AiOutlineShoppingCart />
              </span>

              <div className="bg-red-950 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-950 hover:bg-red-900"
              >
                {t("logout")}
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-950 hover:bg-red-900"
              >
                {t("login")}
              </Link>
            )}
          </div>
        </div>
        <div className="relative">
          <button
            className="w-14 h-14 flex items-center justify-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img className="w-8 h-8" src={currentFlag} alt="Idioma" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg">
              <div
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => changeLanguage("en", flagEN)}
              >
                <img className="w-6 h-6 mr-2" src={flagEN} alt="English" />
                English
              </div>
              <div
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => changeLanguage("pt", flagPT)}
              >
                <img className="w-6 h-6 mr-2" src={flagPT} alt="Português" />
                Português
              </div>
              <div
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => changeLanguage("es", flagES)}
              >
                <img className="w-6 h-6 mr-2" src={flagES} alt="Español" />
                Español
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
