"use client";

import { Container, Row, Col, Button } from "react-bootstrap";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "../Reveal/Reveal";
import styles from "./Hero.module.css";

export default function Hero() {
  const scrollToHowItWorks = () => {
    document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" });
  };

  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className={`${styles.heroImageSection} position-relative overflow-hidden`}>
      {/* Image Background with Parallax */}
      <motion.div className={styles.heroImageWrapperBg} style={{ y: videoY }}>
        <div
          className={`${styles.heroImageBg} ${styles.heroImageDesktop}`}
          style={{
            backgroundImage: "url('/images/hero-nuevo.png')"
          }}
        ></div>
        <div
          className={`${styles.heroImageBg} ${styles.heroImageMobile}`}
          style={{
            backgroundImage: "url('/images/mobiletest.png')"
          }}
        ></div>
        <div className={styles.heroImageOverlay}></div>
      </motion.div>

      {/* Content with Parallax */}
      <motion.div style={{ y: contentY, opacity }}>
        <Container className={`position-relative ${styles.heroContent}`}>
          <Row className="align-items-center min-vh-100 py-5">
            <Col lg={10} xl={9}>
              <Reveal delay={0.2} variant="fadeUp">
                <h1 className={`${styles.heroTitle} mb-2`}>
                  Tu historial de salud, ordenado en un solo lugar.
                </h1>
              </Reveal>

              <Reveal delay={0.4} variant="fadeUp">
                <p className={`${styles.heroSubtitle} mb-3`}>
                  Subí tus estudios y compartilos con un link seguro.
                </p>
              </Reveal>

              <Reveal delay={0.6} variant="fadeIn">
                <div className="d-flex gap-3 flex-wrap">
                  <Button
                    href="/app"
                    className={styles.btnHeroPrimary}
                  >
                    Acceder
                  </Button>
                  <Button
                    onClick={scrollToHowItWorks}
                    className={styles.btnHeroSecondary}
                  >
                    Ver cómo funciona
                  </Button>
                </div>
              </Reveal>
            </Col>
          </Row>
        </Container>
      </motion.div>
    </section>
  );
}
