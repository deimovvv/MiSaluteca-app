"use client";

import { Navbar as BSNavbar, Container, Nav, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleSignIn = () => {
    if (status === "authenticated" && session) {
      router.push("/app");
      return;

    }
    signIn("google", { callbackUrl: `${process.env.NEXT_PUBLIC_URL_LINK_SHARE}/app` });
  };
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <BSNavbar
        expand="lg"
        className={`${styles.navbarCustom} py-3 fixed-top ${scrolled ? styles.navbarScrolled : ''}`}
      >
        <BSNavbar.Brand href="#" className={`${styles.navbarBrandCustom} d-flex align-items-center gap-3`}>
          <img
            src="/images/Recurso_11Logo_Final_x7_e3cva8.png"
            alt="Mi Saluteca"
            width={58}
            height={16}
            style={{ height: "auto" }}
            className={styles.navbarLogo}
          />
          <span className={styles.navbarBrandText}>Mi Saluteca</span>
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" className={styles.navbarTogglerCustom} />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link href="#como-funciona" className={styles.navLinkCustom}>
              Cómo funciona
            </Nav.Link>
            <Nav.Link href="#beneficios" className={styles.navLinkCustom}>
              Beneficios
            </Nav.Link>
            <Nav.Link href="#quienes-somos" className={styles.navLinkCustom}>
              Quiénes somos
            </Nav.Link>
            <Nav.Link href="#privacidad" className={styles.navLinkCustom}>
              Privacidad
            </Nav.Link>
            <Nav.Link href="#faq" className={styles.navLinkCustom}>
              FAQ
            </Nav.Link>
            <button className="gsi-material-button"

              onClick={handleSignIn}
            >
              <div className="gsi-material-button-state"></div>
              <div className="gsi-material-button-content-wrapper">
                <div className="gsi-material-button-icon">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: "block" }}>
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                </div>
                <span className="gsi-material-button-contents">Acceder</span>
              </div>
            </button>


          </Nav>
        </BSNavbar.Collapse>
      </BSNavbar>
    </motion.div>
  );
}
