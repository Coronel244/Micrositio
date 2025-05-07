# Micrositio
esta es la prueba para pasantias


Este proyecto es un micrositio de una sola página que muestra productos destacados con funcionalidades de filtrado por categoría y visualización de detalles.

## Instalación y Ejecución

1. Clona el repositorio:
\`\`\`bash
git clone <https://github.com/Coronel244/Micrositio.git>
cd <Micrositio>
\`\`\`

2. Instala las dependencias:
\`\`\`bash
npm install
\`\`\`

3. Ejecuta el proyecto:
\`\`\`bash
npm start
\`\`\`

Esto compilará el TypeScript y lanzará un servidor local en http://localhost:3000

## Pruebas Unitarias

Para ejecutar las pruebas unitarias:

\`\`\`bash
npm test
\`\`\`

Para ejecutar las pruebas en modo watch (útil durante el desarrollo):

\`\`\`bash
npm run test:watch
\`\`\`

## Decisiones Técnicas

- **Carga de datos**: Utilicé `fetch` para cargar dinámicamente los productos desde el archivo JSON.
- **Modal de detalles**: Implementé el elemento nativo `<dialog>` de HTML5 para el modal, lo que proporciona accesibilidad y funcionalidad de forma nativa.
- **Filtrado**: Extraje las categorías únicas del JSON y las utilicé para poblar el selector de filtros.
- **Diseño responsivo**: Utilicé CSS Grid con media queries para cambiar de 4 columnas a 1 columna en dispositivos móviles.
- **TypeScript**: Implementé interfaces para tipar correctamente los datos y funciones.
- **Accesibilidad**: Implementé mejoras de accesibilidad como atributos ARIA, navegación por teclado, y manejo adecuado del foco.
- **Pruebas**: Implementé pruebas unitarias con Jest para verificar la funcionalidad de filtrado y renderizado.

## Mejoras de Accesibilidad

- **Navegación por teclado**: Todos los elementos interactivos son accesibles mediante teclado.
- **Atributos ARIA**: Implementados roles y atributos ARIA para mejorar la experiencia con lectores de pantalla.
- **Manejo del foco**: El foco se gestiona correctamente al abrir y cerrar el modal.
- **Contraste de colores**: Mejorado para cumplir con los estándares WCAG AA.
- **Textos alternativos**: Todas las imágenes tienen textos alternativos descriptivos.
- **Anuncios para lectores de pantalla**: Se notifican cambios importantes en el contenido.

## Tiempo Invertido por Requisito

- **R-1 (Lista de productos)**:
  - Implementación de carga dinámica: 45m

- **R-2 (Filtro por categoría)**:
  - Extracción de categorías: 15m
  - Implementación del filtro: 15m

- **R-3 (Modal de detalle)**:
  - Diseño del modal: 30m
  - Implementación de la funcionalidad: 20m

- **R-4 (Diseño responsivo)**:
  - Media queries y ajustes: 45m

- **R-5 (Ejecución local)**: 
  - Configuración de package.json y scripts: 30m

- **Extra (Accesibilidad)**: 2h
  - Implementación de atributos ARIA: 45m
  - Navegación por teclado: 30m
  - Manejo del foco: 30m
  - Mejoras de contraste y otros ajustes: 15m

- **Extra (Pruebas unitarias)**: 1h 30m
  - Configuración de Jest: 30m
  - Implementación de pruebas: 1h


## Estructura del Proyecto

- `index.html`: Estructura HTML principal
- `styles.css`: Estilos CSS para la aplicación
- `script.ts`: Lógica TypeScript para la funcionalidad
- `producto.json`: Datos de los productos
- `utils.ts`: Funciones de utilidad
- `dist/`: Archivos JavaScript compilados
- `tests/`: Pruebas unitarias
- `package.json`: Configuración del proyecto
- `tsconfig.json`: Configuración de TypeScript
- `jest.config.js`: Configuración de Jest

## no me fije en el requisito de (Commits atómicos en una rama prueba/<tu‑nombre>.)
 - ya que realice el proyecto localmente y lo subi cuando lo finalice 😔.

