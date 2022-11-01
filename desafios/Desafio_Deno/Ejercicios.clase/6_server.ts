import express from "npm:express";
const app=express()
const port:number=3000
app.listen(port, ()=>{
    console.log(`Server listening to port ${port}`)
})