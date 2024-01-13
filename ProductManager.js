// Consigna
// Realizar una clase de nombre "ProductManager", el cual permitirá trabajar con múltiples productos. Este debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos (basado en entregable 1).

const fs = require("fs/promises");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  getProducts() {
    return this.products;
  }

  // Método para agregar productos
  async addProduct(product) {
    try {
      const { title, description, price, thumbnail, code, stock } = product;

      const allProducts = await this.getProducts();

      const productIndex = allProducts.productos.findIndex(
        (e) => e.code === code
      );

      if (productIndex === -1) {
        const lastId =
          allProducts.productos.length === 0
            ? 1
            : allProducts.productos[allProducts.productos.length - 1].id + 1;

        const newProduct = { id: lastId, ...product };
        allProducts.productos.push(newProduct);
        await fs.writeFile(this.path, JSON.stringify(allProducts));

        return allProducts;
      } else {
        console.log("Estás ingresando un producto con un código repetido");
        return;
      }
    } catch (error) {
      console.log(error);
      throw error; // Re-lanzar el error para manejarlo externamente si es necesario
    }
  }

  // Método para realizar la consulta al archivo JSON
  async getProducts() {
    try {
      const allProducts = await fs.readFile(this.path, "UTF-8");
      return JSON.parse(allProducts);
    } catch (error) {
      console.log(error);
    }
  }

  // Método para buscar productos por ID
  async getProductsById(id) {
    try {
      const allProducts = await this.getProducts();
      const productIndex = allProducts.productos.findIndex((e) => e.id === id);

      if (productIndex === -1) {
        return "El producto con ID " + id + " no se encuentra en la lista";
      }

      return allProducts.productos[productIndex];
    } catch (error) {
      console.log(error);
      throw error; // Re-lanzar el error para manejarlo externamente si es necesario
    }
  }

  // Método para actualizar los productos
  async updateProduct(id, updatedFields) {
    try {
      const allProducts = await this.getProducts();
      const productIndex = allProducts.productos.findIndex((e) => e.id === id);

      if (productIndex !== -1) {
        const updatedProduct = {
          ...allProducts.productos[productIndex],
          ...updatedFields,
        };
        allProducts.productos[productIndex] = updatedProduct;

        await fs.writeFile(this.path, JSON.stringify(allProducts, null, 2));
        return updatedProduct;
      } else {
        console.log(`Producto con ID ${id} no encontrado.`);
        return null;
      }
    } catch (error) {
      console.log("Error al actualizar producto:", error.message);
      throw error;
    }
  }

  //Método para eliminar productos por ID
  async deleteProduct(id) {
    try {
      const allProducts = await this.getProducts();
      const productIndex = allProducts.productos.findIndex((e) => e.id === id);

      if (productIndex === -1) {
        return "Not found";
      }

      allProducts.productos.splice(productIndex, 1);

      await fs.writeFile(this.path, JSON.stringify(allProducts));
    } catch (error) {
      console.log(error);
      throw error; // Re-lanzar el error para manejarlo externamente si es necesario
    }
  }
}

//Se crea instancia de la clase “ProductManager”
const listaDeProductos = new ProductManager("productos.json");

// Creo la función prueba. Ver dentro las consignas
async function prueba() {
  try {
    // Muestra todos los productos que existen en el archivo
    console.log(await listaDeProductos.getProducts());

    // Llama al método “addProduct” con un ejemplo
    await listaDeProductos.addProduct({
      title: "Producto Nuevo",
      description: "prueba",
      price: 500,
      thumbnail: "Sin Imagen",
      code: "abc123abc",
      stock: 25,
    });

    // Recibe un ID y tras leer el archivo, busca el producto con ID especificado
    console.log(await listaDeProductos.getProductsById(2));

    // Ejemplo de uso del método updateProduct
    const updatedProduct = await listaDeProductos.updateProduct(1, {
      price: 90000,
    });
    console.log("Producto actualizado:", updatedProduct);

    /// Eliminar con el  método "deleteProduct" un producto en particular por su id
    await listaDeProductos.deleteProduct(3);
  } catch (error) {
    console.error("Error en la prueba asincrónica:", error);
  }
}

//Ejecuta la función prueba
prueba();
