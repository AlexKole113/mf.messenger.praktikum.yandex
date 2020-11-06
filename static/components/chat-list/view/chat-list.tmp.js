export let componentTemplate = (function(){
    return `<div class="user-list__item separator-dark {{active}}">
                <div style="background-image: url({{avatar}})" class="user-list__item-avatar bg_light-min border_light-max no-avatar">
                    <span href=""  data-chat_id="{{id}}" class="user-list__item-avatar-link"></span>
                </div>
                <div class="user-list__item-info">
                    <p class="user-list__item-info-name"><a href="" data-route="/chat?chatid={{id}}" data-chat_id="{{id}}"  class="user-list__item-info-name-link text-light-max">{{title}}</a></p>
                    <p class="user-list__item-info-last-msg"><a href="/chat?chatid={{id}}"  data-route="/chat" data-chat_id="{{id}}" class="user-list__item-info-last-msg-link text-light-min">{{excerpt}}</a></p>
                </div>
                <div class="user-list__item-actions">
                    <span class="user-list__item-actions-newmsg"><a href="/chat?chatid={{id}}" data-route="/chat" data-chat_id="{{id}}"  class="new-msg-background text-light " >{{msg_amount}}1</a></span>
                </div>
            </div>`;
})();