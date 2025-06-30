/**
 * Функция выхода из профиля
 */
function logOut() {
    const usersManager = new UsersManager();
    usersManager.logout();
    window.location.href = "/log/authorization/index.html";
}

/**
 * Обработчик события на кнопку выхода
 */
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logOut');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            logOut();
        });
    }
});