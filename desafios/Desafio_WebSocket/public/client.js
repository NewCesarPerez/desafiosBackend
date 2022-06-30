const socket = io()
const elapseTime = Date.now()
const today = new Date(elapseTime)
const date= today.toLocaleDateString()
const time = new Date()
const localTime=time.toLocaleTimeString('it-IT')

const formMessage = document.querySelector('#formMessage')
const userEmailInput = document.querySelector('#userEmailInput')
const messageInput = document.querySelector('#messageInput')
const messagePool=document.querySelector('#messagePool')


async function renderProducts(products) {
    const response = await fetch('/plantilla.hbs')
    const plantilla = await response.text()
    const template = Handlebars.compile(plantilla)
    const html = template({products:products, hasAny:products.length})
    document.querySelector('#productos').innerHTML = html
}

function sendMessage(){
    const userEmail=userEmailInput.value
    const userMessage=messageInput.value
    const mssHour = localTime
    socket.emit('client:message',{userEmail, userMessage, mssHour})
}


function renderMessages(messagesArray){
    try {
        const html = messagesArray.map(messageInfo => {
            return(`<div>
                <strong style="color: blue;" >${messageInfo.userEmail}</strong>[
                <span style="color: brown;">${date}, ${localTime}</span>]:
                <em style="color: green;font-style: italic;">${messageInfo.userMessage}</em> </div>`)
        }).join(" ");

        messagePool.innerHTML = html
    } catch(error) {
        console.log(`Hubo un error ${error}`)
    }
}
formMessage.addEventListener('submit', event => {
    event.preventDefault()
    sendMessage()
    messageInput.value = ""
})

socket.on('server:message', renderMessages)
socket.on('server:products', products => {
    renderProducts(products)
})