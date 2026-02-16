"use client";
import { Container } from "react-bootstrap";
import React, { useEffect, useState, useCallback } from "react";
import MenuAdmin from "../components/MenuAdmin";

interface BasicLayoutAdminProps {
  children: React.ReactNode;
  comision?: boolean;
  data?: {
    tipo?: string;
  };
}

const BasicLayoutAdmin = ({
  children,
  comision = false,
  data = {},
}: BasicLayoutAdminProps) => {
  const [show, setShow] = useState(true);
  const [paddingContainer, setPaddingContainer] = useState(true);

  const handleShowBasic = useCallback((showValue: boolean) => {
    setShow(showValue);
  }, []);

  // useEffect(() => {
  //   if (show) {
  //     setPaddingContainer(true);
  //   } else {
  //     setPaddingContainer(false);
  //   }
  // }, [show]);

  const logout = async () => {
    try {
      const resp = await fetch(`/api/comision/panel/logout`);

      if (resp.status === 200) {
        window.location.href = "/";
      }
    } catch {
      // Error handling could be added here if needed
    }
  };

  useEffect(() => {
    if (data.tipo === "comision") {
      logout();
    }
  }, [data]);

  if (comision) return <>{children}</>;
  return (
    <Container fluid className="p-0" style={{ background: "#FAFAFA" }}>
      <MenuAdmin showBasic={handleShowBasic} />
      <Container
        fluid
        style={{
          paddingLeft: paddingContainer ? "400px" : "0px",
          paddingRight: "0px",
          transition: "all 0.5s",
          background: "#FAFAFA",
        }}
      >
        <div
          style={{
            background: "#FAFAFA",
            padding: "10px",
            transition: "all 1s",
            minHeight: "100vh",
          }}
        >
          {children}
        </div>
      </Container>
    </Container>
  );
};

export default BasicLayoutAdmin;
