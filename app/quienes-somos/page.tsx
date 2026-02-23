"use client";

import Navbar from "@/landing/components/Navbar";
import Footer from "@/landing/components/Footer";
import Reveal from "@/landing/components/Reveal";
import { Container, Row, Col } from "react-bootstrap";

const team = [
    {
        name: "Agustín Forte",
        role: "Co-Founder",
        bio: "Impulsa la visión y el crecimiento de Mi Saluteca.",
        photo: null as string | null, // Reemplazar con "/images/team/agustin.jpg"
        initials: "AF",
    },
    {
        name: "Manuel Forte",
        role: "Co-Founder",
        bio: "Lidera el desarrollo tecnológico de la plataforma.",
        photo: null as string | null,
        initials: "MF",
    },
    {
        name: "Estrella",
        role: "Equipo",
        bio: "Parte fundamental del equipo detrás de Mi Saluteca.",
        photo: null as string | null,
        initials: "E",
    },
    {
        name: "María",
        role: "Equipo",
        bio: "Parte fundamental del equipo detrás de Mi Saluteca.",
        photo: null as string | null,
        initials: "M",
    },
];

const values = [
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>, title: "Privacidad primero", description: "Tus datos son tuyos. No vendemos ni compartimos tu información con nadie." },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>, title: "Simplicidad", description: "Cada función está diseñada para ser intuitiva, sin pasos innecesarios." },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>, title: "Transparencia", description: "Somos claros sobre qué hacemos con tus datos y cómo funciona la IA." },
    { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>, title: "Mejora continua", description: "Escuchamos a nuestros usuarios para mejorar el producto constantemente." },
];

const timeline = [
    { year: "2025", title: "La idea", description: "Vimos que nuestros familiares tenían estudios médicos desperdigados en cajones, carpetas y PDFs perdidos en el celular." },
    { year: "2025", title: "Desarrollo", description: "Empezamos a construir una plataforma simple para organizar estudios médicos con IA." },
    { year: "2026", title: "Lanzamiento", description: "Mi Saluteca sale al público con clasificación por IA, grupo familiar y links temporales." },
];

