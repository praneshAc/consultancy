import React from "react";
import footerLogo from "../assets/img/cons.logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer id="footer" className="footer">
        <div className="footer-content">
          <div className="container">
            <div className="row gy-4">
              <div className="col-lg-4 col-md-12 footer-info">
                <Link to="/" className="logo d-flex align-items-center">
                  <img src={footerLogo} alt="" title="" />
                </Link>
                <p>
                  With a reputation for excellence, we ensure durable protection
                  against water damage, providing peace of mind for our clients.
                </p>
                <div className="social-links d-flex  mt-3">
                  <Link to="/" className="twitter">
                    <i className="bi bi-twitter"></i>
                  </Link>

                  <Link to="/" className="facebook">
                    <i className="bi bi-facebook"></i>
                  </Link>

                  <Link className="linkedin">
                    <i className="bi bi-linkedin"></i>
                  </Link>
                </div>
              </div>

              <div className="col-lg-3 col-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <i className="bi bi-dash"></i>
                    Educational Content
                  </li>
                  <li>
                    <i className="bi bi-dash"></i>
                    JOINT GROUTS (CEMENTRITIOUS)
                  </li>
                  <li>
                    <i className="bi bi-dash"></i>
                    TILE & STONE
                  </li>
                  <li>
                    <i className="bi bi-dash"></i>
                    ADDITIVES
                  </li>
                  <li>
                    <i className="bi bi-dash"></i>
                    MARBLE RE NEWER & STONE CARE
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-6 footer-links">
                <ul>
                  <li>
                    <i className="bi bi-dash"></i>
                    WATER PROOFING
                  </li>
                  <li>
                    <i className="bi bi-dash"></i>
                    EPOXY INJECTION
                  </li>
                  <li>
                    <i className="bi bi-dash"></i>
                    GP GROUTS
                  </li>
                  <li>
                    <i className="bi bi-dash"></i>
                    PU FOAMING GROUTS
                  </li>
                  <li>
                    <i className="bi bi-dash"></i>
                    FLOORING PREPARATION PRODUCTS (PU & EPOXY)
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                <h4>Contact Us</h4>
                <address>
                  380/1, Vivekanandar Salai, <br /> Narayana Valasu, Erode{" "}
                  <br />
                  - 638 011 <br />
                  <br />
                  <strong>Phone:</strong> +91 93631 36363 <br />
                  <strong>Email: </strong>
                  <a href="mailto:dlerode@gmail.com">dlerode@gmail.com</a>
                  <br />
                </address>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-legal">
          <div className="container">
            <div className="copyright">
              <span id="copyright">
                <script>
                  document.getElementById('copyright').appendChild(document.createTextNode(new
                  Date().getFullYear()) )
                </script>
              </span>
              Copyrigth &copy; 2024 Dreamland Agencies.Designed by
              <span> By Nithish</span>.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
