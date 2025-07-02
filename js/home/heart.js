const cards_no_fill = document.getElementsByClassName("heart");
const cards_fill = document.getElementsByClassName("heart_");

Array.from(cards_fill).forEach(card => card.classList.add("unactive"));

document.addEventListener('DOMContentLoaded', function() {
        restoreHeartsState();
        
        // Инициализация всех сердечек как неактивных
        Array.from(document.getElementsByClassName("heart_")).forEach(card => {
            card.classList.add("unactive");
        });
    });

/**
 * Закрашивание сердечка при нажатии на него
 */
function heart(cardId) {
    const card = document.getElementById(`card_${cardId}`);
    const card_active = document.getElementById(`card_${cardId}_active`);
    const userManager = new UsersManager();
    const currentUser = userManager.readCurrentUser();

    if (!currentUser) {
        alert('Пожалуйста, войдите в систему, чтобы добавлять в избранное');
        return;
    }

    if (!card.classList.contains("unactive")) {
        // Активируем сердечко
        card.classList.add("unactive");
        card_active.classList.remove("unactive");
        
        // Добавляем в избранное, если еще нет
        if (!currentUser.IDheart.includes(cardId)) {
            currentUser.IDheart.push(cardId);
            userManager.edit(currentUser.id, currentUser);
            userManager.save();
        }
    } else {
        // Деактивируем сердечко
        card.classList.remove("unactive");
        card_active.classList.add("unactive");
        
        // Удаляем из избранного
        const index = currentUser.IDheart.indexOf(cardId);
        if (index > -1) {
            currentUser.IDheart.splice(index, 1);
            userManager.edit(currentUser.id, currentUser);
            userManager.save();

        }
    }
}

/**
 * Восстановление состояния сердечек при загрузке страницы
 */
function restoreHeartsState() {
    const userManager = new UsersManager();
    const currentUser = userManager.readCurrentUser();
    
    if (currentUser && currentUser.IDheart) {
        currentUser.IDheart.forEach(cardId => {
            const card = document.getElementById(`card_${cardId}`);
            const card_active = document.getElementById(`card_${cardId}_active`);
            
            if (card && card_active) {
                card.classList.add("unactive");
                card_active.classList.remove("unactive");
            }
        });
    }
}

// Вызываем при загрузке страницы
document.addEventListener('DOMContentLoaded', restoreHeartsState);


