const Token = localStorage.getItem("ChatToken");
//SEND BUTTON CLICK FUNCTION...........................................................................
async function sendMessage() {
  let obj = {
    message: document.getElementById("msg").value,
  };
  const res = await axios.post("http://localhost:3000/message/save", obj, {
    headers: { Authorization: Token },
  });
  createMsgElement(res.data);
  console.log(res.data);
}

//CREATE ELEMENT FUNCTION(MESSAGE)..........................................................
function createMsgElement(obj) {
  let parent = document.getElementById("messages");
  let child = document.createElement("p");
  child.innerText = obj.userName + " : " + obj.message;
  parent.appendChild(child);
}
//CREATE ELEMENT FUNCTION(USER)..........................................................
function createUserElement(obj) {
  let parent = document.getElementById("messages");
  let child = document.createElement("p");
  child.innerText = obj.name + " connected";
  parent.appendChild(child);
}

//DOM RELOAD FUNCTION.......................................................................
document.addEventListener("DOMContentLoaded", async () => {
  //fetching all user
  const user = await axios.get("http://localhost:3000/user/getalluser");
  //creating UI element for user
  user.data.forEach((element) => {
    createUserElement(element);
  });

  //fetching all messages
  const messages = await axios.get("http://localhost:3000/message/getmsg");
  //creating UI element for message
  messages.data.forEach((element) => {
    createMsgElement(element);
  });
});

//MAKING CHAT APP REALTIME-CONTINUOUSLY CALLING BACKEND API TO GET NEW MESSAGES....................
setInterval(async () => {
  document.getElementById("messages").innerHTML = "";
  //fetching all messages
  const messages = await axios.get("http://localhost:3000/message/getmsg");
  //creating UI element for message
  messages.data.forEach((element) => {
    createMsgElement(element);
  });
}, 10000);
