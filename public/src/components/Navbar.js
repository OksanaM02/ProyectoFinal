// Import statements
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
//import ShoppingCart from "../ShoppingCart/shoppingCartComponent";
//import { useTranslation } from "react-i18next";
import styles from "./Navbar.module.css";
//import LanguageSelector from "../LenguajeSelector/lenguajeSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faShoppingCart,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNavExpanded, setIsNavExpanded] = useState(false);
    const navRef = useRef();
    const buttonRef = useRef();
    //const { t } = useTranslation();
    const userRole = localStorage.getItem("userRole");

    const toggleModal = () => setIsModalOpen((prev) => !prev);
    const toggleNavExpanded = () => setIsNavExpanded((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isNavExpanded &&
                !navRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsNavExpanded(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isNavExpanded]);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <button
                    ref={buttonRef}
                    className={styles.hamburger}
                    onClick={toggleNavExpanded}
                    aria-label={isNavExpanded ? "Close menu" : "Open menu"}
                >
                    <FontAwesomeIcon icon={isNavExpanded ? faTimes : faBars} />
                </button>
                <div className={styles.logo}>
                    <a href="/" title="Inicio" className={styles.logoLink}>
                        <img
                            src="/images/GladiusNofondo.png"
                            alt="Logo"
                            className={styles.logoImg}
                        />
                    </a>
                </div>
            </div>

            <div
                ref={navRef}
                className={`${styles.linksContainer} ${
                    isNavExpanded ? styles.show : ""
                }`}
            >
                <Link
                    to="/"
                    className={styles.navLink}
                    onClick={() => setIsNavExpanded(false)}
                >
                    {("navbar.home")}
                </Link>
                <Link
                    to="/about"
                    className={styles.navLink}
                    onClick={() => setIsNavExpanded(false)}
                >
                    {("navbar.aboutUs")}
                </Link>
                {userRole === "admin" && (
                    <Link
                        to="/crearsudaderas"
                        className={styles.navLink}
                        onClick={() => setIsNavExpanded(false)}
                    >
                        {("navbar.createHoodies")}
                    </Link>
                )}
                <Link
                    to="/formulario"
                    className={styles.navLink}
                    onClick={() => setIsNavExpanded(false)}
                >
                    {("navbar.user")}
                </Link>
                <Link
                    to="/Proximamente"
                    className={styles.navLink}
                    onClick={() => setIsNavExpanded(false)}
                >
                    {("navbar.upcomingProjects")}
                </Link>
            </div>

            {!isNavExpanded && (
                <button onClick={toggleModal} className={styles.cartButton}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                </button>
            )}

        </nav>
    );
}

export default Navbar;
