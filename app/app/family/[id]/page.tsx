"use client";

import { useState } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";
import { Button, Card, Form, InputGroup, Dropdown } from "react-bootstrap";
import {
  getFamilyMemberById,
  getStudiesByFamilyMember,
  getStudyCountByFamilyMember,
  getLastStudyDateByFamilyMember,
  formatDate,
} from "@/lib/mockData";
import { RELATION_LABELS, CATEGORY_INFO } from "@/types";
import ShareModal from "@/components/modals/ShareModal";
import ViewStudyModal from "@/components/modals/ViewStudyModal";
import UploadStudyModal from "@/components/modals/UploadStudyModal";
import type { Study, StudyCategory } from "@/types";

export default function FamilyMemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [shareStudy, setShareStudy] = useState<Study | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<StudyCategory | "all">("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const member = getFamilyMemberById(id);

  if (!member) {
    return (
      <AppShell title="Familiar no encontrado">
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
              />
              <path
                d="M20 13.3333V20"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="20" cy="26.6667" r="1.5" fill="var(--saluteca-gray)" />
            </svg>
          </div>
          <h2 className="empty-state-title">Familiar no encontrado</h2>
          <p className="empty-state-description">
            El familiar que buscás no existe
          </p>
          <Link href="/app/family" className="btn btn-primary-saluteca">
            Volver a Grupo Familiar
          </Link>
        </div>
      </AppShell>
    );
  }

  // Generate years array (from 2020 to current year + 1)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 + 1 }, (_, i) => 2020 + i);

  const months = [
    { value: "01", label: "Enero" },
    { value: "02", label: "Febrero" },
    { value: "03", label: "Marzo" },
    { value: "04", label: "Abril" },
    { value: "05", label: "Mayo" },
    { value: "06", label: "Junio" },
    { value: "07", label: "Julio" },
    { value: "08", label: "Agosto" },
    { value: "09", label: "Septiembre" },
    { value: "10", label: "Octubre" },
    { value: "11", label: "Noviembre" },
    { value: "12", label: "Diciembre" },
  ];

  const allStudies = getStudiesByFamilyMember(id);
  const studyCount = getStudyCountByFamilyMember(id);
  const lastStudyDate = getLastStudyDateByFamilyMember(id);

  // Filter studies
  const studies = allStudies.filter((study) => {
    const matchesSearch =
      searchQuery === "" ||
      study.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      CATEGORY_INFO[study.category].label.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" || study.category === selectedCategory;

    const matchesDate = (!selectedMonth && !selectedYear) || (() => {
      const studyDate = new Date(study.date);
      const monthMatch = !selectedMonth || studyDate.getMonth() + 1 === parseInt(selectedMonth);
      const yearMatch = !selectedYear || studyDate.getFullYear() === parseInt(selectedYear);
      return monthMatch && yearMatch;
    })();

    return matchesSearch && matchesCategory && matchesDate;
  });

  return (
    <AppShell
      title={member.name}
      action={
        <div className="d-flex gap-2 align-items-center">
          <Link href="/app/family" className="btn btn-secondary-saluteca d-flex align-items-center">
            Volver
          </Link>
          <Button
            className="btn-primary-saluteca d-flex align-items-center"
            onClick={() => setShowUploadModal(true)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="me-2"
              style={{ display: "inline" }}
            >
              <path
                d="M8 3.33337V12.6667"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.33337 8H12.6667"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Subir Estudio
          </Button>
        </div>
      }
    >
      {/* Member Info & KPIs */}
      <div className="bg-white rounded-3 p-4 mb-4 border">
        <div className="row">
          <div className="col-md-3">
            <div className="d-flex flex-column align-items-center text-center">
              <div
                className="bg-secondary-saluteca d-flex align-items-center justify-content-center text-white fw-semibold mb-3"
                style={{
                  width: "96px",
                  height: "96px",
                  borderRadius: "50%",
                  fontSize: "2rem",
                }}
              >
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <h2 className="h5 fw-semibold mb-1">{member.name}</h2>
              <p className="text-muted-saluteca mb-0">
                {RELATION_LABELS[member.relation]}
                {member.age && ` • ${member.age} años`}
              </p>
            </div>
          </div>

          <div className="col-md-9">
            <div className="row g-3 mb-3">
              <div className="col-sm-6">
                <Card className="border">
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          backgroundColor: "#E3F2FD",
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z"
                            stroke="#1565C0"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13 2V9H20"
                            stroke="#1565C0"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-muted-saluteca" style={{ fontSize: "0.875rem" }}>
                          Total de estudios
                        </div>
                        <div className="h4 mb-0 fw-semibold">{studyCount}</div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>

              <div className="col-sm-6">
                <Card className="border">
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          backgroundColor: "#E8F5E9",
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="#2E7D32"
                            strokeWidth="2"
                          />
                          <path
                            d="M12 6V12L16 14"
                            stroke="#2E7D32"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-muted-saluteca" style={{ fontSize: "0.875rem" }}>
                          Último estudio
                        </div>
                        <div className="fw-semibold" style={{ fontSize: "1.125rem" }}>
                          {lastStudyDate ? formatDate(lastStudyDate) : "—"}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>

            {member.notes && (
              <div className="p-3 rounded" style={{ backgroundColor: "#F8F9FA" }}>
                <div className="fw-medium mb-1" style={{ fontSize: "0.875rem" }}>
                  Notas
                </div>
                <div className="text-muted" style={{ fontSize: "0.875rem" }}>
                  {member.notes}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Studies Section */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="h5 fw-semibold mb-0">Estudios</h3>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-3 p-3 mb-4 border">
        <div className="row g-3">
          <div className="col-md-5">
            <InputGroup>
              <InputGroup.Text className="bg-white border-end-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="7.5"
                    cy="7.5"
                    r="5.5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M11.5 11.5L14.5 14.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Buscar estudios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-start-0"
                style={{ boxShadow: "none" }}
              />
            </InputGroup>
          </div>

          <div className="col-md-3">
            <Dropdown>
              <Dropdown.Toggle
                className="btn-secondary-saluteca w-100 d-flex align-items-center justify-content-between"
                style={{
                  backgroundColor: "white",
                }}
              >
                {selectedCategory === "all" ? (
                  <span>Todos los tipos</span>
                ) : (
                  <span className={`category-pill ${CATEGORY_INFO[selectedCategory].className}`}>
                    {CATEGORY_INFO[selectedCategory].label}
                  </span>
                )}
              </Dropdown.Toggle>

              <Dropdown.Menu className="w-100">
                <Dropdown.Item
                  active={selectedCategory === "all"}
                  onClick={() => setSelectedCategory("all")}
                >
                  Todos los tipos
                </Dropdown.Item>
                <Dropdown.Divider />
                {Object.values(CATEGORY_INFO).map((category) => (
                  <Dropdown.Item
                    key={category.id}
                    active={selectedCategory === category.id}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className={`category-pill ${category.className} me-2`}>
                      {category.label}
                    </span>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="col-md-2 date-filter-month">
            <Form.Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{ fontSize: "0.8rem" }}
              size="sm"
            >
              <option value="">Mes</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </Form.Select>
          </div>

          <div className="col-md-2 date-filter-year">
            <Form.Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{ fontSize: "0.8rem" }}
              size="sm"
            >
              <option value="">Año</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>

        {/* Active filters display */}
        {(searchQuery || selectedCategory !== "all" || selectedMonth || selectedYear) && (
          <div className="mt-3 pt-3 border-top">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span className="text-muted" style={{ fontSize: "0.875rem" }}>Filtros activos:</span>
              {searchQuery && (
                <span className="badge bg-light text-dark border">
                  Búsqueda: "{searchQuery}"
                  <button
                    className="btn-close btn-close-sm ms-2"
                    style={{ fontSize: "0.6rem" }}
                    onClick={() => setSearchQuery("")}
                    aria-label="Close"
                  />
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className={`category-pill ${CATEGORY_INFO[selectedCategory].className}`}>
                  {CATEGORY_INFO[selectedCategory].label}
                  <button
                    className="btn-close btn-close-sm ms-2"
                    style={{ fontSize: "0.6rem" }}
                    onClick={() => setSelectedCategory("all")}
                    aria-label="Close"
                  />
                </span>
              )}
              {(selectedMonth || selectedYear) && (
                <span className="badge bg-light text-dark border">
                  {selectedMonth && months.find(m => m.value === selectedMonth)?.label}
                  {selectedMonth && selectedYear && " "}
                  {selectedYear}
                  <button
                    className="btn-close btn-close-sm ms-2"
                    style={{ fontSize: "0.6rem" }}
                    onClick={() => {
                      setSelectedMonth("");
                      setSelectedYear("");
                    }}
                    aria-label="Close"
                  />
                </span>
              )}
              <Button
                variant="link"
                className="text-danger p-0"
                style={{ fontSize: "0.875rem" }}
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedMonth("");
                  setSelectedYear("");
                }}
              >
                Limpiar todos
              </Button>
            </div>
          </div>
        )}
      </div>

      {studies.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26 4H12C10.9391 4 9.92172 4.42143 9.17157 5.17157C8.42143 5.92172 8 6.93913 8 8V32C8 33.0609 8.42143 34.0783 9.17157 34.8284C9.92172 35.5786 10.9391 36 12 36H28C29.0609 36 30.0783 35.5786 30.8284 34.8284C31.5786 34.0783 32 33.0609 32 32V14L26 4Z"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M26 4V14H32"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h4 className="empty-state-title" style={{ fontSize: "1.25rem" }}>
            {!searchQuery && selectedCategory === "all" && !selectedMonth && !selectedYear
              ? "No hay estudios aún"
              : "No se encontraron resultados"}
          </h4>
          <p className="empty-state-description">
            {!searchQuery && selectedCategory === "all" && !selectedMonth && !selectedYear
              ? `Subí el primer estudio de ${member.name.split(" ")[0]}`
              : "Intentá con otros filtros de búsqueda"}
          </p>
          {!searchQuery && selectedCategory === "all" && !selectedMonth && !selectedYear && (
            <Button
              className="btn-primary-saluteca"
              onClick={() => setShowUploadModal(true)}
            >
              Subir estudio
            </Button>
          )}
        </div>
      ) : (
        <div className="d-flex flex-column gap-1">
          {studies.map((study) => {
            const categoryInfo = CATEGORY_INFO[study.category];

            return (
              <div key={study.id} className="study-row-card">
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  {/* Category pill */}
                  <div className="study-row-category">
                    <span className={`category-pill ${categoryInfo.className}`}>
                      {categoryInfo.label}
                    </span>
                  </div>

                  {/* Title and description */}
                  <div className="study-row-content flex-grow-1">
                    <h3 className="study-row-title">
                      {study.title || categoryInfo.label}
                    </h3>
                    {study.description && (
                      <p className="study-row-description">
                        {study.description}
                      </p>
                    )}
                  </div>

                  {/* Date */}
                  <div className="study-row-date">
                    <span className="text-muted-saluteca" style={{ fontSize: "0.75rem" }}>
                      {formatDate(study.date)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="study-row-actions">
                    <Button
                      className="btn-outline-saluteca btn-sm"
                      onClick={() => {
                        setShareStudy(study);
                        setShowViewModal(true);
                      }}
                    >
                      Ver
                    </Button>
                    <Button
                      className="btn-outline-saluteca btn-sm"
                      onClick={() => setShareStudy(study)}
                    >
                      Compartir
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <UploadStudyModal
        show={showUploadModal}
        onHide={() => setShowUploadModal(false)}
      />

      {shareStudy && (
        <>
          <ViewStudyModal
            show={showViewModal}
            onHide={() => {
              setShowViewModal(false);
              setShareStudy(null);
            }}
            study={shareStudy}
          />
          <ShareModal
            show={!!shareStudy && !showViewModal}
            onHide={() => setShareStudy(null)}
            study={shareStudy}
          />
        </>
      )}
    </AppShell>
  );
}
