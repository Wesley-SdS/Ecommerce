import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

import useProductCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import { useTranslation } from "react-i18next";

const UploadProduct = ({ onClose, fetchData }) => {
  const { t } = useTranslation();
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });
  const [loading, setLoading] = useState(false);
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const categories = useProductCategory();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newProductImage
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadImageCloudinary = await uploadImage(file);
    setLoading(false);

    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    } else {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">{t("Upload Product")}</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-8"
        >
          <label htmlFor="productName">{t("Product Name")}:</label>
          <input
            className="p-2 bg-slate-100 border rounded"
            type="text"
            id="productName"
            placeholder={t("Enter Product Name")}
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
          />

          <label htmlFor="brandName" className="mt-3">
            {t("Brand Name")}:
          </label>
          <input
            className="p-2 bg-slate-100 border rounded"
            type="text"
            id="brandName"
            placeholder={t("Enter Brand Name")}
            name="brandName"
            value={data.brandName}
            onChange={handleOnChange}
          />

          <label htmlFor="category" className="mt-3">
            {t("Category")}:
          </label>
          <select
            required
            value={data.category}
            name="category"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value="">{t("Select Category")}</option>
            {categories.map((el, index) => (
              <option value={el.value} key={el.value + index}>
                {el.label}
              </option>
            ))}
          </select>

          <label htmlFor="ProductImage" className="mt-3">
            {t("Product Image")}
          </label>
          <label htmlFor="uploadImageInput" className="cursor-pointer">
            <div className="p-2 bg-slate-200 border rounded h-32 w-full flex justify-center items-center">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <FaCloudUploadAlt className="text-4xl" />
                <p className="text-sm">{t("Upload Product Image")}</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>

          {loading && (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-950"></div>
            </div>
          )}

          <div>
            {data?.productImage.length > 0 ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={el}
                      alt={el}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover"
                      }}
                      className="bg-slate-100 border cursor-pointer"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div
                      className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer"
                      onClick={() => handleDeleteProductImage(index)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                {t("Please Upload Product Image")}
              </p>
            )}
            {openFullScreenImage && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center">
                <div className="relative max-w-sm max-h-sm sm:max-w-md sm:max-h-md">
                  <img
                    src={fullScreenImage}
                    alt="Full Screen"
                    className="w-full h-full object-contain border border-red-950 rounded"
                    onClick={() => setOpenFullScreenImage(false)}
                  />
                  <div
                    className="absolute top-2 right-2 cursor-pointer rounded-full p-1"
                    onClick={() => setOpenFullScreenImage(false)}
                  >
                    <CgClose className="text-red-950 text-2xl hover:text-red-900" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            {t("Price")}:
          </label>
          <input
            type="number"
            id="price"
            placeholder={t("Enter Price")}
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="sellingPrice" className="mt-3">
            {t("Selling Price")}:
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder={t("Enter Selling Price")}
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="description" className="mt-3">
            {t("Description")}:
          </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder={t("Enter Product Description")}
            rows={3}
            onChange={handleOnChange}
            name="description"
            value={data.description}
          ></textarea>

          <button className="px-3 py-2 bg-red-950 text-white mb-10 hover:bg-red-900">
            {t("Upload Product")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
