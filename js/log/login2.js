let userManager = new UsersManager();
const registForm = document.getElementById("registForm");

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

/**
 * Форма регистрации
 */
registForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const surname = document.getElementById("surname").value.trim();
    const name = document.getElementById("name").value.trim();
    const pathronymic = "";
    const phone = "";
    const email = document.getElementById("email").value.trim();
    const birth = "";
    const city = "";
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("password_confirm").value;
    const checkbox = document.getElementById("checkbox");
    const errorElem = document.getElementById("loginError");

    if (password !== confirmPassword) {
        errorElem.innerText = "Неверное имя пользователя или пароль!";
        modal.style.display = "block";
        Modal();
        return;
    }

    if (userManager.data.find(user => user.email === email)) {
        errorElem.innerText = "Такое имя пользователя уже занято!";
        modal.style.display = "block";
        Modal();
        return;
    }

    if (!checkbox.checked) {
        errorElem.innerText = "Примите соглашение!";
        modal.style.display = "block";
        Modal();
        return;
    }

    else {
        errorElem.innerText = "Вы успешно зарегистрировались!";
        modal.style.display = "block";
        Modal();
    }

    setTimeout(() => {
        let data = userManager.add(
            surname,
            name,
            pathronymic,
            phone,
            email,
            birth,
            city,
            password,
        );
        userManager.setCurrentUser(data.id);
        window.location.href = "/profile/";
    }, 1500);

});

/**
 * Закрытие модального окна
 */
function Modal() {

    // Закрываем модальное окно при клике на крестик
    span.onclick = function () {
        modal.style.display = "none";
    }

    // Закрываем модальное окно при клике вне его области
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}