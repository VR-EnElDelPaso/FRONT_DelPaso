# Muvi (front-end)

Proyecto front-end para Muvi construido con React + TypeScript y Vite.

Este repositorio contiene la aplicación web pública (cliente) de Muvi. Está diseñado para:

- Desarrollo local rápido con Vite (HMR).
- Integración con la API (configurada vía variables de entorno).
- Uso de TailwindCSS, React Query, Radix UI y otras librerías modernas.

Resumen rápido
- Stack: React 18, TypeScript, Vite, TailwindCSS
- Puerto de desarrollo por defecto: 3000 (configurado en `vite.config.ts`)

Tabla de contenidos
- Requisitos
- Instalación
- Variables de entorno
- Scripts útiles
- Estructura del proyecto
- Desarrollo y despliegue
- Linting y testing
- Contribuir
- Contacto

## Requisitos

- Node.js (recomendado >= 18). Se puede usar con Bun si se prefiere, pero los scripts están escritos para npm/yarn/pnpm.
- Git

## Instalación

1. Clona el repositorio:

  git clone <repo-url>
  cd muvi-front

2. Instala dependencias (elige tu gestor):

  npm install
  # o
  pnpm install
  # o
  yarn

3. Copia el archivo de ejemplo de variables de entorno y complétalo:

  cp .env.template .env

  Revisa las variables en `./.env.template` y actualiza según tu entorno (API, claves de terceros, etc.).

## Variables de entorno

El proyecto incluye un archivo de ejemplo `.env.template`. Las variables principales son:

```
# General
VITE_NODE_ENV=development
PORT=3000

# API
VITE_API_BASE_URL=http://localhost:4006/api

#### Mercado Pago dev credentials
VITE_MP_PUBLIC_KEY="ask your team for the dev public key"
```

Notas:
- Prefijo VITE_: Vite expone automáticamente las variables de entorno que empiezan con `VITE_` al código cliente. No incluyas secretos sensibles sin medidas adicionales.

## Scripts (desde `package.json`)

- npm run dev — Inicia el servidor de desarrollo (Vite) en el puerto 3000.
- npm run build — Compila la aplicación para producción (ejecuta `tsc && vite build`).
- npm run preview — Sirve una versión optimizada de `dist` localmente (Vite preview).
- npm run lint — Ejecuta ESLint en los archivos TS/TSX.

Ejemplos:

```
npm run dev
npm run build
npm run preview
npm run lint
```

## Estructura del proyecto (resumen)

- `src/` — Código fuente principal
  - `apis/` — Abstracciones para llamadas a la API
  - `components/` — Componentes React reutilizables y secciones (AppBar, Auth, Footer, etc.)
  - `pages/` — Rutas y páginas (HomePage, TourPage, CheckoutPage, etc.)
  - `layouts/` — Layouts de la aplicación
  - `hooks/` — Hooks personalizados
  - `services/` — Lógica de servicios y llamadas externas
  - `stores/` — Estado global (Zustand, etc.)
  - `assets/`, `public/` — Imágenes, svgs y archivos estáticos

Archivos de configuración importantes:
- `vite.config.ts` — Alias `@` a `./src`, puerto de dev 3000
- `tsconfig.json` — Configuración TypeScript (paths para `@/*`)
- `.env.template` — Plantilla de variables de entorno

## Desarrollo

1. Asegúrate de tener las variables de entorno listas (`.env`).
2. Ejecuta:

  npm run dev

3. Abre http://localhost:3000 en tu navegador.

Integración con la API
- Por defecto `VITE_API_BASE_URL` apunta a `http://localhost:4006/api`. Cambia esto para apuntar al servidor de desarrollo/QA/producción según corresponda.

## Build y despliegue

1. Genera los artefactos:

  npm run build

2. El contenido optimizado quedará en `dist/`.
3. Sube `dist/` a tu CDN/host (Netlify, Vercel, S3 + CloudFront, etc.) o utiliza el proceso de despliegue que prefiera tu equipo.

## Linting y calidad de código

Este proyecto usa ESLint con reglas para TypeScript. Ejecuta:

```
npm run lint
```

Recomendación: configura tu editor (VS Code) para aplicar ESLint y formateo al guardar.

## Tests

Actualmente no hay comandos de test incluidos en `package.json`. Si quieres añadir pruebas unitarias, propongo usar Vitest (ligero y bien integrado con Vite). Puedo abrir un PR que añada configuración básica de Vitest si lo deseas.

## Buenas prácticas y advertencias

- No expongas secrets sensibles en variables `VITE_` públicas.
- Mantén el `.env.template` actualizado con variables necesarias para desarrollo.
- Si integras servicios terceros (Mercado Pago, SSO), pide credenciales de prueba al equipo y guárdalas en un gestor de secretos.