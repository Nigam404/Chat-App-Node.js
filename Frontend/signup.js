//DRIVER FUNCTION............................................................................
async function signup(event) {
  event.preventDefault();
  let obj = {
    name: document.getElementById("name").value,
    mail: document.getElementById("mail").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value,
  };
  console.log(obj);
  const responseUser = await axios.post(
    "http://localhost:3000/user/signup",
    obj
  );
  console.log(responseUser.data);
}
