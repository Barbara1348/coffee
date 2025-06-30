let userManager = new UsersManager();
const authForm = document.getElementById("authForm");

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

/**
 * Авторизация при клике на кнопку
 */
authForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const errorElem = document.getElementById("loginError");

    const userManager = new UsersManager();

    const foundUser = userManager.data.find(user =>
        user.email === email && user.password === password
    );

    if (!foundUser) {
        errorElem.innerText = "Неверное имя пользователя или пароль!";
        modal.style.display = "block";
        Modal();
    }

    else {
        userManager.setCurrentUser(foundUser.id);
        errorElem.innerText = "Вы успешно авторизовались!";
        modal.style.display = "block";
        Modal();
    }

    setTimeout(() => {
        window.location.href = "/profile/index.html";
    }, 1500);
});

/**
 * Функция закрытия модального окна
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
