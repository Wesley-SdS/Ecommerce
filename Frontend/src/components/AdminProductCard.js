import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-slate-100 p-4 rounded w-full max-w-xs m-2">
      <div className="flex flex-row">
        <div className="w-32 h-32 flex-shrink-0">
          <img
            src={data?.productImage[0]}
            alt={data.productName}
            className="mx-auto object-cover h-full"
          />
        </div>
        <div className="flex-grow pl-4">
          <h1 className="text-ellipsis line-clamp-2 font-semibold">
            {data.productName}
          </h1>
          <p className="font-semibold">
            {displayINRCurrency(data.sellingPrice)}
          </p>
          <div
            className="mt-2 w-fit p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
