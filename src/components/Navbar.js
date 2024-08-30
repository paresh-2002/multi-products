import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../store/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const order = useSelector((state) => state.order);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(userActions.logout());
        navigate("/users/sign_in");
        toast.success("User logged out");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <header className="p-3  bg-cyan-900 sticky top-0 z-10 lg:flex-row">
        <div className="container pl-2">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 gap-2 mb-lg-0 text-white text-decoration-none mr-5"
            >
              <img src="/Images/card.png" alt="" width="60" height="60" />
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link
                  to="/"
                  className="nav-link px-2 text-white hover:underline hover:underline-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="nav-link px-2 text-white hover:underline hover:underline-white "
                >
                  Orders
                  <span className="bg-[#f16565] whitespace-nowrap text-center leading-[18px] h-[18px] relative text-xs text-white font-bold cursor-pointer px-1.5 py-0 rounded-[50%] right-1 top-[-8px]">
                    {order.length}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/add_item"
                  className="nav-link px-2 text-white hover:underline hover:underline-white"
                >
                  Add Item
                </Link>
              </li>
            </ul>

            <div className="text-end flex">
              {currentUser ? (
                <Link to="/users/sign_in" className="nav-link text-white">
                  <button
                    type="button"
                    className="btn btn-outline-light me-2"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </Link>
              ) : (
                <Link to="/users/sign_in" className="nav-link text-white">
                  <button type="button" className="btn btn-outline-light me-2">
                    Login
                  </button>
                </Link>
              )}
              <Link to="/users/sign_up" className="nav-link text-white">
                <button type="button" className="btn btn-warning">
                  Sign-up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