export default function QuienesSomosPage() {
    return (
        <>
            <Navbar />

            {/* Hero */}
            <section
                style={{
                    background: "#ffffff",
                    paddingTop: "140px",
                    paddingBottom: "80px",
                }}
            >
                <div className="premium-container">
                    <Reveal>
                        <div style={{ maxWidth: "700px" }}>
                            <h1
                                style={{
                                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                                    fontWeight: 700,
                                    color: "#000",
                                    letterSpacing: "-0.03em",
                                    lineHeight: 1.1,
                                    marginBottom: "1.5rem",
                                }}
                            >
                                Las personas detrás de{" "}
                                <span style={{ color: "#016390" }}>Mi Saluteca.</span>
                            </h1>
                            <p
                                style={{
                                    fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
                                    color: "#6b6b6b",
                                    lineHeight: 1.7,
                                    maxWidth: "560px",
                                }}
                            >
                                Somos un equipo que cree que acceder a tu información de salud
                                debería ser tan simple como abrir una app.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Historia — dark section */}
            <section
                style={{
                    background: "#1a1a1a",
                    padding: "100px 0",
                }}
            >
                <div className="premium-container">
                    <Reveal>
                        <h2
                            style={{
                                fontSize: "clamp(2rem, 4vw, 3rem)",
                                fontWeight: 700,
                                color: "#fff",
                                letterSpacing: "-0.03em",
                                marginBottom: "3rem",
                            }}
                        >
                            Nuestra historia
                        </h2>
                    </Reveal>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0", position: "relative", paddingLeft: "2.5rem" }}>
                        {/* Vertical line */}
                        <div
                            style={{
                                position: "absolute",
                                left: "7px",
                                top: "8px",
                                bottom: "8px",
                                width: "2px",
                                background: "linear-gradient(180deg, #0284c7 0%, #0d9488 100%)",
                                borderRadius: "2px",
                            }}
                        />

                        {timeline.map((item, i) => (
                            <Reveal key={i} delay={i * 0.15} variant="fadeUp">
                                <div style={{ position: "relative", paddingBottom: i < timeline.length - 1 ? "3rem" : "0" }}>
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: "-2.5rem",
                                            top: "4px",
                                            width: "16px",
                                            height: "16px",
                                            borderRadius: "50%",
                                            background: i === timeline.length - 1 ? "#0d9488" : "#1a1a1a",
                                            border: `2px solid ${i === timeline.length - 1 ? "#0d9488" : "#0284c7"}`,
                                            zIndex: 1,
                                        }}
                                    />
                                    <span
                                        style={{
                                            fontSize: "0.8125rem",
                                            fontWeight: 700,
                                            color: "#0d9488",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        {item.year}
                                    </span>
                                    <h3
                                        style={{
                                            fontSize: "1.25rem",
                                            fontWeight: 600,
                                            color: "#fff",
                                            margin: "0.25rem 0 0.5rem",
                                        }}
                                    >
                                        {item.title}
                                    </h3>
                                    <p style={{ margin: 0, color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "500px" }}>
                                        {item.description}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Equipo — white section */}
            <section
                style={{
                    background: "#ffffff",
                    padding: "100px 0",
                }}
            >
                <div className="premium-container">
                    <Reveal>
                        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                            <h2
                                style={{
                                    fontSize: "clamp(2rem, 4vw, 3rem)",
                                    fontWeight: 700,
                                    color: "#000",
                                    letterSpacing: "-0.03em",
                                    marginBottom: "0.75rem",
                                }}
                            >
                                El equipo
                            </h2>
                            <p style={{ color: "#6b6b6b", fontSize: "1.1rem", margin: 0 }}>
                                Las personas que hacen posible Mi Saluteca
                            </p>
                        </div>
                    </Reveal>

                    <Row className="g-4 justify-content-center">
                        {team.map((member, i) => (
                            <Col key={i} sm={6} lg={3}>
                                <Reveal delay={i * 0.1} variant="fadeUp">
                                    <div
                                        style={{
                                            background: "#fafafa",
                                            borderRadius: "20px",
                                            padding: "2.5rem 2rem",
                                            textAlign: "center",
                                            height: "100%",
                                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                        }}
                                        className="hover-card"
                                    >
                                        {/* Photo */}
                                        <div
                                            style={{
                                                width: "120px",
                                                height: "120px",
                                                borderRadius: "50%",
                                                margin: "0 auto 1.5rem",
                                                background: member.photo
                                                    ? `url(${member.photo}) center/cover no-repeat`
                                                    : "linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)",
                                                border: "4px solid #e0f2fe",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "2rem",
                                                fontWeight: 700,
                                                color: "#016390",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {!member.photo && member.initials}
                                        </div>
                                        <h3
                                            style={{
                                                fontSize: "1.125rem",
                                                fontWeight: 600,
                                                color: "#000",
                                                marginBottom: "0.5rem",
                                            }}
                                        >
                                            {member.name}
                                        </h3>
                                        <span
                                            style={{
                                                display: "inline-block",
                                                fontSize: "0.8125rem",
                                                fontWeight: 600,
                                                color: "#016390",
                                                background: "#e0f2fe",
                                                padding: "0.25rem 1rem",
                                                borderRadius: "999px",
                                                marginBottom: "1rem",
                                            }}
                                        >
                                            {member.role}
                                        </span>
                                        <p style={{ color: "#6b6b6b", fontSize: "0.9375rem", margin: 0, lineHeight: 1.6 }}>
                                            {member.bio}
                                        </p>
                                    </div>
                                </Reveal>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* Valores — dark section */}
            <section
                style={{
                    background: "#1a1a1a",
                    padding: "100px 0",
                }}
            >
                <div className="premium-container">
                    <Reveal>
                        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                            <h2
                                style={{
                                    fontSize: "clamp(2rem, 4vw, 3rem)",
                                    fontWeight: 700,
                                    color: "#fff",
                                    letterSpacing: "-0.03em",
                                    marginBottom: "0.75rem",
                                }}
                            >
                                Nuestros valores
                            </h2>
                        </div>
                    </Reveal>

                    <Row className="g-4">
                        {values.map((value, i) => (
                            <Col key={i} md={6} lg={3}>
                                <Reveal delay={i * 0.1} variant="fadeUp">
                                    <div
                                        style={{
                                            background: "rgba(255,255,255,0.05)",
                                            borderRadius: "16px",
                                            padding: "2rem 1.5rem",
                                            height: "100%",
                                            border: "1px solid rgba(255,255,255,0.08)",
                                        }}
                                    >
                                        <div style={{ marginBottom: "1rem" }}>
                                            {value.icon}
                                        </div>
                                        <h3
                                            style={{
                                                fontSize: "1rem",
                                                fontWeight: 600,
                                                color: "#fff",
                                                marginBottom: "0.5rem",
                                            }}
                                        >
                                            {value.title}
                                        </h3>
                                        <p style={{ margin: 0, color: "rgba(255,255,255,0.55)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                                            {value.description}
                                        </p>
                                    </div>
                                </Reveal>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>

            {/* Misión — white section */}
            <section
                style={{
                    background: "#ffffff",
                    padding: "100px 0",
                }}
            >
                <div className="premium-container">
                    <Reveal>
                        <div
                            style={{
                                maxWidth: "700px",
                                margin: "0 auto",
                                textAlign: "center",
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "clamp(2rem, 4vw, 3rem)",
                                    fontWeight: 700,
                                    color: "#000",
                                    letterSpacing: "-0.03em",
                                    marginBottom: "1.5rem",
                                }}
                            >
                                Nuestra misión
                            </h2>
                            <p
                                style={{
                                    fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
                                    color: "#6b6b6b",
                                    lineHeight: 1.8,
                                    margin: 0,
                                }}
                            >
                                Hacer que el acceso y la gestión de información de salud sea simple, segura y
                                centrada en las personas. Creemos que cada familia debería poder acceder a su
                                historial médico en cualquier momento, desde cualquier lugar.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            <Footer />
        </>
    );
}
