"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import { Button, Form, InputGroup, Dropdown } from "react-bootstrap";
import { mockStudies, formatDate, getFamilyMemberById } from "@/lib/mockData";
import { CATEGORY_INFO, StudyCategory } from "@/types";
import ShareModal from "@/components/modals/ShareModal";
import UploadStudyModal from "@/components/modals/UploadStudyModal";
import ViewStudyModal from "@/components/modals/ViewStudyModal";
import EditStudyModal from "@/components/modals/EditStudyModal";
import type { Study } from "@/types";

export default function StudiesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<StudyCategory | "all">("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const [shareStudy, setShareStudy] = useState<Study | null>(null);

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

  // Filter studies
  const filteredStudies = mockStudies.filter((study) => {
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

  // Sort by date (newest first)
  const sortedStudies = [...filteredStudies].sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  return (
    <AppShell
      title="Mis Estudios"
      action={
        <Button
          className="btn-primary-saluteca"
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
      }
    >
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
                    cx="7.33333"
                    cy="7.33333"
                    r="4.66667"
                    stroke="var(--saluteca-gray)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 14L10.6667 10.6667"
                    stroke="var(--saluteca-gray)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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

      {/* Results count */}
      <div className="mb-3">
        <p className="text-muted-saluteca mb-0" style={{ fontSize: "0.875rem" }}>
          {sortedStudies.length === 0 ? (
            "No se encontraron estudios"
          ) : sortedStudies.length === 1 ? (
            "1 estudio encontrado"
          ) : (
            `${sortedStudies.length} estudios encontrados`
          )}
        </p>
      </div>

      {/* Studies List */}
      {sortedStudies.length === 0 ? (
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
                d="M20 36.6667C29.2048 36.6667 36.6667 29.2048 36.6667 20C36.6667 10.7953 29.2048 3.33337 20 3.33337C10.7953 3.33337 3.33337 10.7953 3.33337 20C3.33337 29.2048 10.7953 36.6667 20 36.6667Z"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 13.3334V20.0001"
                stroke="var(--saluteca-gray)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="20" cy="26.6667" r="1.5" fill="var(--saluteca-gray)" />
            </svg>
          </div>
          <h2 className="empty-state-title">No hay estudios</h2>
          <p className="empty-state-description">
            No se encontraron estudios con los filtros aplicados
          </p>
          <Button
            className="btn-outline-saluteca"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedDate("");
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      ) : (
        <div className="d-flex flex-column gap-1">
          {sortedStudies.map((study) => {
            const categoryInfo = CATEGORY_INFO[study.category];
            const familyMember = study.familyMemberId
              ? getFamilyMemberById(study.familyMemberId)
              : null;

            return (
              <div key={study.id} className="study-row-card">
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  {/* Category badge */}
                  <div className="study-row-category">
                    <span className={`category-group-badge badge-${categoryInfo.label.toLowerCase().replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ /g, '-')}`}>
                      {categoryInfo.label.toUpperCase()}
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
                    {familyMember && (
                      <div className="d-flex align-items-center gap-1 mt-1">
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="7"
                            cy="4.5"
                            r="2.5"
                            stroke="var(--saluteca-gray)"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M2 12C2 9.79086 3.79086 8 6 8H8C10.2091 8 12 9.79086 12 12"
                            stroke="var(--saluteca-gray)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="text-muted-saluteca" style={{ fontSize: "0.7rem" }}>
                          {familyMember.name}
                        </span>
                      </div>
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
                        setSelectedStudy(study);
                        setShowEditModal(true);
                      }}
                      title="Editar"
                      aria-label="Editar estudio"
                    >
                      <span className="btn-text">Editar</span>
                    </Button>
                    <Button
                      className="btn-outline-saluteca btn-sm"
                      onClick={() => {
                        setShareStudy(study);
                        setShowViewModal(true);
                      }}
                      title="Ver"
                      aria-label="Ver estudio"
                    >
                      <span className="btn-text">Ver</span>
                    </Button>
                    <Button
                      className="btn-outline-saluteca btn-sm"
                      onClick={() => setShareStudy(study)}
                      title="Compartir"
                      aria-label="Compartir estudio"
                    >
                      <span className="btn-text">Compartir</span>
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

      {selectedStudy && (
        <EditStudyModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          study={selectedStudy}
          onDelete={() => {
            // TODO: Implement delete
            setShowEditModal(false);
            console.log("Study deleted:", selectedStudy.id);
          }}
          onUpdate={(updatedStudy) => {
            // TODO: Implement update
            setShowEditModal(false);
            console.log("Study updated:", updatedStudy);
          }}
        />
      )}

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
