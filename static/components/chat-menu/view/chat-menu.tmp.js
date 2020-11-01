export let componentTemplate = (function(){
    return `<div class="chat-top__items-menu-starter">
                <div class="chat-top-menu__link">
                    <i class="fas fa-chevron-down fa-2x text-light-min"></i>
                </div>
            </div>
            <div class="chat-top__items-menu bg_dark-gradient">
                <ul class="chat-top__items-menu_list" >
                    <li class="chat-top__items-menu_list-item separator-dark"><a href="/settings" data-route="/settings" class="text-light-max" ><i class="fas fa-cog"></i> Настройки</a></li>
                    <li class="chat-top__items-menu_list-item separator-dark text-light-max"><a class="text-light-max" href="#"><i class="far fa-trash-alt"></i> Удалить</a></li>
                </ul>
            </div>`;
})();