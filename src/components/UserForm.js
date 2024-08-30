import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
}from "firebase/auth";
import { auth, db } from "../FirebaseConfig";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import { ref as dbRef, set } from "firebase/database";
import { toast } from "react-toastify";

const UserForm = ({ isSignInPage = false }) => {
  const [data, setData] = useState({
    ...(!isSignInPage && { name: "" }),
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const { email, password } = data;
    e.preventDefault();

    try {
      if (isSignInPage) {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;

        if (user) {
          dispatch(userActions.setUser({ uid: user.uid, email: user.email }));
          toast.success("Login Successfully");
          navigate("/");
        }
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        if (user) {
          toast.success("Account Create Successfully");
          navigate("/users/sign_in");
          await set(dbRef(db, `userData/${user.uid}`), {
            ...data,
          });

          setData({
            ...(!isSignInPage && { name: "" }),
            email: "",
            password: "",
          });
        }
      }
    } catch (error) {
      console.error("Authentication Error:", error.code, error.message);
      let errorMessage =
        "Authentication failed. Please check your credentials and try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "The email address is already in use.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "The email address is invalid.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "The password is incorrect.";
      }

      setError(errorMessage);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[400px] shadow-lg rounded-md p-5 flex flex-col">
        <div className="">
          <img
            src="/Images/card.png"
            alt=""
            width="80"
            height="80"
            className="m-auto"
          />
        </div>
        <h2 className="text-center font-medium text-3xl mb-2">
          {isSignInPage ? "Sign In" : "Sign Up"}
        </h2>
        <form
          className="w-full flex flex-1 flex-col m-auto"
          method="POST"
          onSubmit={handleSubmit}
        >
          {!isSignInPage && (
            <input
              type="text"
              placeholder="Name"
              value={data.name}
              required
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="form-control mb-3"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            required
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="form-control mb-3"
          />
          <div className="flex items-center relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={data.password}
              required
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="form-control mb-3"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-3 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button
            className="text-decoration-none flex justify-center p-2 rounded-md w-full self-center bg-cyan-800 text-white hover:bg-cyan-900 mt-12"
            type="submit"
          >
            <span>{isSignInPage ? "Sign In" : "Sign Up"}</span>
          </button>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </form>
        <p className="text-sm text-center mt-2">
          {isSignInPage ? "New account?" : "Already have an account?"}
          <Link to={`/users/${isSignInPage ? "sign_up" : "sign_in"}`}>
            <span
              onClick={() =>
                navigate(`/users/${isSignInPage ? "sign_up" : "sign_in"}`)
              }
              className="text-blue-500 underline cursor-pointer pl-2"
            >
              {isSignInPage ? "Sign Up" : "Sign In"}
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserForm;
