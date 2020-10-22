export let chatMenu = (function(){
    return `<div class="chat-top__items-menu-starter">
                <a href="#" class="chat-top-menu__link">
                    <i class="fas fa-chevron-down fa-2x text-light-min"></i>
                </a>
            </div>
            <div class="chat-top__items-menu bg_dark-gradient">
                <ul class="chat-top__items-menu_list" >
                    <li class="chat-top__items-menu_list-item separator-dark text-light-max"><i class="fas fa-pen"></i> Переименовать</li>
                    <li class="chat-top__items-menu_list-item separator-dark text-light-max"><i class="far fa-trash-alt"></i> Удалить</li>
                </ul>
            </div>`;
})();