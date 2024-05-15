import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Cart from "./pages/Cart";
import { useAuth } from "./contexts/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartData, sendCartData } from "./store/cart-actions";
const Orders = lazy(() => import("./pages/Orders"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
let isInitial = true;
function App() {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCartData());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (isAuthenticated) {
      dispatch(sendCartData(cart));
    }
  }, [isAuthenticated, cart, dispatch]);

  return (
    <Router>
      <Suspense>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index={true} element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="products" element={<Products />} />
            <Route path="contact" element={<Contact />} />
            <Route
              path="cart"
              element={isAuthenticated ? <Cart /> : <Navigate to="/" />}
            />
            <Route
              path="placeorder"
              element={isAuthenticated ? <PlaceOrder /> : <Navigate to="/" />}
            />
            <Route
              path="orders"
              element={isAuthenticated ? <Orders /> : <Navigate to="/" />}
            />
          </Route>
          <Route
            path="/signin"
            element={!isAuthenticated ? <Signin /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
