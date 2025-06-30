//отображение данных из локального хранилища в поля в профиле

let usersManager = new UsersManager();

const stateUser = usersManager.readCurrentUser();
console.log(stateUser);

document.getElementById("surname").value = stateUser.surname || "";
document.getElementById("name").value = stateUser.name || "";
document.getElementById("pathronymic").value = stateUser.pathronymic || "";
document.getElementById("phone").value = stateUser.phone || "";
document.getElementById("email").value = stateUser.email || "";
document.getElementById("birth").value = stateUser.birth || "";
document.getElementById("city").value = stateUser.city || "";
