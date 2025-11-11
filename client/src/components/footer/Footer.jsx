import React from "react";
import "./footer.css";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <>
      <footer>
        <img className="logo" src={logo} alt="company-logo"></img>
        <div className="company-description">
          <div>
            We are a non-profit working to accessibly<br></br>
            provide young vulnerable women and youth with<br></br>a robust
            innovation skillset and essential<br></br>
            resources to create susutainable social ventures<br></br>
            and social impact on Uganda
          </div>
          <div>
            Imagine Her is a registerd 501 {"("}c{")"}3 in the United<br></br>
            States {"("}#86-3998209{")"}. Imagine Her is a<br></br>
            registered non-profit in Uganda
          </div>
          <div className="icons"></div>
        </div>
        <div className="pages">
          <ul>
            <li>
              <a href="about.html">About Us</a>
            </li>

            <li>
              <a href="work.html">Our Work</a>
            </li>

            <li>
              <a href="news.html">News</a>
            </li>

            <li>
              <a href="contact.html">Contact</a>
            </li>

            <li>
              <a href="careers.html">Careers</a>
            </li>
          </ul>
        </div>
        <div className="Contacts">
          <div className="contact">Contact Us</div>
          <div>
            info@i-her.org<br></br>
            Uganda<br></br>
            Block 266,Plot 800 Kingsway<br></br>
            Seguku Katale-Wakiso<br></br>
            P.O. Box 28648 Kampala<br></br>
            Office Line: +256 200903228
          </div>
          <div>
            US Mailing Address: California 16830 Venture Blvd,<br></br>
            Suite 360 | Encino, CA 91436
          </div>
          <div className="white-button">Sign-Up for our Newsletter</div>
        </div>
      </footer>
      <div className="copyright">
      &copy; Copyright 2023 Imagine her is a nonprofit organization. All right
        reserved.
      </div>
    </>
  );
}

export default Footer;
