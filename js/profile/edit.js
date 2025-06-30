const modal = document.getElementById("myModal");
const modalContent = document.querySelector(".modal_content");
const closeBtn = document.querySelector(".close");
const span = document.getElementsByClassName("close")[0];


/**
 * Функция для отображения модального окна
 * @param {string} title 
 * @param {string} content 
 * @param {boolean} isEditMode 
 */
function showModal(title, content, isEditMode = false) {
    modalContent.innerHTML = `
        <h2>${title}</h2>
        ${content}
        <button id="confirmBtn">Подтвердить</button>
    `;
    modal.style.display = "block";
    
    if (isEditMode) {
        setupEditForm();
    }
}

/**
 * Функция для закрытия модального окна
 */
function closeModal() {
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



// Обработчики закрытия модального окна
closeBtn.onclick = closeModal;
window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
};

// Функция редактирования профиля
function editProfile() {
    const userManager = new UsersManager();
    const currentUser = userManager.readCurrentUser();

    const editForm = `
    <form id="editForm">
    <input type="text" value="${currentUser.surname}" id="editSurname" placeholder="Фамилия">
    <input type="text" value="${currentUser.name}" id="editName" placeholder="Имя">
    <input type="text" value="${currentUser.pathronymic}" id="editPathronymic" placeholder="Отчество">
    <input type="tel" value="${currentUser.phone}" id="editPhone" placeholder="Телефон">
    <input type="email" value="${currentUser.email}" id="editEmail" placeholder="Email">
    <input type="date" value="${currentUser.birth}" id="editBirth" placeholder="Дата рождения">
    <input type="text" value="${currentUser.city}" id="editCity" placeholder="Город">
    <input type="password" id="editPassword" placeholder="Новый пароль (оставьте пустым, чтобы не менять)">
    <input type="password" id="editPassword_confirm" placeholder="Подтверждение пароля (оставьте пустым, чтобы не менять)">
</form>
    `;

    showModal("Редактирование профиля", editForm, true);
}

// Настройка формы редактирования
function setupEditForm() {
    document.getElementById("confirmBtn").addEventListener("click", function() {
        const userManager = new UsersManager();
        const currentUser = userManager.readCurrentUser();
        
        if (!currentUser) {
            alert("Пользователь не найден");
            return;
        }
        
        // Получаем новые значения
        const newSurname = document.getElementById("editSurname").value;
        const newName = document.getElementById("editName").value;
        const newPathronymic = document.getElementById("editPathronymic").value;
        const newPhone = document.getElementById("editPhone").value;
        const newEmail = document.getElementById("editEmail").value;
        const newBirth = document.getElementById("editBirth").value;
        const newCity = document.getElementById("editCity").value;
        const newPassword = document.getElementById("editPassword").value;
        const newPasswordConfirm = document.getElementById("editPassword_confirm").value;
        
        // Проверяем пароль, если он был изменён
        if (newPassword && newPassword !== newPasswordConfirm) {
            alert("Пароли не совпадают");
            return;
        }
        
        // Обновляем данные пользователя
        const updatedUser = {
            ...currentUser,
            surname: newSurname,
            name: newName,
            pathronymic: newPathronymic,
            phone: newPhone,
            email: newEmail,
            birth: newBirth,
            city: newCity
        };
        
        // Если введен новый пароль, обновляем его
        if (newPassword) {
            updatedUser.password = newPassword;
        }
        
        // Сохраняем изменения
        userManager.edit(currentUser.id, updatedUser);
        userManager.save();
        
        // Обновляем данные на странице
        document.getElementById("surname").value = newSurname;
        document.getElementById("name").value = newName;
        document.getElementById("pathronymic").value = newPathronymic;
        document.getElementById("phone").value = newPhone;
        document.getElementById("email").value = newEmail;
        document.getElementById("birth").value = newBirth;
        document.getElementById("city").value = newCity;

        alert("Данные успешно обновлены!");
        closeModal();
    });
}

// Назначаем обработчик на кнопку редактирования
document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.querySelector('[onclick="edit()"]');
    if (editButton) {
        editButton.onclick = function(e) {
            e.preventDefault();
            editProfile();
        };
    }
});