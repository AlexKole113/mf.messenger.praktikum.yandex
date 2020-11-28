export let componentTemplate = (function(){
    return `<div class="chat-top__items-menu-starter">
                <div class="chat-top-menu__link">
                    <i class="fas fa-chevron-down fa-2x text-light-min"></i>
                </div>
            </div>
            <div class="chat-top__items-menu bg_dark-gradient">
                <ul class="chat-top__items-menu_list" >
                    <li class="chat-top__items-menu_list-item separator-dark"><a href="/settings" data-route="/settings" class="text-light-max" ><i class="fas fa-cog"></i>Настройки профиля <span id="loggin"></span></a></li>
                    <li class="chat-top__items-menu_list-item separator-dark"><a href="" data-target="modal" data-modal="#addchat" class="text-light-max" ><i class="fas fa-plus"></i>Новый чат</a></li>
                    <li class="chat-top__items-menu_list-item separator-dark text-light-max"><a href="/auth"  data-route="/auth" class="text-light-max logout-link" ><i class="fas fa-door-open"></i> Выход </a></li>
                </ul>
            </div>`;
})();