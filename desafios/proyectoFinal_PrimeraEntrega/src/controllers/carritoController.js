let carritos=[

    {
        id:'',
        timeStamp:Date.now(),
        productos:[
            {id:''}
        ]
    }
]

const postCarrito=(req,res)=>{
    const productstoPush=[]
    carritos.push({id:'',timeStamp:Date.now(),productstoPush})
    res.send(carritos[carritos.length-1].id)

}
const getCarrito=(req,res)=>{
    const idToCompare=Number(req.params.id)
    const carritoToRender=carritos.find(cart=>cart.id===idToCompare)
    if(!carritoToRender)res.json({error:'Carrito no encontrado'})
    else {
        res.json(carritoToRender.productos)
    }

}

const deleteCarritoById=(req,res)=>{
    const idToCompare=Number(req.params.id)
    const cartToErase=carritos.find(cart=>cart.id===idToCompare)
    if(!cartToErase)res.json({error:'Carrito no encontrado'})
    else {
        carritos=carritos.filter(prod=>prod.id!==idToCompare)
        res.json('Carrito eliminado')
    }
}

const deleteProductById=(req,res)=>{
    const cartIdToCompare=Number(req.params.id)
    const productIdToCompare=Number(req.params.id_prod)
    const cartToCompare=carritos.find(cart=>cart.id===cartIdToCompare)
    if(!cartToCompare)res.json({error:'Carrito no encontrado'})
    else {
        if(!productIdToCompare)res.json({error:'Producto no encontrado'})
        else{
            cartToCompare=cartToCompare.filter(prod=>prod.id!==productIdToCompare)
            carritos=carritos.filter(cart=>cart.id!==cartIdToCompare)
            carritos.push(cartToCompare)
            res.sendStatus(200)
        } 
    }
}

module.exports = {
    postCarrito,
    deleteCarritoById,
    getCarrito,
    deleteProductById
    };