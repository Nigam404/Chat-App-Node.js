//DRIVER FUNCTION.........................................................................
async function login(event) {
  event.preventDefault();
  let obj = {
    mail: document.getElementById("mail").value,
    password: document.getElementById("password").value,
  };
  console.log("-->", obj);
  const response = await axios.post("http://localhost:3000/user/login", obj);
  console.log(response);
}
