const title = document.querySelector(".titleClass");
const content = document.querySelector(".content");
const userOptions = document.getElementById("Options");
const search = document.getElementById("search");
const searchInput = document.getElementById("searchInput");
const formId = document.getElementById("formId");

// on search of userId 
formId.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const val = searchInput.value;
    if(val!= ""){
        let res = await fetch(`/lib/users/${val}`); 
        const data = await res.json();
        console.log(`${data}`)
        if(typeof data != "string"){
            createTable([data]);
        }else{
            alert("No Users found with the given id");
        }
        searchInput.value = "";
        return;
    }else{
        alert("Enter id to search");
        return;
    }
});

userOptions.addEventListener('change',optionsFunction);
// on change of options drop down
async function optionsFunction(e){
    const selectedOption = e.target.value;

    switch(selectedOption){
        case 'get':  
                    fetch('/lib/users').then(async(res) => {
                        const data = await res.json();
                        createTable(data);

                    }).catch(err =>{
                        console.log(err.message);
                    });
                    break;
        case 'post':  addUser(); //to add new user to data
                    break;
        case 'delete' : deleteOrUpdateUser("Delete"); //delete a user by userId
                    break;
        case 'update': deleteOrUpdateUser("Update"); //update username by userId
                    break;
    }
}
// delete or update starting point of accepting userId
function deleteOrUpdateUser(option){
    const form = document.createElement("form");
    form.id = "formId";
    const userId = document.createElement("input");
    userId.type ="text";
    userId.placeholder = "Enter the User Id";
    const add = document.createElement("input");
    add.type="submit";
    add.value=`${option} User`;
    form.appendChild(userId);
    form.appendChild(add);

    content.textContent = "";
    content.appendChild(form);

    form.addEventListener('submit',async(e)=>{
        e.preventDefault();
        const id = userId.value;
        if(id == ""){
            alert("User Id cannot be empty");
            return;
        }
        if(option == "Delete"){
            const user = await fetch(`/lib/users/${id}`,{
                method: option.toUpperCase() ,
                headers: {"content-type":"application/json"},
            });
            
            userId.value = "";
            let data = await user.json();
            if(typeof data == 'string')
                alert("No user found!!!");
            else
                alert(`Successful User ${option} `);
            return;
        }if(option == "Update")
            update(id);        
    });
}
// allowing user to edit username and update
async function update(id){
    const user = await fetch(`/lib/users/${id}`);
    const userData = await user.json();
    if(typeof userData == 'string')
        alert("No User found!!!");
    else{
        const form = document.createElement("form");
        form.id = "formId";
        const username = document.createElement("input");
        username.type = "text";
        username.value = userData.userName;
        const update = document.createElement("input");
        update.type="submit";
        update.value = "Update";

        form.appendChild(username);
        form.appendChild(update);
        content.textContent = "";
        content.appendChild(form);

        form.addEventListener('submit',async (e)=>{
            e.preventDefault();
            let val = username.value;
            if(val==""){
                alert("Name cannot be empty");
                return;
            }

            const rawData = JSON.stringify({userName: val});
            const user = await fetch(`/lib/users/${id}`,{
                 method: "PATCH" ,
                headers: {"content-type":"application/json"},
                body: rawData
            });      
            alert("Successfully updated!!");
        });
    }
}
// adding a new user to the data
function addUser(){
    const form = document.createElement("form");
    form.id = "formId";
    const userName = document.createElement("input");
    userName.type ="text";
    userName.placeholder = "Enter the User Name";
    const add = document.createElement("input");
    add.type="submit";
    add.value="Add User";
    form.appendChild(userName);
    form.appendChild(add);

    content.textContent = "";
    content.appendChild(form);

    form.addEventListener('submit',async(e)=>{
        e.preventDefault();
        const name = userName.value;
        if(name){
            const rawBody = JSON.stringify({
                "userName": name
            });
            console.log("Before fetch post");
            const user = await fetch('/lib/users',{
                method: "POST" ,
                headers: {"content-type":"application/json"},
                body: rawBody
             });
             console.log("after fetch post");
             console.log(`Added User ${user}`)
             alert("Successfully Added a User");
             userName.value = "";
             return;
        }
        alert("User name cannot be empty");
    });
}
// table to display all users 
function createTable(data){
    const table = document.createElement("table");
    table.classList.add("tableClass");
    const trHeader = document.createElement("tr");
    const td1Header = document.createElement("th");
    td1Header.textContent = "User_Id";
    const td2Header = document.createElement("th");
    td2Header.textContent = "User Name";

    trHeader.appendChild(td1Header);
    trHeader.appendChild(td2Header);
    table.appendChild(trHeader);

    data.forEach(element => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.textContent = element.userId;
        const td2 = document.createElement("td");
        td2.textContent = element.userName;

        tr.appendChild(td1);
        tr.appendChild(td2);
        table.appendChild(tr);
    });
    content.textContent = "";
    content.appendChild(table);
}

