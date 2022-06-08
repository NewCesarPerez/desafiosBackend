let id=0;
let arrayProductos=[];
const fs=require('fs')
const archivo='productos.txt'
const express=require('express')
const app=express()
const puerto=8080

class Contenedor{
    constructor(fileName){
        this.fileName=fileName;
        this.productToPush=''
        this.id=0;
        
    }
    async createFile(content){
        try{
            await fs.promises.writeFile(this.fileName,content,'utf-8')
        }catch(error){
            console.log(`Error creando el archivo: ${error}`)
        }
    }

    
    async save(producto, precio, url){
            id++
            this.productToPush={
            productID:id,
            product:producto,
            price:precio,
            thumbNail:url

        }
        try{
            arrayProductos.push(this.productToPush)
            await this.createFile(JSON.stringify(arrayProductos))
            return this.productToPush.productID
        }catch(error){
            console.log(`Saving error: ${error}`)
        }
        
    }
    async deleteAll(){
        
    try{
        await this.createFile('[]')
    }catch(error){
        console.log(`Deleting error: ${error}`)
    }
    
}
    async getById(number){
        try{
            const productsFromFile=await fs.promises.readFile(this.fileName,'utf-8')
            arrayProductos=JSON.parse(productsFromFile)
            const productById=arrayProductos.find(producto=>producto.productID===number)
            if(productById===undefined)return null
            else return productById
        }catch(error){console.log(error)}
    }
    
    async getAll(){
        try{
            let productsFromFile=await fs.promises.readFile(this.fileName,'utf-8')
            const productsFromFileParse=JSON.parse(productsFromFile)
            return productsFromFileParse
        }catch(error){
            console.log(error)}
    }
    async deleteById(number){
        try{
        const productsFromFile=await fs.promises.readFile(this.fileName,'utf-8')
        arrayProductos=JSON.parse(productsFromFile)
        arrayProductos=arrayProductos.filter(producto=>producto.productID!==number)
        console.log(JSON.stringify(arrayProductos))
        this.createFile(JSON.stringify(arrayProductos))
            }catch(error){
                console.log(`Error desde deleteById: ${error}`)
            }
        }
    }


const Productos= new Contenedor(archivo)
async function creandoProductos(){
    const saveOne=await Productos.save("Smart TV NanoCell LG", 159000, './imagenes/nanocell.jpg')
    const saveTwo=await Productos.save("Smart TV OLED LG", 190000, './imagenes/oled.jpg')
    const saveThree=await Productos.save("Smart TV UHD LG", 89000, './imagenes/uhd.jpg')
    const saveFour=await Productos.save("Samsung Buds", 15000, './imagenes/uhd.jpg')
    const saveFive=await Productos.save("Playstation 5",215000, './imagenes/uhd.jpg')
}
creandoProductos()

app.get('/', (req,res)=>{

    res.send('Desafio tres')
})

app.get('/productos', async (req,res)=>{
    const arrayProd= await Productos.getAll();
    res.status(200).send(arrayProd)
})
app.get('/productosRandom', async (req,res)=>{
    
    const randomId=()=>{
        return Math.floor(Math.random() * ((arrayProductos.length) - ((arrayProductos.length)-(arrayProductos.length-1)) + 1) + (((arrayProductos.length)-(arrayProductos.length-1))))
    }
    const productById=await Productos.getById(randomId())
    console.log(productById)
    res.status(200).send(productById)
})

app.listen(puerto, ()=>{
    console.log(`Escuchando en el puerto ${puerto}`)

})