"use client";

import { Container, Row, Col } from "react-bootstrap";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-5 ${styles.footer}`}>
      <div className="premium-container">
        <Row className="mb-4">
          <Col md={12}>
            <p className={`mb-0 ${styles.description}`}>
              Mi Saluteca es una plataforma digital para guardar, organizar y compartir estudios médicos de forma simple y segura.
            </p>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col md={6} className="mb-3 mb-md-0">
            <p className={`mb-0 ${styles.copyright}`}>
              Mi Saluteca © {currentYear}
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <a href="#" className={`text-decoration-none me-4 hover-link ${styles.link}`}>
              Privacidad
            </a>
            <a href="#" className={`text-decoration-none me-4 hover-link ${styles.link}`}>
              Términos
            </a>
            <a href="#" className={`text-decoration-none hover-link ${styles.link}`}>
              Contacto
            </a>
          </Col>
        </Row>
      </div>
    </footer>
  );
}
