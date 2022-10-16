import { CarritoDao } from "../daos/index.js";

class CartServices {
  constructor(carritoDao){
    this.dao=carritoDao
  }

  async createCart(cart){
    const data=await CarritoDao.create(cart)
    return data
  }
  
async getAllCarts(){
  const data = await CarritoDao.readAll();
  return data;
}
async getCartsById(id){
  const data = await CarritoDao.readById(id);
  return data;
}
async updateCartById(idToRetrieve, info){
 const data= await CarritoDao.update(idToRetrieve, info)
 return data
}
async deleteCartById(id){
  const data= await CarritoDao.deleteById(id)
}

}

export default new CartServices(CarritoDao)
