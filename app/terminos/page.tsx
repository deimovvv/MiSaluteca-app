"use client";

import Navbar from "@/landing/components/Navbar";
import Footer from "@/landing/components/Footer";
import Reveal from "@/landing/components/Reveal";

const sections = [
    {
        title: "1. Aceptación de los términos",
        content: "Al crear una cuenta o utilizar Mi Saluteca, aceptás estos Términos de Servicio en su totalidad. Si no estás de acuerdo con alguna parte, no utilices la plataforma.",
    },
    {
        title: "2. Descripción del servicio",
        content: "Mi Saluteca es una plataforma digital que permite guardar, organizar y compartir estudios médicos de forma simple y segura. El servicio incluye almacenamiento de archivos, clasificación automática mediante inteligencia artificial, generación de links temporales para compartir, y gestión de grupo familiar.",
        important: "Mi Saluteca no es un servicio médico. No brinda diagnósticos, recomendaciones de tratamiento ni reemplaza la consulta con un profesional de la salud.",
    },
    {
        title: "3. Cuenta de usuario",
        content: "El acceso se realiza mediante autenticación con Google. Sos responsable de mantener la seguridad de tu cuenta de Google y de todas las actividades que ocurran bajo tu sesión en Mi Saluteca. No compartás tus credenciales de acceso con terceros.",
    },
    {
        title: "4. Uso aceptable",
        content: "Te comprometés a:",
        list: [
            "Subir únicamente archivos propios o de familiares con su consentimiento expreso.",
            "No utilizar la plataforma para almacenar contenido ilegal, ofensivo o que viole derechos de terceros.",
            "No intentar acceder a cuentas o datos de otros usuarios.",
            "No usar el servicio con fines comerciales sin autorización previa.",
            "Proporcionar información veraz al crear tu cuenta y perfil.",
        ],
    },
    {
        title: "5. Propiedad del contenido",
        content: "Los archivos que subís a Mi Saluteca son de tu propiedad. Mi Saluteca no reclama ningún derecho sobre tus estudios médicos. Solo almacenamos y procesamos tus archivos para brindarte el servicio. No vendemos, compartimos ni cedemos tus archivos a terceros.",
    },
    {
        title: "6. Inteligencia artificial",
        content: "Cuando subís un estudio, nuestra IA analiza el documento para completar automáticamente campos como título, fecha, institución y una observación con los datos más relevantes.",
        important: "La clasificación automática es orientativa. Siempre podés revisar y editar la información antes de guardarla. Mi Saluteca no garantiza la precisión absoluta de los datos generados por IA.",
    },
    {
        title: "7. Links compartidos",
        content: "Podés generar links temporales para compartir tus estudios con médicos u otras personas. Estos links tienen una duración de 24 horas desde que son abiertos por primera vez, y podés revocarlos en cualquier momento. Sos responsable de con quién compartís tus links. Mi Saluteca no controla quién accede al link una vez que lo compartiste.",
    },
    {
        title: "8. Grupo familiar",
        content: "Podés agregar miembros a tu grupo familiar y cargar estudios en su nombre. Al hacerlo, declarás que contás con el consentimiento de esas personas para almacenar y gestionar su información médica dentro de la plataforma.",
    },
    {
        title: "9. Disponibilidad del servicio",
        content: "Mi Saluteca se provee \"tal cual\" y \"según disponibilidad\". No garantizamos que el servicio esté disponible de forma ininterrumpida o libre de errores. Podemos realizar tareas de mantenimiento que impliquen interrupciones temporales sin previo aviso.",
    },
    {
        title: "10. Eliminación de cuenta",
        content: "Podés eliminar tu cuenta y todos tus archivos en cualquier momento desde la sección de configuración. La eliminación es permanente e irreversible. Una vez eliminada tu cuenta, no podremos recuperar tus datos.",
    },
    {
        title: "11. Costo del servicio",
        content: "Durante esta etapa, Mi Saluteca es gratuito. Nos reservamos el derecho de introducir planes pagos en el futuro, en cuyo caso serás notificado con anticipación. Los datos almacenados bajo la modalidad gratuita no serán eliminados sin previo aviso.",
    },
    {
        title: "12. Limitación de responsabilidad",
        content: "Mi Saluteca no será responsable por:",
        list: [
            "Diagnósticos o decisiones médicas tomadas en base a información almacenada en la plataforma.",
            "Pérdida de datos por causas ajenas a nuestro control.",
            "Uso indebido de links compartidos por parte de terceros.",
            "Errores en la clasificación automática realizada por IA.",
            "Daños directos o indirectos derivados del uso del servicio.",
        ],
    },
    {
        title: "13. Modificaciones",
        content: "Podemos modificar estos términos en cualquier momento. Los cambios serán publicados en esta página con la fecha de actualización. El uso continuado del servicio después de una modificación implica la aceptación de los nuevos términos.",
    },
    {
        title: "14. Contacto",
        content: "Si tenés preguntas sobre estos términos, podés contactarnos a través de la plataforma o escribirnos a nuestro correo electrónico de soporte.",
    },
];

