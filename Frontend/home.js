const Token = localStorage.getItem("ChatToken");
//DRIVER FUNCTION...........................................................................
async function sendMessage() {
  let obj = {
    message: document.getElementById("msg").value,
  };
  const res = await axios.post("http://localhost:3000/message/save", obj, {
    headers: { Authorization: Token },
  });
  console.log(res.data);
}
