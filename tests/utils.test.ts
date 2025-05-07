// @ts-nocheck
const { filtrarProductosPorCategoria, extraerCategorias } = require("../utils")

// Mock de productos para pruebas
const productosMock = [
  {
    id: 1,
    nombre: "Taladro Percutor 800 W",
    categoria: "Herramientas",
    precio: 89.99,
    descripcion: "Taladro percutor de 800 W con velocidad variable",
    imagen: "https://loremflickr.com/320/240/drill",
  },
  {
    id: 2,
    nombre: "Juego de Destornilladores",
    categoria: "Herramientas",
    precio: 14.5,
    descripcion: "Set de destornilladores punta plana y Phillips",
    imagen: "https://loremflickr.com/320/240/screwdriver",
  },
  {
    id: 3,
    nombre: "Cerradura de Seguridad",
    categoria: "Ferretería",
    precio: 27.3,
    descripcion: "Cerradura de cilindro europeo con cinco llaves",
    imagen: "https://loremflickr.com/320/240/lock",
  },
]

// Prueba 1: Filtrado de productos por categoría
describe("Filtrado de productos", () => {
  test("debe filtrar productos por categoría correctamente", () => {
    // Filtrar por categoría "Herramientas"
    const productosFiltrados = filtrarProductosPorCategoria(productosMock, "Herramientas")

    // Verificar que solo se devuelven productos de la categoría "Herramientas"
    expect(productosFiltrados.length).toBe(2)
    expect(productosFiltrados[0].categoria).toBe("Herramientas")
    expect(productosFiltrados[1].categoria).toBe("Herramientas")

    // Verificar que no hay productos de otras categorías
    const tieneOtraCategoria = productosFiltrados.some((p) => p.categoria !== "Herramientas")
    expect(tieneOtraCategoria).toBe(false)

    // Verificar que "todas" devuelve todos los productos
    const todosFiltrados = filtrarProductosPorCategoria(productosMock, "todas")
    expect(todosFiltrados.length).toBe(productosMock.length)
  })
})

// Prueba 2: Extracción de categorías únicas
describe("Extracción de categorías", () => {
  test("debe extraer categorías únicas correctamente", () => {
    // Extraer categorías
    const categorias = extraerCategorias(productosMock)

    // Verificar que se extraen todas las categorías únicas
    expect(categorias.length).toBe(2)
    expect(categorias).toContain("Herramientas")
    expect(categorias).toContain("Ferretería")

    // Verificar que no hay categorías duplicadas
    const categoriasSet = new Set(categorias)
    expect(categoriasSet.size).toBe(categorias.length)

    // Verificar con un array vacío
    expect(extraerCategorias([])).toEqual([])
  })
})
