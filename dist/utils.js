/**
 * Filtra productos por categoría
 * @param productos Array de productos
 * @param categoria Categoría a filtrar
 * @returns Array de productos filtrados
 */
export function filtrarProductosPorCategoria(productos, categoria) {
    if (categoria === "todas") {
        return productos;
    }
    return productos.filter((producto) => producto.categoria === categoria);
}
/**
 * Extrae categorías únicas de un array de productos
 * @param productos Array de productos
 * @returns Array de categorías únicas
 */
export function extraerCategorias(productos) {
    const categorias = new Set();
    productos.forEach((producto) => {
        categorias.add(producto.categoria);
    });
    return Array.from(categorias);
}
/**
 * Formatea el precio con dos decimales
 * @param precio Precio a formatear
 * @returns Precio formateado
 */
export function formatearPrecio(precio) {
    return `$${precio.toFixed(2)}`;
}
