"use client";

import Reveal from "../Reveal/Reveal";
import { Row, Col } from "react-bootstrap";
import { HiShieldCheck, HiClock, HiLockClosed, HiEye } from "react-icons/hi2";
import styles from "./Privacy.module.css";

const privacyPoints = [
  {
    icon: HiShieldCheck,
    text: "Solo vos decidís qué compartir"
  },
  {
    icon: HiClock,
    text: "Links temporales con expiración automática"
  },
  {
    icon: HiLockClosed,
    text: "Revocación inmediata con un clic"
  },
  {
    icon: HiEye,
    text: "Historial básico de accesos compartidos"
  },
];

export default function Privacy() {
  return (
    <section id="privacidad" className={`premium-section ${styles.privacySection}`}>
      <div className="premium-container">
        <Reveal>
          <h2 className={`fw-semibold ${styles.title}`}>
            Privacidad primero
          </h2>
          <p className={`mb-5 ${styles.subtitle}`}>
            Tu información de salud es tuya. Vos decidís qué, cuándo y con quién compartir.
          </p>
        </Reveal>
        <Row className={`g-4 mb-5 ${styles.rowContainer}`}>
          {privacyPoints.map((point, index) => {
            const IconComponent = point.icon;
            return (
              <Col key={index} md={6}>
                <Reveal delay={index * 0.1} variant="fadeUp">
                  <div className={styles.privacyCard}>
                    <div className={styles.privacyIconWrapper}>
                      <IconComponent className={styles.privacyIcon} />
                    </div>
                    <p className={styles.privacyText}>{point.text}</p>
                  </div>
                </Reveal>
              </Col>
            );
          })}
        </Row>
      </div>
    </section>
  );
}
