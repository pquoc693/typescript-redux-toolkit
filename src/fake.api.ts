import { Product } from "./Product/products.slice";

const validateProduct = (product: Product): Promise<Product> =>
  new Promise((resolve, rejects) => setTimeout(() => {
    if (product.title.length === 0) {
      rejects('No title')
    }
    if (product.price <= 0) {
      rejects('Price is incorrect')
    }
    resolve(product)
  }, 500))

export default validateProduct  