const modal = document.getElementById("myModal");
const modalContent = document.querySelector(".modal_content");
const closeBtn = document.querySelector(".close");
const span = document.getElementsByClassName("close")[0];

/**
 * Универсальная функция для показа сообщений
 * @param {string} message - Текст сообщения
 * @param {string} [type='info'] - Тип сообщения (info, success, error)
 */
function showAlert(message, type = 'info') {
    // Создаем временное модальное окно для сообщений
    const alertModal = document.createElement('div');
    alertModal.className = 'modal';
    alertModal.id = 'alertModal';
    alertModal.innerHTML = `
        <div class="modal_content flex">
            <p style="color: ${type === 'error' ? 'black' : type === 'success' ? 'black' : 'black'}">
                ${message}
            </p>
            <span class="close">&times;</span>
        </div>
    `;
    document.body.appendChild(alertModal);

    // Показываем модальное окно
    alertModal.style.display = "block";

    // Обработчик закрытия
    const closeAlert = () => alertModal.style.display = "none";

    alertModal.querySelector('.close').onclick = closeAlert;
    window.onclick = function (event) {
        if (event.target === alertModal) closeAlert();
    };

    // Автозакрытие для информационных сообщений
    if (type !== 'error') {
        setTimeout(closeAlert, 3000);
    }
}

/**
 * Функция для отображения модального окна с формой
 */
function showModal(title, content, isEditMode = false) {
    modalContent.innerHTML = `
        <span class="close flex_">&times;</span>
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
    modal.style.display = "none";
}

// Обработчики закрытия модального окна
if (closeBtn) closeBtn.onclick = closeModal;
if (span) span.onclick = closeModal;

window.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeModal();
    }
});

// Функция редактирования профиля
function editProfile() {
    try {
        const userManager = new UsersManager();
        const currentUser = userManager.readCurrentUser();

        if (!currentUser) {
            showAlert("Пользователь не найден", "error");
            return;
        }

        const editForm = `
        <form id="editForm">
            <input type="text" value="${currentUser.surname}" id="editSurname" placeholder="Фамилия">
            <input type="text" value="${currentUser.name}" id="editName" placeholder="Имя">
            <input type="text" value="${currentUser.pathronymic}" id="editPathronymic" placeholder="Отчество">
            <input type="number" value="${currentUser.phone}" id="editPhone" placeholder="Телефон">
            <input type="email" value="${currentUser.email}" id="editEmail" placeholder="Email">
            <input type="date" value="${currentUser.birth}" id="editBirth" placeholder="Дата рождения">
            <input type="text" value="${currentUser.city}" id="editCity" placeholder="Город">
            <input type="password" id="editPassword" placeholder="Новый пароль">
            <input type="password" id="editPassword_confirm" placeholder="Подтверждение пароля">
        </form>
        `;

        showModal("Редактирование профиля", editForm, true);
    } catch (error) {
        showAlert(error.message, "error");
    }
}

// Настройка формы редактирования
function setupEditForm() {
    const confirmBtn = document.getElementById("confirmBtn");
    if (!confirmBtn) return;

    confirmBtn.addEventListener("click", function () {
        try {
            const userManager = new UsersManager();
            const currentUser = userManager.readCurrentUser();

            if (!currentUser) {
                throw new Error("Пользователь не найден");
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

            // Проверяем пароль
            if (newPassword && newPassword !== newPasswordConfirm) {
                throw new Error("Пароли не совпадают");
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

            showAlert("Данные успешно обновлены!", "success");
            closeModal();
        } catch (error) {
            showAlert(error.message, "error");
        }
    });
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
    // Изменяем обработчик для кнопки "Изменить"
    const editButton = document.querySelector('[onclick="edit()"]');
    if (editButton) {
        editButton.type = "button";
        editButton.onclick = function (e) {
            e.preventDefault();
            editProfile();
        };
    }
});