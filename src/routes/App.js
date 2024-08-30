import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Fetchitems from "../components/Fetchitems";
import UserForm from "../components/UserForm";
import Home from "./Home";
import Card from "./Card";
import AddItem from "../components/AddItem";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RequireAuth = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  return currentUser ? children : <Navigate to="/users/sign_in" />;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/">
            <Route
              path="/users/sign_in"
              element={<UserForm isSignInPage={true} />}
            />
            <Route
              path="/users/sign_up"
              element={<UserForm isSignInPage={false} />}
            />
            <Route
              index
              element={
                <RequireAuth>
                  <Navbar />
                  <Home />
                  <Fetchitems />
                  <Footer />
                </RequireAuth>
              }
            />
            <Route
              path="/orders"
              element={
                <RequireAuth>
                  <Navbar />
                  <Card />
                  <Footer />
                </RequireAuth>
              }
            />
            <Route
              path="/add_item"
              element={
                <RequireAuth>
                  <Navbar />
                  <AddItem />
                  <Footer />
                </RequireAuth>
              }
            />
          </Route>

          {/* Redirect to home if route not found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
