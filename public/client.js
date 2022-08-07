const { normalize, schema, denormalize } = require("normalizr");

const socket = io();
const elapseTime = Date.now();
const today = new Date(elapseTime);
const date = today.toLocaleDateString();
const time = new Date();
const localTime = time.toLocaleTimeString("it-IT");
const formMessage = document.querySelector("#formMessage");
const userEmailInput = document.querySelector("#userEmailInput");
const userNameInput = document.querySelector("#userNameInput");
const userLastNameInput = document.querySelector("#userLastNameInput");
const userAgeInput = document.querySelector("#userAgeInput");
const userAliasInput = document.querySelector("#userAliasInput");
const userAvatarInput = document.querySelector("#userAliasInput");
const messageInput = document.querySelector("#messageInput");
const messagePool = document.querySelector("#messagePool");
const authorSchema = new schema.Entity(
  "authors",
  {},
  { idAttribute: "mail" }
);
const commentSchema = new schema.Entity(
  "comments",
  { author: authorSchema },
  { idAttribute: "id" }
);

const chatSchema = new schema.Entity(
  "chats",
  { comments: [commentSchema] },
  { idAttribute: "id" }
);

async function renderProducts(products) {
  const response = await fetch("/plantilla.hbs");
  const plantilla = await response.text();
  const template = Handlebars.compile(plantilla);
  const html = template({ products: products, hasAny: products.length });
  document.querySelector("#productos").innerHTML = html;
}

function sendMessage() {
  const userId = userEmailInput.value;
  const userName = userNameInput.value;
  const userLastName = userLastNameInput.value;
  const userAge = userAgeInput.value;
  const userAlias = userAliasInput.value;
  const userAvatar = userAvatarInput.value;
  console.log("email: " + userId);
  const message = messageInput.value;
  const date = new Date().toLocaleString();
  //socket.emit("client:message", { email, mensaje, fecha });
  socket.emit("client:messageNormalizar", {
    author: { userId, userName, userLastName, userAge, userAlias, userAvatar },
    comment: { text: message, time: date },
  });
}

function renderMessages(messagesArray) {
  try {
    const html = messagesArray
      .map((messageInfo) => {
        return `<div>
                <strong style="color: blue;" >${messageInfo.author.userId}</strong>[
                <span style="color: brown;">${messageInfo.comment.time}</span>]:
                <em style="color: green;font-style: italic;">${messageInfo.comment.message}</em> </div>`;
      })
      .join(" ");

    messagePool.innerHTML = html;
  } catch (error) {
    console.log(`Hubo un error ${error}`);
  }
}
formMessage.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage();
  messageInput.value = "";
});

socket.on("server:message", (normalizedChat) => {
 
  console.log(typeof normalizedChat);
  const denormalizedChat = normalizr.denormalize(
    normalizedChat.result,
    chatSchema,
    normalizedChat.entities
  );
  console.log(typeof denormalizedChat);
  renderMessages(denormalizedChat.comments);
  console.log(JSON.stringify(normalizedChat).length);
  console.log(JSON.stringify(denormalizedChat).length);
  const porcentaje =
    (JSON.stringify(normalizedChat).length /
      JSON.stringify(denormalizedChat).length) *
    100;
  const porcentajeDiv = document.querySelector("#porcentajel");
  porcentajeDiv.innerHTML = percentil;

  //renderMessages(messages);
});
socket.on("server:products", (products) => {
  renderProducts(products);
});
