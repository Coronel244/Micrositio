/**
 * Tipos para los productos y categorías
 */
interface Producto {
    id: number
    nombre: string
    categoria: string
    precio: number
    descripcion: string
    imagen: string
  }
  
  /**
   * Elementos del DOM
   */
  const productsGrid = document.getElementById("products-grid") as HTMLDivElement
  const categoryFilter = document.getElementById("category-filter") as HTMLSelectElement
  const productModal = document.getElementById("product-modal") as HTMLDialogElement
  const closeModalButton = document.getElementById("close-modal") as HTMLButtonElement
  const modalTitle = document.getElementById("modal-title") as HTMLHeadingElement
  const modalImage = document.getElementById("modal-image") as HTMLImageElement
  const modalDescription = document.getElementById("modal-description") as HTMLParagraphElement
  const modalPrice = document.getElementById("modal-price") as HTMLSpanElement
  const modalCategory = document.getElementById("modal-category") as HTMLSpanElement
  
  /**
   * Estado de la aplicación
   */
  let productos: Producto[] = []
  let categorias: string[] = []
  let lastFocusedElement: HTMLElement | null = null
  
  /**
   * Carga los productos desde el archivo JSON
   */
  async function cargarProductos(): Promise<void> {
    try {
      const response = await fetch("producto.json")
      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo de productos")
      }
  
      const data = await response.json()
      productos = data.productos
  
      // Extraer categorías únicas
      const categoriasSet = new Set<string>()
      productos.forEach((producto) => categoriasSet.add(producto.categoria))
      categorias = Array.from(categoriasSet)
  
      // Llenar el selector de categorías
      llenarCategorias()
  
      // Mostrar todos los productos inicialmente
      mostrarProductos(productos)
    } catch (error) {
      console.error("Error al cargar los productos:", error)
      productsGrid.innerHTML =
        '<p class="error" role="alert">Error al cargar los productos. Por favor, intenta de nuevo más tarde.</p>'
    }
  }
  
  /**
   * Llena el selector de categorías con las categorías disponibles
   */
  function llenarCategorias(): void {
    categorias.forEach((categoria) => {
      const option = document.createElement("option")
      option.value = categoria
      option.textContent = categoria
      categoryFilter.appendChild(option)
    })
  }
  
  /**
   * Muestra los productos en la grilla
   */
  function mostrarProductos(productosAMostrar: Producto[]): void {
    productsGrid.innerHTML = ""
  
    if (productosAMostrar.length === 0) {
      productsGrid.innerHTML = '<p class="error" role="alert">No se encontraron productos para esta categoría.</p>'
      return
    }
  
    productosAMostrar.forEach((producto) => {
      const productCard = document.createElement("div")
      productCard.className = "product-card"
      productCard.setAttribute("data-id", producto.id.toString())
      productCard.setAttribute("tabindex", "0") // Hacerlo focusable con teclado
      productCard.setAttribute("role", "button")
      productCard.setAttribute("aria-label", `Ver detalles de ${producto.nombre}`)
  
      productCard.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image" aria-describedby="desc-${producto.id}">
        <div class="product-info">
          <h3 class="product-name" id="desc-${producto.id}">${producto.nombre}</h3>
          <p class="product-price">$${producto.precio.toFixed(2)}</p>
          <span class="product-category">${producto.categoria}</span>
        </div>
      `
  
      // Agregar evento de clic para mostrar el modal
      productCard.addEventListener("click", () => mostrarModal(producto))
  
      // Agregar evento de teclado para accesibilidad
      productCard.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          mostrarModal(producto)
        }
      })
  
      productsGrid.appendChild(productCard)
    })
  }
  
  /**
   * Filtra los productos por categoría
   */
  function filtrarProductos(categoria: string): void {
    if (categoria === "todas") {
      mostrarProductos(productos)
    } else {
      const productosFiltrados = productos.filter((producto) => producto.categoria === categoria)
      mostrarProductos(productosFiltrados)
    }
  
    // Anunciar para lectores de pantalla
    const mensaje =
      categoria === "todas" ? "Mostrando todos los productos" : `Mostrando productos de la categoría ${categoria}`
  
    anunciarCambio(mensaje)
  }
  
  /**
   * Anuncia cambios para lectores de pantalla
   */
  function anunciarCambio(mensaje: string): void {
    const anuncio = document.createElement("div")
    anuncio.setAttribute("role", "status")
    anuncio.setAttribute("aria-live", "polite")
    anuncio.className = "sr-only"
    anuncio.textContent = mensaje
  
    document.body.appendChild(anuncio)
  
    // Eliminar después de que se haya leído
    setTimeout(() => {
      document.body.removeChild(anuncio)
    }, 1000)
  }
  
  /**
   * Muestra el modal con los detalles del producto
   */
  function mostrarModal(producto: Producto): void {
    // Guardar el elemento que tenía el foco antes de abrir el modal
    lastFocusedElement = document.activeElement as HTMLElement
  
    modalTitle.textContent = producto.nombre
    modalImage.src = producto.imagen
    modalImage.alt = producto.nombre
    modalDescription.textContent = producto.descripcion
    modalPrice.textContent = `$${producto.precio.toFixed(2)}`
    modalCategory.textContent = producto.categoria
  
    productModal.showModal()
  
    // Enfocar el botón de cerrar para accesibilidad
    closeModalButton.focus()
  }
  
  /**
   * Cierra el modal
   */
  function cerrarModal(): void {
    productModal.close()
  
    // Devolver el foco al elemento que lo tenía antes de abrir el modal
    if (lastFocusedElement) {
      lastFocusedElement.focus()
    }
  }
  
  /**
   * Inicialización y eventos
   */
  document.addEventListener("DOMContentLoaded", () => {
    // Cargar productos
    cargarProductos()
  
    // Evento para filtrar productos
    categoryFilter.addEventListener("change", (e) => {
      const target = e.target as HTMLSelectElement
      filtrarProductos(target.value)
    })
  
    // Evento para cerrar el modal
    closeModalButton.addEventListener("click", cerrarModal)
  
    // Cerrar el modal con la tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && productModal.open) {
        cerrarModal()
      }
    })
  
    // Cerrar el modal al hacer clic fuera de él
    productModal.addEventListener("click", (e) => {
      const rect = productModal.getBoundingClientRect()
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      if (!isInDialog) {
        cerrarModal()
      }
    })
  
    // Atrapar el foco dentro del modal cuando está abierto
    productModal.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        const focusableElements = productModal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
  
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
  
        // Si se presiona Shift+Tab y el foco está en el primer elemento, mover al último
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
        // Si se presiona Tab y el foco está en el último elemento, mover al primero
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    })
  })
  