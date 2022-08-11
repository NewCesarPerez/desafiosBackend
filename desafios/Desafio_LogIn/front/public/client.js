
const PdeBienvenida=document.querySelector('#greetingParaph')
//Bienvenida
function bienvenida(data){
    PdeBienvenida.innerHTML = `Bienvenid@ ${data}`
}
function fetchMensaje(){
    
    fetch('http://localhost:8080/user')
    .then(response => response.json())
    .then(data => bienvenida(data))
    .catch(err=>console.log(err))
}

fetchMensaje()



