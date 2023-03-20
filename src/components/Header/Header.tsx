import { useState } from "react";

import cn from "classnames";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import StoreLogo from "./icon.svg";
import React from "react";

const Header = () => {
  const [isBurgerMenuVisible, setIsBurgerMenuVisible] =
    useState<boolean>(false);

  const handleBurgerMenu = () => setIsBurgerMenuVisible(!isBurgerMenuVisible);

  const navigationClasses = cn(styles.header__navigation, {
    [styles.active]: isBurgerMenuVisible,
  });

  const personalClasses = cn(styles.header__personal, {
    [styles.active]: isBurgerMenuVisible,
  });

  const burgerMenuClasses = cn(styles["header__burger-menu"], {
    [styles.active]: isBurgerMenuVisible,
  });

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <img src={StoreLogo} alt="Lalasia" />
      </div>
      <nav className={navigationClasses}>
        <ul className={styles.header__menu} onClick={handleBurgerMenu}>
          <li>
            <Link className={styles["header__menu-item"]} to="/">
              Products
            </Link>
          </li>
          <li>
            <Link className={styles["header__menu-item"]} to="#">
              Categories
            </Link>
          </li>
          <li>
            <Link className={styles["header__menu-item"]} to="#">
              About Us
            </Link>
          </li>
        </ul>
      </nav>
      <div className={personalClasses}>
        <Link className={styles["header__personal-item"]} to="#">
          <div className={styles["header__personal-item__cart"]}></div>
        </Link>
        <Link className={styles["header__personal-item"]} to="#">
          <div className={styles["header__personal-item__user"]}></div>
        </Link>
      </div>
      <div className={burgerMenuClasses} onClick={handleBurgerMenu}>
        <span className={styles["header__burger-line"]}></span>
      </div>
    </header>
  );
};

export default React.memo(Header);
