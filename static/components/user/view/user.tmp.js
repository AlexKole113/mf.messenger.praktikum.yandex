export let componentTemplate = (function(){
    return `<div class="user-list__item separator-dark {{active}}">
                <div style="background-image: url({{avatar}})" class="user-list__item-avatar bg_light-min border_light-max no-avatar">
                    <a href="" data-user_id="{{id}}" class="user-list__item-avatar-link"></a>
                </div>
                <div class="user-list__item-info">
                    <p class="user-list__item-info-name"><a href="" data-user_id="{{id}}"  class="user-list__item-info-name-link text-light-max">{{login}}</a> {{{add_remove_chat}}} </p>
                    <p class="user-list__item-info-last-msg"><a href="" data-user_id="{{id}}" class="user-list__item-info-last-msg-link text-light-min">{{excerpt}}</a></p>
                </div>
                <div class="user-list__item-actions">
                    <span class="user-list__item-actions-time text-light-max">{{time}}</span>
                    <span class="user-list__item-actions-newmsg"><a href="" data-user_id="{{id}}"  class="new-msg-background text-light " >{{msg_amount}}</a></span>
                </div>
            </div>`;
})();