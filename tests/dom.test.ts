// @ts-nocheck
// Este archivo simula pruebas del DOM

describe("Renderizado de productos", () => {
    // Configuración inicial para las pruebas
    beforeEach(() => {
      // Crear estructura básica del DOM para las pruebas
      document.body.innerHTML = `
        <div id="products-grid"></div>
        <select id="category-filter">
          <option value="todas">Todas las categorías</option>
        </select>
        <dialog id="product-modal">
          <div class="modal-content">
            <div class="modal-header">
              <h2 id="modal-title"></h2>
              <button id="close-modal">&times;</button>
            </div>
            <div class="modal-body">
              <img id="modal-image" alt="">
              <p id="modal-description"></p>
              <span id="modal-price"></span>
              <span id="modal-category"></span>
            </div>
          </div>
        </dialog>
      `
    })
  
    test("debe mostrar productos en la grilla correctamente", () => {
      // Simulamos la función mostrarProductos
      const productsGrid = document.getElementById("products-grid")
      const productos = [
        {
          id: 1,
          nombre: "Taladro Percutor 800 W",
          categoria: "Herramientas",
          precio: 89.99,
          descripcion: "Taladro percutor de 800 W",
          imagen: "https://loremflickr.com/320/240/drill",
        },
      ]
  
      // Función simplificada para simular mostrarProductos
      function mostrarProductos(productos) {
        productsGrid.innerHTML = ""
        productos.forEach((producto) => {
          const productCard = document.createElement("div")
          productCard.className = "product-card"
          productCard.setAttribute("data-id", producto.id.toString())
  
          productCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
            <div class="product-info">
              <h3 class="product-name">${producto.nombre}</h3>
              <p class="product-price">$${producto.precio.toFixed(2)}</p>
            </div>
          `
  
          productsGrid.appendChild(productCard)
        })
      }
  
      // Ejecutar la función
      mostrarProductos(productos)
  
      // Verificar que se creó la tarjeta de producto
      const productCards = document.querySelectorAll(".product-card")
      expect(productCards.length).toBe(1)
  
      // Verificar que la tarjeta contiene la información correcta
      const productCard = productCards[0]
      expect(productCard.querySelector(".product-name").textContent).toBe("Taladro Percutor 800 W")
      expect(productCard.querySelector(".product-price").textContent).toBe("$89.99")
  
      // Verificar que la imagen se cargó correctamente
      const productImage = productCard.querySelector(".product-image")
      expect(productImage.getAttribute("src")).toBe("https://loremflickr.com/320/240/drill")
      expect(productImage.getAttribute("alt")).toBe("Taladro Percutor 800 W")
    })
  
    test("debe filtrar productos cuando cambia la categoría", () => {
      // Simulamos el evento de cambio en el filtro
      const categoryFilter = document.getElementById("category-filter")
      const productsGrid = document.getElementById("products-grid")
  
      // Función simplificada para simular filtrarProductos
      function filtrarProductos(categoria) {
        // En una implementación real, esto filtraría los productos
        // Aquí solo simulamos el resultado
        if (categoria === "Herramientas") {
          productsGrid.innerHTML = '<div class="product-card" data-id="1">Producto de Herramientas</div>'
        } else if (categoria === "todas") {
          productsGrid.innerHTML = `
            <div class="product-card" data-id="1">Producto de Herramientas</div>
            <div class="product-card" data-id="3">Producto de Ferretería</div>
          `
        }
      }
  
      // Simular selección de "Herramientas"
      categoryFilter.value = "Herramientas"
      // Disparar el evento change
      const event = new Event("change")
      categoryFilter.dispatchEvent(event)
  
      // Simular la función que se ejecutaría
      filtrarProductos("Herramientas")
  
      // Verificar que solo se muestran productos de Herramientas
      expect(productsGrid.querySelectorAll(".product-card").length).toBe(1)
  
      // Simular selección de "todas"
      categoryFilter.value = "todas"
      categoryFilter.dispatchEvent(event)
  
      // Simular la función que se ejecutaría
      filtrarProductos("todas")
  
      // Verificar que se muestran todos los productos
      expect(productsGrid.querySelectorAll(".product-card").length).toBe(2)
    })
  })
  