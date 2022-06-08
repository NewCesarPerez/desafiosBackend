//let id=0;

const fs=require('fs')
const archivo='productos.txt'
const express=require('express')
const app=express()
const puerto=8080

class Contenedor{
    static id=0
    constructor(fileName){
        this.fileName=fileName;
        this.productToPush=''
        //this.id=0;
        this.arrayProductos=[]
        
    }
    async createFile(content){
        try{
            await fs.promises.writeFile(this.fileName,content,'utf-8')
        }catch(error){
            console.log(`Error creando el archivo: ${error}`)
        }
    }

    
    async save(product){
        
            Contenedor.id++
            this.productToPush=product
            this.productToPush.id=Contenedor.id
        try{
            this.arrayProductos.push(this.productToPush)
            await this.createFile(JSON.stringify(this.arrayProductos,null,2))
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
            this.arrayProductos=JSON.parse(productsFromFile)
            const productById=this.arrayProductos.find(producto=>producto.id===number)
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
        this.arrayProductos=JSON.parse(productsFromFile)
        this.arrayProductos=this.arrayProductos.filter(producto=>producto.id!==number)
        console.log(JSON.stringify(this.arrayProductos))
        this.createFile(JSON.stringify(this.arrayProductos,null,2))
            }catch(error){
                console.log(`Error desde deleteById: ${error}`)
            }
        }
    }


const Productos= new Contenedor(archivo)
async function creandoProductos(){
    const saveOne=await Productos.save({producto:"Smart TV NanoCell LG", precio:159000, ruta:'./imagenes/nanocell.jpg'})
    const saveTwo=await Productos.save({producto:"Smart TV OLED LG", precio:190000, ruta:'./imagenes/oled.jpg'})
    const saveThree=await Productos.save({producto:"Smart TV UHD LG", precio:89000, ruta:'./imagenes/uhd.jpg'})
    const saveFour=await Productos.save({producto:"Samsung Buds", precio:15000, ruta:'./imagenes/uhd.jpg'})
    const saveFive=await Productos.save({producto:"Playstation 5",precio:215000, ruta:'./imagenes/uhd.jpg'})
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
        return Math.floor(Math.random() * ((Productos.arrayProductos.length) - ((Productos.arrayProductos.length)-(Productos.arrayProductos.length-1)) + 1) + (((Productos.arrayProductos.length)-(Productos.arrayProductos.length-1))))
    }
    const productById=await Productos.getById(randomId())
    res.status(200).send(productById)
})

app.listen(puerto, ()=>{
    console.log(`Escuchando en el puerto ${puerto}`)

})