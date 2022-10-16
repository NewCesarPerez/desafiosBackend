import { ProductoDao } from "../daos/index.js";

class ProductServices {
  constructor(productDao) {
    this.dao = productDao;
  }
  async getProducts() {
    const data = this.dao.readAll();
    return data;
  }

  async getProductsById(idToCompare) {
    const data = await this.dao.readById(idToCompare);
    return data;
  }
  async postProducts(products) {
    const data = await this.dao.create(products);
    return data;
  }

  async updateProductsById(productId, product) {
    await this.dao.update(productId, product);
  }

  async deleteProductById(idToCompare) {
    const data = await ProductoDao.deleteById(idToCompare);
    return data;
  }
}

export default new ProductServices(ProductoDao);
