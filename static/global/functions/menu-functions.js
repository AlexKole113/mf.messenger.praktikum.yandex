//
// Функции для работы с некоторыми DOM элементами (меню и тд)
// пока не используются, но позднее будут подключены

function chat_menus_starter() {
    document.querySelector('.chat-top__items-menu-starter').classList.toggle("z-25");
    document.querySelector('.chat-top__items-menu').classList.toggle("open");
    document.querySelector('.mobile-wrapper').classList.toggle("active");
}

function attach_menu_starter(e) {
    if (e.target.classList.contains('attach-menu-starter')) {
        document.querySelector('.chat-bottom__items--add-attach').classList.toggle("z-25");
        document.querySelector('.chat-bottom__items-menu').classList.toggle("open");
        document.querySelector('.mobile-wrapper').classList.toggle("active");
    }
}

export { attach_menu_starter, chat_menus_starter };
//# sourceMappingURL=menu-functions.js.map