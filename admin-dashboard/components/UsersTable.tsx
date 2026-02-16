"use client";

import { useState } from "react";
import { Table, Pagination, Card } from "react-bootstrap";
import { User, UsersResponse, getUsers } from "../server-actions/get-users";
import { useRouter } from "next/navigation";

interface UsersTableProps {
  initialData: UsersResponse;
  usersPerPage?: number;
}

const UsersTable = ({ initialData, usersPerPage = 20 }: UsersTableProps) => {



  const [data, setData] = useState<UsersResponse>(initialData);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePageChange = async (pageNumber: number) => {
    setLoading(true);
    try {
      const newData = await getUsers(pageNumber, usersPerPage);
      setData(newData);
      // Actualizar URL sin recargar la página
      router.push(`/adm/usuarios?page=${pageNumber}`, { scroll: false });
    } catch (error) {
      console.error("Error al cambiar página:", error);
    } finally {
      setLoading(false);
    }
  };

  // Generar items de paginación
  const renderPaginationItems = () => {
    const items = [];
    const { page, totalPages } = data;

    // Botón primera página
    if (page > 1) {
      items.push(
        <Pagination.First key="first" onClick={() => handlePageChange(1)} />
      );
      items.push(
        <Pagination.Prev
          key="prev"
          onClick={() => handlePageChange(page - 1)}
        />
      );
    }

    // Páginas visibles
    const maxVisible = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === page}
          onClick={() => handlePageChange(i)}
          disabled={loading}
        >
          {i}
        </Pagination.Item>
      );
    }

    // Botón última página
    if (page < totalPages) {
      items.push(
        <Pagination.Next
          key="next"
          onClick={() => handlePageChange(page + 1)}
        />
      );
      items.push(
        <Pagination.Last
          key="last"
          onClick={() => handlePageChange(totalPages)}
        />
      );
    }

    return items;
  };

  return (
    <div>
      {/* Contador de usuarios */}
      <Card className="mb-3">
        <Card.Body>
          <h5 className="mb-0">
            Total de usuarios registrados:{" "}
            <strong className="text-primary">{data.total}</strong>
          </h5>
        </Card.Body>
      </Card>

      {/* Tabla de usuarios */}
      <Card>
        <Card.Body>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ width: "80px" }}>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th style={{ width: "120px", textAlign: "center" }}>
                    Estudios
                  </th>
                  <th style={{ width: "120px", textAlign: "center" }}>
                    Compartidos
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                      </div>
                    </td>
                  </tr>
                ) : data.users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No hay usuarios registrados
                    </td>
                  </tr>
                ) : (
                  data.users.map((user: User) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td style={{ textAlign: "center" }}>
                        <span className="badge bg-primary">
                          {user.totalEstudios}
                        </span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <span className="badge bg-success">
                          {user.totalCompartidos}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>

          {/* Paginación */}
          {data.totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <Pagination>{renderPaginationItems()}</Pagination>
            </div>
          )}

          {/* Información de paginación */}
          <div className="text-muted text-center mt-2 small">
            Mostrando{" "}
            {data.users.length > 0
              ? `${(data.page - 1) * data.perPage + 1} - ${Math.min(
                data.page * data.perPage,
                data.total
              )}`
              : "0"}{" "}
            de {data.total} usuarios
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UsersTable;
