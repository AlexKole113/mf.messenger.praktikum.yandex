export let componentTemplate = (function(){
    return `<div class="chat-bottom__items-add">
                    <div class="chat-bottom__items--add-attach">
                        <i class="fas fa-paperclip attach-menu-starter text-light-min"></i>
                    </div>
                    <div class="chat-bottom__items--add-emodji">
                        <i class="far fa-smile text-light-min"></i>
                    </div>
                </div>
                <div class="chat-bottom__items-msg">
                    <div class="chat-bottom__items-msg-group">
                        <div id="message" class="chat-bottom__items-msg-input bg_dark-max border_light-min text-light-max" contenteditable="true" data-tab="1" dir="ltr" spellcheck="true" ></div>
                        <a href="#" class="chat-bottom__items-msg-send">
                            <i class="fas fa-angle-right text-light-min"></i>
                        </a>
                    </div>
                </div>`;
})();