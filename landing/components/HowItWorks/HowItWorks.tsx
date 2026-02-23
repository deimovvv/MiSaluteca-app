"use client";

import { Container, Row, Col } from "react-bootstrap";
import Reveal from "../Reveal/Reveal";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    number: "1",
    title: "Subí tus estudios",
    description: "Nuestra IA clasifica título, fecha, institución y genera una observación por vos",
  },
  {
    number: "2",
    title: "Todo organizado",
    description: "Encontrá cualquier estudio en segundos, siempre disponible",
  },
  {
    number: "3",
    title: "Compartí con link temporal",
    description: "Tu médico lo ve sin cuenta. Vos revocás el acceso cuando quieras",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className={`premium-section ${styles.howItWorksSection}`}>
      <div className="premium-container">
        <Reveal>
          <h2 className={`fw-semibold mb-5 ${styles.title}`}>
            ¿Cómo funciona?
          </h2>
        </Reveal>
        <Row className="g-5">
          {steps.map((step, index) => (
            <Col key={index} md={4}>
              <Reveal delay={index * 0.15} variant="scale">
                <div>
                  <div
                    className={`d-inline-flex align-items-center justify-content-center rounded-circle mb-4 ${styles.stepNumber}`}
                  >
                    {step.number}
                  </div>
                  <h3 className={`fw-bold mb-3 ${styles.stepTitle}`}>
                    {step.title}
                  </h3>
                  <p className={styles.stepDescription}>
                    {step.description}
                  </p>
                </div>
              </Reveal>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}
