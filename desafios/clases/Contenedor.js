class Contenedor{
    constructor(fileName){
        this.fileName=fileName;
        this.productToPush=''
        this.id=0;
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
        
            id++
            this.productToPush=product
            this.productToPush.id=id
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

    module.export=Contenedor