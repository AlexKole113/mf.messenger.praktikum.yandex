export let componentTemplate = (function(){
    return `
                <div class="modal_body">
                    <div class="modal-msg-group">
                        <input type="text" data-action="chat-name" class="modal-msg-group__input bg_dark-min border_light-min text-light-max"  />                
                        <a href="" data-action="chat-creator" class="modal-msg-group__send">
                            <i data-action="chat-creator" class="fas fa-angle-right text-light-min"></i>
                        </a>
                    </div>
                </div>          
            `;
})();