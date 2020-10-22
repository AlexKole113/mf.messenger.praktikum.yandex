export let message = (function(){
    return `<div class="chat-messages__item_{{user}}">
                <div class="text-wrapper text-light-max bg_dark-min">{{content}}
                    <div class="chat-messages__item_other-meta msg-meta">  
                        {{{delivered}}}   
                        <span class="msg-meta-time text-light-min" >{{time}}</span>
                    </div>
                </div>
            </div>`;
})();