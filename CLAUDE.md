# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MI SALUTECA** - Sistema de gestión de estudios médicos personales y familiares.

Next.js 16.1.1 application con React 19, TypeScript, Bootstrap 5.3.8 y Tailwind CSS v4. Arquitectura App Router con datos mock (backend pendiente de implementación).

**Nombre de la app:** Mi Saluteca

## Commands

```bash
npm run dev           # Start dev server at http://localhost:3000
npm run build         # Build for production
npm start             # Start production server
npm run lint          # Run ESLint
```

## Branding MI SALUTECA

**Colores:**
- Primary: `#016390` (azul)
- Secondary: `#7ABB85` (verde)
- Gray: `#919191`
- Black: `#000000`
- White: `#FFFFFF`

**Tipografía:**
- UI Font: Inter (400, 500, 600, 700)
- Loaded via `next/font/google`

**Logo:**
- Isotipo: carpeta/documento con lupa (Cloudinary URL)
- Wordmark: "Mi Saluteca" con gradiente azul
- Favicon: Mismo isotipo configurado en metadata

## Architecture

**Framework:** Next.js 16 App Router (file-based routing)

**Styling:**
- Bootstrap 5.3.8 con React Bootstrap components (principal)
- Tailwind CSS v4 via PostCSS (complementario)
- Custom CSS classes en [app/globals.css](app/globals.css)

**Data Layer (Mock):**
- Tipos en [types/index.ts](types/index.ts)
- Datos mock y helpers en [lib/mockData.ts](lib/mockData.ts)
- Backend pendiente (se planea MySQL + Prisma + S3/R2)

**Path Alias:**
- `@/*` maps to root directory

## Project Structure

```
app/
├── layout.tsx                    # Root layout (Inter font, metadata, favicon)
├── page.tsx                      # Root redirect to /app
├── globals.css                   # Global styles + MI SALUTECA design system
├── app/                          # Protected app routes
│   ├── layout.tsx                # App layout wrapper
│   ├── page.tsx                  # Home/Dashboard with KPIs + recent studies
│   ├── studies/
│   │   ├── page.tsx              # All studies (search + filter)
│   │   └── [id]/page.tsx         # Study detail with preview
│   ├── family/
│   │   ├── page.tsx              # Family members list
│   │   └── [id]/page.tsx         # Family member detail + studies
│   └── settings/page.tsx         # User settings
└── s/[token]/page.tsx            # Public shared study view

components/
├── layout/
│   ├── AppShell.tsx              # Main app container (Sidebar + Topbar + content)
│   ├── Sidebar.tsx               # Navigation sidebar with "Mi Saluteca" logo
│   └── Topbar.tsx                # Top bar with title + actions
└── modals/
    ├── UploadStudyModal.tsx      # Upload study form (file + category + metadata)
    ├── AddFamilyMemberModal.tsx  # Add family member form
    ├── ShareModal.tsx            # Generate share link + WhatsApp integration
    ├── ViewStudyModal.tsx        # Quick study preview modal
    └── SharedLinksModal.tsx      # Manage shared links

types/
└── index.ts                      # TypeScript interfaces and enums

lib/
└── mockData.ts                   # Mock data + helper functions
```

## Key Features

**1. Categorías de Estudios:**
- Análisis de Sangre (blood) - rojo
- Radiografía (xray) - azul
- Resonancia Magnética (mri) - púrpura
- Tomografía (ct) - verde
- Ecografía (ultrasound) - naranja
- Electrocardiograma (ecg) - rosa
- Otro (other) - gris

Cada categoría tiene pill con color distintivo (ver [app/globals.css](app/globals.css)).

**2. Grupo Familiar:**
- Crear perfiles de familiares
- Relaciones: parent, child, spouse, sibling, other
- Campos: nombre, relación, fecha nacimiento, alergias, notas
- KPIs: total estudios, último estudio

**3. Compartir (WhatsApp Integration):**
- Generar link temporal (mock)
- Expiración: 24 horas después del PRIMER ACCESO (comportamiento futuro, pendiente backend)
- Botón directo "Compartir por WhatsApp" usando `https://wa.me/?text=`
- Copiar link al portapapeles
- Links revocables desde Settings → Enlaces compartidos
- Vista pública sin autenticación en `/s/[token]`

**4. Upload de Estudios:**
- Archivo PDF/JPG/PNG (mock, no upload real)
- Campos obligatorios: archivo, categoría, fecha
- Campos opcionales: título, descripción
- Asignar a usuario o familiar

## Component Patterns

**Modales:**
- Usar React Bootstrap `Modal` component
- Form validation básica en el estado
- Loading states con spinner
- Success feedback antes de cerrar

**Cards de Estudios:**
- Category pill arriba izquierda
- Fecha arriba derecha
- Título (o fallback a categoría)
- Nombre familiar (si aplica)
- Descripción truncada (2 líneas)
- **Separador visual:** borderTop: 1px solid #E5E5E5 con pt-3 antes de botones
- Botones "Ver" y "Compartir"

**Cards de Familiares:**
- Avatar circular con iniciales
- Nombre + relación + edad
- KPIs: Total estudios + Último estudio
- **Separador visual:** borderBottom antes del botón "Ver estudios"
- Notas si existen

**Empty States:**
- Icono SVG circular gris
- Título + descripción
- CTA button

## Mock Data Notes

Todos los datos son mock en [lib/mockData.ts](lib/mockData.ts):
- `mockUser` - usuario logueado
- `mockFamilyMembers` - 4 familiares de ejemplo
- `mockStudies` - 8 estudios de ejemplo
- `mockShareLinks` - 2 share links activos

Helper functions disponibles:
- `getStudiesByFamilyMember(id)`
- `getStudyCountByFamilyMember(id)`
- `getLastStudyDateByFamilyMember(id)`
- `formatDate(date)`
- `formatFileSize(bytes)`
- `formatRelativeTime(date)`

## Pending Backend Implementation

Cuando se implemente el backend:
1. Reemplazar imports de `mockData.ts` con API calls
2. NextAuth v5 con Google Provider
3. MySQL + Prisma (schemas en comentarios de mockData.ts)
4. File upload a S3/R2 (guardar fileKey, no archivo en DB)
5. Share links con tokens únicos + expiración en DB (activar timer al primer acceso)

## Custom CSS Classes

Definidas en [app/globals.css](app/globals.css):
- `.btn-primary-saluteca` - botón negro principal
- `.btn-outline-saluteca` - botón outline azul
- `.btn-secondary-saluteca` - botón secundario
- `.card-saluteca` - card con hover effect (translateY -2px + shadow)
- `.category-pill` - pill de categoría
- `.category-{blood|xray|mri|ct|ultrasound|ecg|other}` - colores por categoría
- `.empty-state`, `.empty-state-icon`, `.empty-state-title`, `.empty-state-description` - estados vacíos
- `.hover-bg-light` - hover gris claro
- `.text-primary-saluteca`, `.text-muted-saluteca`, `.bg-secondary-saluteca` - colores de texto/fondo

## Important Design Decisions

1. **Login eliminado:** App redirige directo a `/app` (auth pendiente de backend)
2. **Separador en cards:** Todas las cards de estudios y familiares tienen borderTop/borderBottom antes de botones para consistencia visual
3. **Expiración de links:** Texto actualizado para reflejar "24h después del primer acceso" (lógica futura)
4. **Recursos legales:** Removidos de Settings (pendiente definir ubicación: footer, modal o página separada)
5. **Nombre de la app:** "Mi Saluteca" en sidebar y metadata
