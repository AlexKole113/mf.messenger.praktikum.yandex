function all_menus() {
    const mobile_menu = document.querySelector('.chat-top-mobile-user-list');
    const user_list = document.querySelector('.user-list');
    const mobile_wrapper = document.querySelector('.mobile-wrapper');
    const mobile_closer = document.querySelector('.mobile-close');
    const chat_menu_starter = document.querySelector('.chat-top__items-menu-starter');
    const chat_menu = document.querySelector('.chat-top__items-menu');
    const attach_menu = document.querySelector('.chat-bottom__items-menu');
    // mobile menu
    if (mobile_menu) {
        mobile_menu.addEventListener("click", (e) => {
            e.preventDefault();
            user_list.classList.toggle("open");
            mobile_wrapper.classList.toggle("active");
        });
    }
    if (mobile_wrapper) {
        mobile_wrapper.addEventListener("click", function (e) {
            this.classList.remove("active");
            user_list.classList.remove("open");
            chat_menu.classList.remove("open");
            attach_menu.classList.remove("open");
            document.querySelectorAll(".z-25").forEach((elm) => {
                elm.classList.remove("z-25");
            });
        });
    }
    if (mobile_closer) {
        mobile_closer.addEventListener("click", function (e) {
            e.preventDefault();
            mobile_wrapper.classList.remove("active");
            user_list.classList.remove("open");
        });
    }
    //chat menu
    if (chat_menu_starter) {
        chat_menu_starter.addEventListener("click", function (e) {
            this.classList.toggle("z-25");
            chat_menu.classList.toggle("open");
            mobile_wrapper.classList.toggle("active");
        });
    }
}
;
function attach_menu_starter(e) {
    if (e.target.classList.contains('attach-menu-starter')) {
        document.querySelector('.chat-bottom__items--add-attach').classList.toggle("z-25");
        document.querySelector('.chat-bottom__items-menu').classList.toggle("open");
        document.querySelector('.mobile-wrapper').classList.toggle("active");
    }
}
export { attach_menu_starter };
//# sourceMappingURL=menu-functions.js.map