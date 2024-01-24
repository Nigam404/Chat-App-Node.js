const Token = localStorage.getItem("ChatToken");

//CREATE ELEMENT FUNCTION(MESSAGE)..........................................................
function createMsgElement(obj) {
  let parent = document.getElementById("content");
  let child = document.createElement("p");
  child.innerText = obj.username + " : " + obj.message;
  parent.appendChild(child);
}


//CREATE GROUP ELEMENT......................................................................
async function createGroup(group) {
  //creating group element
  let parentUL = document.getElementById("groups");
  let list = document.createElement("li");
  let btn = document.createElement("button");
  btn.innerText = group.name;
  list.appendChild(btn);
  parentUL.appendChild(list);

  //group name button click method.
  btn.onclick = async () => {
    alert("Group Name: " + group.name + " id:" + group.id);

    //putting group header
    const groupHeader = document.getElementById("group-header");
    groupHeader.innerText = "";
    groupHeader.innerText = "Group-" + group.name;

    //getting members associated with group
    const members = await axios.get(
      `http://localhost:3000/group/getmembers/${group.id}`
    );

    //making hidden thing(send message and member feature) visible
    const member_div = document.getElementById("members");
    member_div.style.visibility = "visible";
    document.getElementById("footer").style.visibility = "visible";

    //resetting member section
    const added_member = document.getElementById("addedmember");
    added_member.innerText = "";

    //if no member found
    if (members.data.length == 0) {
      added_member.innerText = "No member joined yet...";
    }
    //if member found
    else {
      let UL = document.createElement("ul");
      members.data.forEach((e) => {
        let list = document.createElement("li");
        list.innerText = e.name;
        list.style.color = "#00FF00";
        UL.appendChild(list);
      });
      added_member.appendChild(UL);
    }

    //getting all member and putting in select area
    const users = await axios.get("http://localhost:3000/user/getalluser");
    const selectArea = document.getElementById("member");
    selectArea.innerText = ""; //resetting field

    users.data.forEach((user) => {
      let option = document.createElement("option");
      option.value = user.id;
      option.innerText = user.name;
      selectArea.appendChild(option);
    });

    //add-member button click
    document.getElementById("addmember").onclick = async () => {
      let obj = {
        memberid: document.getElementById("member").value,
      };
      await axios.post(
        `http://localhost:3000/group/addmember/${group.id}`,
        obj
      );
      alert("user added to group!");
    };

    //send msg button click event
    document.getElementById("sendmsg").onclick = async () => {
      let obj = {
        message: document.getElementById("msg").value,
      };
      const msg = await axios.post(
        `http://localhost:3000/message/save/${group.id}`,
        obj,
        {
          headers: { Authorization: Token },
        }
      );
      createMsgElement(msg.data);
    };

    //fetching all messages in the group
    setInterval(async () => {
      const messages = await axios.get(
        `http://localhost:3000/message/getmsg/${group.id}`
      );
      //resetting message div
      document.getElementById("content").innerText = "";
      //creating UI element for message
      messages.data.forEach((element) => {
        createMsgElement(element);
      });
    }, 1000);
  };
}

//CREATE GROUP BUTTON CLICK................................................................
document.getElementById("creategroup").onclick = async () => {
  const groupname = prompt("Enter Group Name:");
  let obj = {
    name: groupname,
  };
  const group = await axios.post("http://localhost:3000/group/create", obj, {
    headers: { Authorization: Token },
  });
  //creating group on UI
  createGroup(group.data);
};

//DOM RELOAD FUNCTION.......................................................................
document.addEventListener("DOMContentLoaded", async () => {
  //putting username on screen
  const CurrUser = await axios.get(
    "http://localhost:3000/user/get-current-user",
    { headers: { Authorization: Token } }
  );
  document.getElementById("heading").innerText =
    "* Welcome " + CurrUser.data.name + " *";

  //fetching all groups for current user
  const groups = await axios.get("http://localhost:3000/group/getgroup", {
    headers: { Authorization: Token },
  });

  //calling create group element function
  groups.data.forEach((element) => {
    createGroup(element);
  });

  //putting hint message on screen
  let heading = document.getElementById("group-header");
  heading.innerText = "Open any Group to start messaging...";
});

