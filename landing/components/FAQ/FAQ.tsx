"use client";

import { Container, Row, Col, Accordion } from "react-bootstrap";
import Reveal from "../Reveal/Reveal";
import styles from "./FAQ.module.css";

const faqs = [
  {
    question: "¿Qué archivos puedo subir?",
    answer: "Podés subir estudios en PDF o imágenes (JPG, PNG). También podés sacarle una foto desde tu celular al estudio en papel y subirla directo. Son los formatos más comunes que entregan clínicas, laboratorios y médicos.",
  },
  {
    question: "¿Qué hace la inteligencia artificial?",
    answer: "Cuando subís un estudio, nuestra IA analiza el documento y completa automáticamente el título, la fecha, la institución y genera una observación con los datos más relevantes. Vos podés revisar y editar todo antes de guardarlo.",
  },
  {
    question: "¿Cómo comparto un estudio con mi médico?",
    answer: "Seleccionás el estudio, generás un link temporal y lo enviás por WhatsApp, email o el medio que prefieras. El link dura 24 horas desde que tu médico lo abre por primera vez.",
  },
  {
    question: "¿El médico necesita cuenta?",
    answer: "No, tu médico accede al estudio haciendo clic en el link. No necesita crear cuenta ni descargar nada.",
  },
  {
    question: "¿Qué pasa si el link expira?",
    answer: "Podés generar un nuevo link en cualquier momento desde tu cuenta. La expiración automática protege tu información.",
  },
  {
    question: "¿Puedo revocar acceso?",
    answer: "Sí, podés revocar cualquier link con un solo clic desde tu panel, incluso antes de que expire automáticamente.",
  },
  {
    question: "¿Puedo borrar mi cuenta y mis archivos?",
    answer: "Sí, podés eliminar tu cuenta y todos tus archivos en cualquier momento. La eliminación es permanente e irreversible.",
  },
  {
    question: "¿Tiene costo?",
    answer: "Durante esta etapa, Mi Saluteca es gratuito.",
  },
  {
    question: "¿Qué seguridad tiene?",
    answer: "Usamos links temporales con expiración automática y revocación manual. La seguridad se mejora de forma continua siguiendo buenas prácticas y procesos de auditoría.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className={`premium-section ${styles.faqSection}`}>
      <div className="premium-container">
        <Row className="justify-content-center">
          <Col lg={9}>
            <Reveal>
              <h2 className={`fw-semibold mb-5 ${styles.title}`}>
                Preguntas frecuentes
              </h2>
            </Reveal>
            <Reveal>
              <Accordion className={styles.premiumAccordion}>
                {faqs.map((faq, index) => (
                  <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header>
                      <strong className={styles.question}>{faq.question}</strong>
                    </Accordion.Header>
                    <Accordion.Body className={styles.answer}>
                      {faq.answer}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Reveal>
          </Col>
        </Row>
      </div>
    </section>
  );
}
