class ProductManager {

    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products;
    }

    addProduct(title,description,price,thumbnail,code,stock){
        this.title = title
        this.description
        this.price
        this.thumbnail
        this.code
        this.stock

        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
        
        const productIndex = this.products.findIndex((e)=> e.code ===code)
        if (productIndex ===-1){
            if(this.products.length===0){
                product.id = 1
            }else {
                product.id = this.products[this.products.length -1].id + 1
            }
            this.products.push(product)
        }else{
            console.log("Error: Este código ya existe");
            return
        }


        
    }


    getProductsByiId(id){
        const productIndex = this.products.findIndex((e)=> e.id ===id)
        if (productIndex ===-1){
            
            return "Not found"
        }
        return this.products[productIndex]
    }


}

//Se crea instancia de la clase “ProductManager”
listadeProductos = new ProductManager() 

//Se llama “getProducts” , devuelve un arreglo vacío []
console.log(listadeProductos.getProducts()); // OK

//Se llama al método “addProduct” agregando un producto:
listadeProductos.addProduct("Ejemplo de producto","Descripción del producto",10,"Imagen","aa000bb",100)

//Se llama el método “getProducts”, devuelve el producto agregado recientemente
console.log(listadeProductos.getProducts()); // OK

//Se llama al método “addProduct” con el mismo producto de antes, debe arrojar un error porque el código ya existe.
listadeProductos.addProduct("Ejemplo de producto","Descripción del producto",10,"Imagen","aa000bb",100) // OK
console.log(listadeProductos.getProducts()); // OK

//Se prueba que "getProductById" devuelve un error si no encuentra el producto, en caso de encontrarlo, devuelve el producto
listadeProductos.addProduct("Ejemplo de producto","Descripción del producto",10,"Imagen","aa000cc",100) // OK
console.log("El producto con id 2 es: ",listadeProductos.getProductsByiId(2)); //OK
console.log("El producto con id 3 es: ",listadeProductos.getProductsByiId(3)); //OK