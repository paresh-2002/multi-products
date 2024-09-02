import React, { useState } from "react";
import { db, storage } from "../FirebaseConfig";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref as dbRef, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";

const AddItem = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    productName: "",
    productPrice: "",
  });
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState("");

  const ProductImgHandler = (e) => {
    if (e.target.files[0]) {
      setProductImg(e.target.files[0]);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { productName, productPrice } = product;

    // Validation
    if (!productName || !productPrice || !productImg) {
      setError("All fields must be filled correctly.");
      setLoading(false);
      return;
    }

    try {
      const productId = uuidv4();
      const imageRef = storageRef(storage, `images/${productId}`);
      await uploadBytes(imageRef, productImg);
      const url = await getDownloadURL(imageRef);

      const productData = {
        id: productId,
        productName,
        productPrice: Number(productPrice),
        productImg: url,
      };

      await set(dbRef(db, `products/${productId}`), productData);

      // Reset state
      setProduct({ productName: "", productPrice: "" });
      setProductImg(null);
      setError("");
      toast.success("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error.message);
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-4 md:px-6 lg:px-8">
      <div className="top-[92px] sticky z-10 bg-white">
        <h2 className="text-2xl mt-2 h-[92px] lg:h-[30px] flex items-center justify-center md:flex-col md:items-start md:justify-start">
          ADD PRODUCTS
        </h2>
        <hr />
      </div>
      <div className="max-w-md mx-auto mt-6">
        <form autoComplete="off" onSubmit={addProduct} className="space-y-4">
          <div>
            <label
              htmlFor="product_name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              required
              id="product_name"
              className="form-control w-full mb-3 border-2 border-gray-300 rounded-md p-2 outline-none focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
              value={product.productName}
              onChange={(e) =>
                setProduct({ ...product, productName: e.target.value })
              }
            />
          </div>
          <div>
            <label
              htmlFor="product_price"
              className="block text-sm font-medium text-gray-700"
            >
              Product Price
            </label>
            <input
              type="number"
              required
              id="product_price"
              className="form-control w-full mb-3 border-2 border-gray-300 rounded-md p-2 outline-none focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
              value={product.productPrice}
              onChange={(e) =>
                setProduct({ ...product, productPrice: e.target.value })
              }
            />
          </div>
          <div>
            <label
              htmlFor="product_img"
              className="block text-sm font-medium text-gray-700"
            >
              Product Image
            </label>
            <input
              type="file"
              required
              id="product_img"
              className="form-control w-full mb-3 border-2 border-gray-300 rounded-md p-2 outline-none focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
              onChange={ProductImgHandler}
            />
          </div>
          <button
            className="block w-full md:w-1/3 mx-auto p-2 rounded-md bg-cyan-800 text-white hover:bg-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
            type="submit"
          >
            {loading ? <LoadingSpinner /> : "ADD"}
          </button>
        </form>
        {error && (
          <span className="text-red-500 mt-5 block text-center">{error}</span>
        )}
      </div>
    </div>
  );
};

export default AddItem;
