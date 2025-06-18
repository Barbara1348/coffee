const cards_no_fill = document.getElementsByClassName("heart");
const cards_fill = document.getElementsByClassName("heart_");

Array.from(cards_fill).forEach(card => card.classList.add("unactive"));

/**
 * Закрашивание сердечка при нажатии на него
 */
function heart(cardId) {
    const card = document.getElementById(`card_${cardId}`);
    const card_active = document.getElementById(`card_${cardId}_active`);

    if (!card.classList.contains("unactive")) {
        card.classList.add("unactive");
        card_active.classList.remove("unactive");
    }

    else {
        card.classList.remove("unactive");
        card_active.classList.add("unactive");
    }
}