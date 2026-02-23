"use client";

import { Container, Row, Col } from "react-bootstrap";
import Reveal from "../Reveal/Reveal";
import { HiSparkles, HiLink, HiLockClosed, HiUserGroup } from "react-icons/hi2";
import styles from "./Benefits.module.css";

const benefits = [
  {
    title: "IA que organiza por vos",
    description: "Subí tu estudio y nuestra IA completa título, fecha, institución y una observación automáticamente.",
    icon: HiSparkles,
  },
  {
    title: "Compartir en segundos",
    description: "Generá un link y envialo por WhatsApp o email.",
    icon: HiLink,
  },
  {
    title: "Acceso temporal y revocable",
    description: "Links que expiran y podés revocar con un clic.",
    icon: HiLockClosed,
  },
  {
    title: "Grupo familiar",
    description: "Cargá estudios para tus familiares y tené todo en un solo lugar.",
    icon: HiUserGroup,
  },
];

export default function Benefits() {
  return (
    <section id="beneficios" className={`premium-section ${styles.benefitsSection}`}>
      <div className="premium-container">
        <Reveal>
          <h2 className={`fw-semibold mb-5 ${styles.title}`}>
            Beneficios
          </h2>
        </Reveal>
        <Row className="g-4">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Col key={index} md={6} lg={3}>
                <Reveal delay={index * 0.1} variant="fadeUp">
                  <div className={`${styles.premiumBenefitCard} h-100`}>
                    <div className="mb-4">
                      <IconComponent className={styles.icon} />
                    </div>
                    <h3 className={`fw-bold mb-3 ${styles.benefitTitle}`}>
                      {benefit.title}
                    </h3>
                    <p className={styles.benefitDescription}>
                      {benefit.description}
                    </p>
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
