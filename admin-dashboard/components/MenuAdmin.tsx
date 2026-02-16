"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import styles from "./MenuAdmin.module.css";
import { logout as logoutAction } from "../server-actions/auth";

const MenuAdmin = ({ showBasic }: { showBasic: (show: boolean) => void }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);
  const [widthOffCanvas, setWidthOffCanvas] = useState("400px");
  const showBasicRef = useRef(showBasic);
  const [loaded, setLoaded] = useState(false);

  // Actualizar ref cuando cambie showBasic
  // useEffect(() => {
  //   showBasicRef.current = showBasic;
  // }, [showBasic]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setWidthOffCanvas("100vw");
        setShow(false);
      } else {
        setWidthOffCanvas("400px");
        setShow(true);
      }
      setLoaded(true);
    };
    handleResize();
    // window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    showBasicRef.current(show);
  }, [show]);

  const logout = async () => {
    await logoutAction();
  };

  if (!loaded) return null;

  return (
    <>
      <div className="position-relative">
        <button
          onClick={toggleShow}
          className={`btn btn-secondary ${styles.buttonOpenMenu} mb-1 btn-sm`}
          style={{
            borderRadius: ".375rem",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px"
          }}
        >
          Abrir menu
        </button>

        <div
          className="position-absolute"
          style={{
            top: "0px",
            right: "0px",
          }}
        >
          <button className="btn btn-danger btn-sm" onClick={logout}

            style={{
              borderRadius: ".375rem",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px"
            }}
          >
            {" "}
            Cerrar sesion
          </button>
        </div>
      </div>
      <div
        className={styles.menuAdminContainer}
        style={{
          width: widthOffCanvas,
          left: show ? 0 : `-${widthOffCanvas}`,
        }}
      >
        <div
          className={`${styles.menuAdminHeader} d-flex justify-content-between align-items-center`}
        >
          <h5 className="m-0">Menu</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleClose}
            aria-label="Close"
          ></button>
        </div>

        <div className={styles.menuAdminBody}>

          <div className="d-flex flex-column mt-3">
            <>
              <div
                style={{
                  background: "#444444",
                  width: "100%",
                  borderRadius: "7px",
                  padding: "10px",
                  color: "#FFFFFF",
                  textAlign: "center",
                  fontSize: "20px",
                }}
              >
                Estadisticas
              </div>
              <Link
                href="/adm/usuarios"
                prefetch={false}
                className="ms-auto"
              >
                <button
                  className={` btn btn-secondary  mb-3 mt-3 align-self-center ${styles.buttonMenu
                    } ${pathname === "/adm/usuarios"
                      ? styles.activeMenu
                      : ""
                    }`}
                  style={{

                    width: "220px"

                    , borderRadius: ".375rem"
                  }}

                >
                  <span >Usuarios</span>
                </button>
              </Link>



            </>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default MenuAdmin;
