import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsChatSquareText } from "react-icons/bs";
import { UserCircleIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

import Logo from "./Logo";
import SummaryApi from "../common";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import flagEN from "../assets/en.png";
import flagPT from "../assets/br.png";
import flagES from "../assets/es.png";
import Context from "../context";
import { useDebounce } from "use-debounce";

const Header = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentFlag, setCurrentFlag] = useState(flagEN);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [contactPanelOpen, setContactPanelOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedSearch] = useDebounce(search, 500); // Debounce de 500ms

  const context = useContext(Context);
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput.search);
  const searchQuery = URLSearch.getAll("q");
  const user = useSelector((state) => state.user.user);
  const contactTimeoutRef = useRef(null);

  useEffect(() => {
    if (debouncedSearch) {
      fetchSuggestions(debouncedSearch);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearch]);

  const changeLanguage = (language, flag) => {
    i18n.changeLanguage(language);
    setCurrentFlag(flag);
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    const response = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include"
    });

    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `${SummaryApi.searchProduct.url}?q=${query}`,
        {
          credentials: "include"
        }
      );
      const data = await response.json();
      console.log("Fetched suggestions:", data); // Adicione este log
      setSuggestions(data.data || []);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    }
  };

  const handleSearch = (value) => {
    navigate(value ? `/search?q=${value}` : "/search");
    setSearch(""); // Clear the search input after redirect
    setSuggestions([]); // Clear suggestions after redirect
    setTimeout(() => {
      document
        .getElementById("products-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(search);
    }
  };

  const handleSearchClick = () => {
    handleSearch(search);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    handleSearch(suggestion);
  };

  const handleMouseEnter = () => {
    clearTimeout(contactTimeoutRef.current);
    setContactPanelOpen(true);
  };

  const handleMouseLeave = () => {
    contactTimeoutRef.current = setTimeout(() => {
      setContactPanelOpen(false);
    }, 300); // delay of 300ms
  };

  return (
    <header className="h-36 py-10 shadow-md fixed w-full z-40 bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="flex justify-center py-4">
          <Link to="/">
            <Logo w={250} h={50} />
          </Link>
        </div>
        <div className="relative hidden lg:flex items-center w-full justify-between max-w-sm border rounded-lg focus-within:shadow pl-2">
          <input
            type="text"
            placeholder={t("common.search_placeholder")}
            className="w-full h-10 outline-none"
            onChange={handleSearchInputChange}
            onKeyDown={handleSearchInputKeyDown}
            value={search}
          />
          <div
            className="text-lg min-w-[50px] h-10 flex items-center justify-center rounded-r-lg text-white cursor-pointer"
            onClick={handleSearchClick}
          >
            <GrSearch className="text-red-950 w-6 h-6 hover: transition-all" />
          </div>
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto z-10 text-black">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion._id} // Use a unique key for each item
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(suggestion.productName)}
                >
                  {suggestion.productName}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center gap-6">
          <div
            className="relative flex items-center space-x-3 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <BsChatSquareText className="w-6 h-6" />
            <p>{t("common.call_center")}</p>
            {contactPanelOpen && (
              <div
                className="absolute top-full left-0 mt-2 bg-white text-gray-800 border border-gray-300 rounded shadow-lg p-6 space-y-3 "
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <p className=" flex font-semibold justify-center text-lg mb-4">
                  {t("common.service")}
                </p>
                <div className="flex items-center mb-2">
                  <FaWhatsapp className="w-5 h-5 mr-2 text-green-600" />
                  <a href="https://wa.me/5511960924734" className="">
                    (11) 96092-4734
                  </a>
                </div>
                <div className="flex items-center mb-2">
                  <FaEnvelope className="w-5 h-5 mr-2 text-gray-600" />
                  <a href="mailto:wesleysantos.0095@gmail.com" className="">
                    wesleysantos.0095@gmail.com
                  </a>
                </div>
                <div>
                  <p className="flex flex-col font-semibold text-sm mb-2">
                    {t("common.opening_hours")}:
                    <span className="font-light">
                      {" "}
                      {t("common.mon_fri_hours")}
                    </span>
                  </p>
                </div>
                <button
                  className="w-full bg-red-950 text-white px-4 py-2 rounded hover:bg-red-900 transition-colors"
                  onClick={() => alert(t("common.contact_us"))}
                >
                  {t("common.contact_us")}
                </button>
              </div>
            )}
          </div>

          <div
            className="relative group flex justify-center"
            onClick={() => setMenuDisplay((prev) => !prev)}
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
                  <UserCircleIcon className="w-8 h-8" />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to="Admin"
                      className="whitespace-nowrap bg-slate-50 p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      {t("admin.dashboard")}
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to="/cart" className="text-2xl relative">
              <span>
                <ShoppingBagIcon className="w-8 h-8" />
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
                className="px-4 py-2 rounded-lg text-white bg-red-950 hover:bg-red-900"
              >
                {t("admin.logout")}
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-white bg-red-950 hover:bg-red-900"
              >
                {t("admin.login")}
              </Link>
            )}
          </div>
        </div>
        <div className="relative">
          <button
            className="w-14 h-14 flex items-center justify-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              className="w-6 h-6 mr-2"
              src={currentFlag}
              alt={t("common.language")}
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl z-10">
              <div
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => changeLanguage("en", flagEN)}
              >
                <img
                  className="w-6 h-6 mr-2"
                  src={flagEN}
                  alt={t("common.english")}
                />
                {t("common.english")}
              </div>
              <div
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => changeLanguage("pt", flagPT)}
              >
                <img
                  className="w-6 h-6 mr-2"
                  src={flagPT}
                  alt={t("common.portuguese")}
                />
                {t("common.portuguese")}
              </div>
              <div
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => changeLanguage("es", flagES)}
              >
                <img
                  className="w-6 h-6 mr-2"
                  src={flagES}
                  alt={t("common.spanish")}
                />
                {t("common.spanish")}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
