// @ts-nocheck
const { formatearPrecio } = require("../utils")

describe("Formateo de precios", () => {
  test("debe formatear correctamente los precios", () => {
    // Probar con un número entero
    expect(formatearPrecio(100)).toBe("$100.00")

    // Probar con un número decimal
    expect(formatearPrecio(99.99)).toBe("$99.99")

    // Probar con un número que tiene un solo decimal
    expect(formatearPrecio(10.5)).toBe("$10.50")

    // Probar con cero
    expect(formatearPrecio(0)).toBe("$0.00")

    // Probar con un número negativo (aunque no debería ocurrir en precios)
    expect(formatearPrecio(-50)).toBe("$-50.00")
  })
})
