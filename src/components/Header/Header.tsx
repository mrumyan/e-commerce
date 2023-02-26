import { Link } from "react-router-dom";

import StoreLogo from "./icon.svg";

import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={StoreLogo} alt="Lalasia" />
      </div>
      <nav className="header__navigation">
        <ul className="header__menu">
          <li>
            <Link className="header__menu-item" to="/">
              Products
            </Link>
          </li>
          <li className="header__menu-item">Categories</li>
          <li className="header__menu-item">About Us</li>
        </ul>
      </nav>
      <div className="header__personal">
        <div className="header__personal-item cart"></div>
        <div className="header__personal-item user"></div>
      </div>
      <div className="header__burger-menu">
        <span className="header__burger-line"></span>
      </div>
    </header>
  );
};

export default Header;
