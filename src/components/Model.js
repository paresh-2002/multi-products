import { MdAddBox, MdClose } from "react-icons/md";
import React, { useState } from "react";
import { db, storage } from "../FirebaseConfig";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref as dbRef, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
const AddItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [getItem, setGetItem] = useState([
    {
      productName: "",
      productPrice: "",
    },
  ]);
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState("");
  const ProductImgHandler = (e) => {
    if (e.target.files[0]) {
      setProductImg(e.target.files[0]);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const { productName, productPrice } = getItem;

    if (!productName || productPrice === undefined || !productImg) {
      setError("All fields must be filled correctly.");
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
      setGetItem({ productName: "", productPrice: "" });
      setProductImg(null);
      setError("");
      toast.success("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error.message);
      setError("Failed to add product. Please try again.");
    }
  };

  return (
    <>
      <button
        type="button"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        onClick={openModal}
      >
        <MdAddBox />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            aria-hidden="true"
            onClick={closeModal}
          />
          <div
            className="fixed inset-0 flex items-center justify-center z-50 "
            role="dialog"
            aria-labelledby="modal-title"
            tabIndex="-1"
          >
            <div className="bg-white border shadow-sm rounded-xl w-full max-w-lg mx-auto relative">
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 ">
                <span
                  type="button"
                  className=" inline-flex items-center gap-x-2 text-2xl font-medium  border-none text-gray-800  focus:outline-none"
                  onClick={closeModal}
                >
                  <MdClose />
                </span>
              </div>
              <h3 className="text-center">Add Product</h3>
              <div className="max-w-md mx-auto mt-2 p-3">
                <form
                  autoComplete="off"
                  onSubmit={addProduct}
                  className="space-y-4"
                >
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
                      value={getItem.productName}
                      onChange={(e) =>
                        setGetItem({ ...getItem, productName: e.target.value })
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
                      value={getItem.productPrice}
                      onChange={(e) =>
                        setGetItem({ ...getItem, productPrice: e.target.value })
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
                    ADD
                  </button>
                </form>
                {error && (
                  <span className="text-red-500 mt-5 block text-center">
                    {error}
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddItem;
