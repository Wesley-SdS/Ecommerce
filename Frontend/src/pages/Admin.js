import React, { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";
import { useTranslation } from "react-i18next";

const Admin = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-120px)]">
        <h1>{t("access_denied")}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer pt-10">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                className="w-24 h-24 rounded-full"
                alt={user.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg pt-2">{user.name}</p>
          <p className="text-sm">{user.role}</p>
        </div>
        <div>
          <nav className="grid p-4">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
              {t("users")}
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
              {t("products")}
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
