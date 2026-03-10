"use client";

import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="premium-container">
        {/* Top section */}
        <div className={styles.footerTop}>
          <Row className="align-items-start">
            {/* Brand column */}
            <Col xs={12} md={5} className="mb-4 mb-md-0">
              <div className={styles.brand}>
                <div className={styles.logoWrap}>
                  <Image
                    src="/images/logoblanco.png"
                    alt="Mi Saluteca"
                    width={36}
                    height={36}
                    className={styles.logoImg}
                  />
                  <span className={styles.logoText}>Mi Saluteca</span>
                </div>
                <p className={styles.brandDescription}>
                  Tu historial médico digital. Guardá, organizá y compartí tus estudios de forma simple y segura.
                </p>
              </div>
            </Col>

            {/* Links columns */}
            <Col xs={4} md={2} className="mb-4 mb-md-0">
              <h4 className={styles.columnTitle}>Producto</h4>
              <ul className={styles.linkList}>
                <li><a href="#como-funciona" className={styles.link}>Cómo funciona</a></li>
                <li><a href="#beneficios" className={styles.link}>Beneficios</a></li>
                <li><a href="#faq" className={styles.link}>FAQ</a></li>
              </ul>
            </Col>

            <Col xs={4} md={2} className="mb-4 mb-md-0">
              <h4 className={styles.columnTitle}>Empresa</h4>
              <ul className={styles.linkList}>
                <li><a href="#quienes-somos" className={styles.link}>Quiénes somos</a></li>
                <li><a href="#" className={styles.link}>Contacto</a></li>
              </ul>
            </Col>

            <Col xs={4} md={3}>
              <h4 className={styles.columnTitle}>Legal</h4>
              <ul className={styles.linkList}>
                <li><a href="/privacidad" className={styles.link}>Privacidad</a></li>
                <li><a href="/terminos" className={styles.link}>Términos de uso</a></li>
              </ul>
            </Col>
          </Row>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom bar */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} Mi Saluteca. Todos los derechos reservados.
          </p>
          <p className={styles.madeWith}>
            Hecho con <em className={styles.greenHeart}>♥</em> en Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
