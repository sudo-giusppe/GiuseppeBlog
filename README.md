# giuseppe barraza — notas de matemática y sistemas

Blog personal de matemática, sistemas computacionales y código. Construido con
Astro y Motion, sin frameworks de UI ni rastreadores.

## Stack

- **Astro 3** — sitio estático, sin hidratación de islas.
- **Motion** (`motion`) — animaciones con su API vanilla: revelado de secciones,
  entrada escalonada de las filas del archivo, mensajes de la sala y el trazo
  animado del gráfico de portada.
- **Canvas nativo** — cada vista dibuja una variante distinta de la hormiga de
  Langton celda a celda, sin librerías de animación ni imágenes.
- **CSS propio** — sistema de diseño en `src/styles/global.css`. Paleta papel y
  tinta, tipografía serif para prosa y mono para metadatos.
- **Tipografías locales** — Source Serif 4 e IBM Plex Mono en `public/fonts/`
  (SIL Open Font License; ver las licencias junto a los archivos).
- **MathML nativo** — las fórmulas se escriben con `<math>` y las renderiza el
  navegador. No hay dependencias de KaTeX ni MathJax.

## Contenido

- **La hormiga de Langton** (`/blog/langtons-ant`) — autómatas celulares,
  emergencia y la autopista de período 104.
- **Algoritmos genéticos** (`/blog/genetic-algorithms`) — selección, cruce,
  mutación y convergencia sobre una función multimodal.

## Estructura

```text
/
├── public/
│   ├── fonts/                  # tipografías y licencias
│   ├── images/                 # traza de la hormiga de Langton
│   └── favicon.svg
├── src/
│   ├── components/             # Header, Footer, Plot, AntField, SmoothTabs, etc.
│   ├── data/
│   │   ├── posts.ts            # metadatos y orden de las notas
│   │   └── fields.ts           # variantes del campo de fondo
│   ├── layouts/
│   │   ├── Layout.astro        # shell global, tema, revelados
│   │   └── PostLayout.astro    # shell de artículo, migas, paginación
│   ├── pages/
│   │   ├── index.astro         # portada
│   │   ├── blog.astro          # archivo filtrable
│   │   ├── about.astro
│   │   ├── forum.astro         # sala de demostración (estado en memoria)
│   │   ├── 404.astro
│   │   └── blog/               # notas
│   └── styles/global.css
└── astro.config.mjs
```

## Comandos

| Comando           | Acción                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Instala dependencias                        |
| `npm run dev`     | Servidor de desarrollo en `localhost:3000`  |
| `npm run build`   | Genera el sitio estático en `./dist/`       |
| `npm run preview` | Previsualiza la build local                 |

## Campos de fondo

Cada vista dibuja una variante distinta de la hormiga de Langton sobre la misma
cuadrícula toroidal. Las variantes viven en `src/data/fields.ts` y se eligen con
`<AntField variant="…" />`:

| Vista                    | Variante   | Comportamiento              |
| :----------------------- | :--------- | :-------------------------- |
| Inicio                   | `classic`  | RL, dos estados             |
| Archivo                  | `mirror`   | LR, espejo de la clásica    |
| Acerca                   | `turmite`  | RLR, tres estados           |
| Discusión                | `colony`   | tres hormigas RL            |
| 404                      | `turmite2` | RLL, tres estados           |
| La hormiga de Langton    | `highway`  | RL, precalentado            |
| Algoritmos genéticos     | `duet`     | RL + LR, dos hormigas       |

Las notas usan `intensity="quiet"` para que el patrón no compita con el texto.

## Añadir una nota

1. Crea la página en `src/pages/blog/` usando `PostLayout.astro`.
2. Añade sus metadatos en `src/data/posts.ts` (título, fecha, categoría,
   resumen, duración, `lang` y la variante `field`).
3. El archivo, la portada y la paginación anterior/siguiente se actualizan solos.

## Decisiones de diseño

- Una sola columna de lectura (~43 rem), márgenes amplios y reglas de un píxel.
- Jerarquía editorial: numerales de sección (`§ 1`), metadatos en mono,
  subtítulos con serif y sin tarjetas ni sombras.
- Tema claro/oscuro persistido en `localStorage`; el tema se aplica antes del
  primer pintado para evitar destellos.
- Movimiento discreto y con respeto a `prefers-reduced-motion`. El contenido
  nunca depende de JavaScript para ser visible.
- Acerca reduce el texto a nombre, una línea de contexto y dos enlaces. El
  fondo es una variante de la hormiga de Langton en vivo sobre una cuadrícula
  toroidal: se precalienta, cambia de semilla en cada visita y se puede pausar.
  Con movimiento reducido queda como imagen fija. El resto de las vistas usa
  variantes distintas para que cada página tenga su propio patrón.
- Los patrones de interacción (enlace magnético, filtros suaves) están
  inspirados en KokonutUI y reimplementados con Motion vanilla para no añadir
  React ni Tailwind al sitio.
- Sin analítica, cookies ni peticiones a terceros.
