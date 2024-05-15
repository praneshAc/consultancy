import React from "react";
import logo from "../../assets/img/logo.png";
//import Navbar from "./Navbar";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import CartModel from "../cart/CartModel";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";
import OrderNotification from "../OrderNotification";
const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    setTimeout(() => {
      logout();
    }, 1000);
  };
  const toTop = () => {
    scroll.scrollToTop({ delay: 0, duration: 0 });
  };
  const handleClick = () => {
    window.location.href = "/signin";
  };
  const location = useLocation();
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  //sticky header
  useEffect(() => {
    const selectHeader = document.querySelector("#header");
    if (selectHeader) {
      document.addEventListener("scroll", () => {
        window.scrollY > 80
          ? selectHeader.classList.add("sticked")
          : selectHeader.classList.remove("sticked");
      });
    }
  }, []);

  // mobile view menu
  const mobilemenu = (event) => {
    event.preventDefault();
    const mobileNavShow = document.querySelector(".mobile-nav-show");
    const mobileNavHide = document.querySelector(".mobile-nav-hide");
    mobileNavShow.classList.toggle("d-none");
    mobileNavHide.classList.toggle("d-none");
    document.querySelector("body").classList.toggle("mobile-nav-active");
  };

  return (
    <>
      <header id="header" className="header fixed-top">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <Link to="/" className="logo" onClick={toTop}>
            <img
              src={logo}
              alt="Dreamland agencies"
              title="Dreamland agencies"
              style={{ width: "150px" }}
            />
          </Link>
          <span onClick={mobilemenu}>
            <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
            <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
          </span>
          <nav id="navbar" className="navbar">
            <ul onClick={mobilemenu}>
              <li>
                <Link
                  to="/"
                  className={splitLocation[1] === "" ? "active" : ""}
                >
                  {" "}
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={splitLocation[1] === "about" ? "active" : ""}
                >
                  {" "}
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className={splitLocation[1] === "services" ? "active" : ""}
                >
                  {" "}
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className={splitLocation[1] === "careers" ? "active" : ""}
                >
                  {" "}
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={splitLocation[1] === "contact" ? "active" : ""}
                >
                  {" "}
                  Contact Us
                </Link>
              </li>

              {isAuthenticated && (
                <li>
                  <CartModel />
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <OrderNotification />
                </li>
              )}
              {!isAuthenticated && (
                <li>
                  <div className="hero1 d-flex align-items-center m-2">
                    <Button className="btn-get-started" onClick={handleClick}>
                      Login
                    </Button>
                  </div>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <div className="hero1 d-flex align-items-center m-2">
                    <Button className="btn-get-started" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