export default function TerminosPage() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <Navbar whiteLogo />

            {/* Hero */}
            <section
                style={{
                    background: "linear-gradient(165deg, #1e2d4d 0%, #2F416A 40%, #3a5280 100%)",
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
                                    color: "#fff",
                                    letterSpacing: "-0.03em",
                                    lineHeight: 1.1,
                                    marginBottom: "1.5rem",
                                }}
                            >
                                Términos de{" "}
                                <span style={{ color: "#7ABB85" }}>Servicio.</span>
                            </h1>
                            <p
                                style={{
                                    fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
                                    color: "rgba(255,255,255,0.7)",
                                    lineHeight: 1.7,
                                    maxWidth: "560px",
                                    margin: 0,
                                }}
                            >
                                Última actualización: febrero {currentYear}
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Secciones de contenido alternando white/dark */}
            <section
                style={{
                    background: "#f4f7fb",
                    padding: "100px 0",
                }}
            >
                <div className="premium-container">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "3rem",
                        }}
                    >
                        {sections.slice(0, 7).map((section, i) => (
                            <Reveal key={i} delay={i * 0.05} variant="fadeUp">
                                <div>
                                    <h2
                                        style={{
                                            fontSize: "1.25rem",
                                            fontWeight: 700,
                                            color: "#1e2d4d",
                                            marginBottom: "0.75rem",
                                            letterSpacing: "-0.01em",
                                        }}
                                    >
                                        {section.title}
                                    </h2>
                                    <p
                                        style={{
                                            margin: 0,
                                            color: "#5a6a8a",
                                            fontSize: "1rem",
                                            lineHeight: 1.75,
                                            maxWidth: "700px",
                                        }}
                                    >
                                        {section.content}
                                    </p>
                                    {section.list && (
                                        <ul
                                            style={{
                                                paddingLeft: "1.25rem",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "0.5rem",
                                                marginTop: "0.75rem",
                                                color: "#5a6a8a",
                                                fontSize: "1rem",
                                                lineHeight: 1.75,
                                                maxWidth: "700px",
                                            }}
                                        >
                                            {section.list.map((item, j) => (
                                                <li key={j}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {section.important && (
                                        <div
                                            style={{
                                                marginTop: "1rem",
                                                background: "rgba(122,187,133,0.06)",
                                                border: "1px solid rgba(122,187,133,0.2)",
                                                borderLeft: "3px solid #7ABB85",
                                                borderRadius: "12px",
                                                padding: "1rem 1.25rem",
                                                fontSize: "0.9375rem",
                                                color: "#5a6a8a",
                                                lineHeight: 1.7,
                                                maxWidth: "700px",
                                            }}
                                        >
                                            <strong style={{ color: "#5a8f62" }}>
                                                Importante:
                                            </strong>{" "}
                                            {section.important}
                                        </div>
                                    )}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* White section — secciones 8-14 */}
            <section
                style={{
                    background: "linear-gradient(165deg, #1e2d4d 0%, #2F416A 40%, #3a5280 100%)",
                    padding: "100px 0",
                }}
            >
                <div className="premium-container">
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "3rem",
                        }}
                    >
                        {sections.slice(7).map((section, i) => (
                            <Reveal key={i} delay={i * 0.05} variant="fadeUp">
                                <div>
                                    <h2
                                        style={{
                                            fontSize: "1.25rem",
                                            fontWeight: 700,
                                            color: "#fff",
                                            marginBottom: "0.75rem",
                                            letterSpacing: "-0.01em",
                                        }}
                                    >
                                        {section.title}
                                    </h2>
                                    <p
                                        style={{
                                            margin: 0,
                                            color: "rgba(255,255,255,0.75)",
                                            fontSize: "1rem",
                                            lineHeight: 1.75,
                                            maxWidth: "700px",
                                        }}
                                    >
                                        {section.content}
                                    </p>
                                    {section.list && (
                                        <ul
                                            style={{
                                                paddingLeft: "1.25rem",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "0.5rem",
                                                marginTop: "0.75rem",
                                                color: "rgba(255,255,255,0.75)",
                                                fontSize: "1rem",
                                                lineHeight: 1.75,
                                                maxWidth: "700px",
                                            }}
                                        >
                                            {section.list.map((item, j) => (
                                                <li key={j}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                    {section.important && (
                                        <div
                                            style={{
                                                marginTop: "1rem",
                                                background: "#f0f9ff",
                                                border: "1px solid #bae6fd",
                                                borderRadius: "12px",
                                                padding: "1rem 1.25rem",
                                                fontSize: "0.9375rem",
                                                color: "#334155",
                                                lineHeight: 1.7,
                                                maxWidth: "700px",
                                            }}
                                        >
                                            <strong style={{ color: "#016390" }}>
                                                Nota:
                                            </strong>{" "}
                                            {section.important}
                                        </div>
                                    )}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
