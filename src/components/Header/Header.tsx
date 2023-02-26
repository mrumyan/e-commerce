import { useState } from "react";

import cn from "classnames";
import { Link } from "react-router-dom";

import StoreLogo from "./icon.svg";

import "./Header.scss";

const Header = () => {
  const [isBurgerMenuVisible, setIsBurgerMenuVisible] =
    useState<boolean>(false);

  const handleBurgerMenu = () => setIsBurgerMenuVisible(!isBurgerMenuVisible);

  const navigationClasses = cn("header__navigation", {
    active: isBurgerMenuVisible,
  });

  const personalClasses = cn("header__personal", {
    active: isBurgerMenuVisible,
  });

  const burgerMenuClasses = cn("header__burger-menu", {
    active: isBurgerMenuVisible,
  });

  return (
    <header className="header">
      <div className="header__logo">
        <img src={StoreLogo} alt="Lalasia" />
      </div>
      <nav className={navigationClasses}>
        <ul className="header__menu" onClick={handleBurgerMenu}>
          <li>
            <Link className="header__menu-item" to="/">
              Products
            </Link>
          </li>
          <li>
            <Link className="header__menu-item" to="#">
              Categories
            </Link>
          </li>
          <li>
            <Link className="header__menu-item" to="#">
              About Us
            </Link>
          </li>
        </ul>
      </nav>
      <div className={personalClasses}>
        <Link className="header__personal-item" to="#">
          <div className="personal-item__cart"></div>
        </Link>
        <Link className="header__personal-item" to="#">
          <div className="personal-item__user"></div>
        </Link>
      </div>
      <div className={burgerMenuClasses} onClick={handleBurgerMenu}>
        <span className="header__burger-line"></span>
      </div>
    </header>
  );
};

export default Header;
