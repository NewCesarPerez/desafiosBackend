import {Application, Router, Context, helpers} from "https://deno.land/x/oak/mod.ts"

const app= new Application()
const router= new Router()
let frase;
router.get("/", (ctx:Context)=>{
    ctx.response.body="Hola Mundo"
})
router.get("/hola",  (ctx:Context)=>{
    frase =  helpers.getQuery(ctx).frase 
    console.log( `Frase: ${frase}`)
    const fraseADevolver = frase.split(" ").reverse().join(" ")
    ctx.response.status=200
    ctx.response.body=`
    <!DOCTYPE html>
  <html>
    <head><title>Hello oak!</title><head>
    <body>
      <h1 style="color: blue;">${fraseADevolver}</h1>
    </body>
  </html>
    `
})
app.use(router.routes());
app.use(router.allowedMethods())

app.listen({port:3000})
console.log("Server listening http:127.0.0.1:3000")