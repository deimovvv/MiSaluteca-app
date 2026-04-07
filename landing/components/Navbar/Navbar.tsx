"use client";

import {
  Navbar as BSNavbar,
  Container,
  Nav,
  Button,
  Modal,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";
import heroStyles from "../Hero/Hero.module.css";

export default function Navbar({ whiteLogo = false }: { whiteLogo?: boolean }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // setIsMobile(window.innerWidth <= 768);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSignIn = () => {
    if (status === "authenticated" && session) {
      setSigningIn(true);
      router.push("/app");
      return;
    }
    setSigningIn(true);
    signIn("google", {
      callbackUrl: `${process.env.NEXT_PUBLIC_URL_LINK_SHARE}/app`,
    });
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ hidden: { y: -100 }, visible: { y: 0 } }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <BSNavbar
        expand="lg"
        fixed="top"
        className={`${styles.navbarCustom} ${scrolled ? styles.navbarScrolled : ""}`}
      >
        <BSNavbar.Brand
          href="/"
          className={`d-flex align-items-center gap-2 ${styles.navbarBrandCustom}`}
        >
          <img
            src={
              whiteLogo && !scrolled && !isMobile
                ? "/images/logoblanco.png"
                : "/images/Logo_Saluteca_AzulNew.png"
            }
            alt="Mi Saluteca"
            width={42}
            height={12}
            style={{ height: "auto" }}
            className={styles.navbarLogo}
          />
          <span className={styles.navbarBrandText}>Mi Saluteca</span>
        </BSNavbar.Brand>
        <BSNavbar.Toggle
          aria-controls="basic-navbar-nav"
          className={styles.navbarTogglerCustom}
        />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link href="/#como-funciona" className={styles.navLinkCustom}>
              Cómo funciona
            </Nav.Link>
            <Nav.Link href="/#beneficios" className={styles.navLinkCustom}>
              Beneficios
            </Nav.Link>
            <Nav.Link
              onClick={() => handleNavigate("/quienes-somos")}
              className={styles.navLinkCustom}
              style={{ cursor: "pointer" }}
            >
              Quiénes somos
            </Nav.Link>

            <Nav.Link href="/#faq" className={styles.navLinkCustom}>
              FAQ
            </Nav.Link>
            <Button
              className={heroStyles.btnHeroPrimary}
              onClick={() => {
                if (status === "authenticated" && session) {
                  router.push("/app");
                } else {
                  setShowModal(true);
                }
              }}
              style={{
                padding: "0.5rem 1.5rem", // Adjust padding for navbar context while keeping the style
                fontSize: "0.9rem",
              }}
            >
              Acceder
            </Button>

            <style>{`
              @keyframes navSpinner {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </Nav>
        </BSNavbar.Collapse>
      </BSNavbar>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header
          closeButton
          style={{ borderBottom: "none", paddingBottom: 0 }}
        >
          {/* <Modal.Title
            style={{ color: "#2F416A", fontWeight: "700", fontSize: "1.5rem" }}
          >
            Bienvenido a Mi Saluteca
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="text-center px-4 pb-5 pt-3">
          <p
            style={{
              color: "#4a5568",
              fontSize: "1rem",
              marginBottom: "2rem",
              lineHeight: "1.5",
            }}
          >
            Al continuar con Google aceptás nuestros
            <br />
            <a
              href="/terminos"
              style={{
                color: "#2F416A",
                textDecoration: "underline",
                fontWeight: "600",
              }}
            >
              Términos
            </a>
            {" y "}
            <a
              href="/privacidad"
              style={{
                color: "#2F416A",
                textDecoration: "underline",
                fontWeight: "600",
              }}
            >
              Política de Privacidad
            </a>
          </p>

          <button
            className="gsi-material-button"
            onClick={handleSignIn}
            disabled={signingIn}
            style={{
              opacity: signingIn ? 0.7 : 1,
              width: "100%",
              maxWidth: "300px",
              margin: "0 auto",
            }}
          >
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                {signingIn ? (
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      border: "2px solid #e0e0e0",
                      borderTopColor: "#016390",
                      borderRadius: "50%",
                      animation: "navSpinner 0.6s linear infinite",
                      margin: "auto",
                    }}
                  />
                ) : (
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    style={{ display: "block" }}
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    ></path>
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    ></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                )}
              </div>
              <span className="gsi-material-button-contents">
                {signingIn ? "Cargando..." : "Continuar con Google"}
              </span>
            </div>
          </button>
        </Modal.Body>
      </Modal>
    </motion.div>
  );
}
