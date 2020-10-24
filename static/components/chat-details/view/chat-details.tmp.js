export let componentTemplate = (function(){
    return `<div class="chat-top__items-details_group">
                <div style="background-image: url({{photo}})" class="chat-top__items-details_group-ava border_light-max">
                    <a href="#" class="chat-top__items-details_group-ava-link"></a>
                </div>
                <div class="chat-top__items-details_group-name">
                    <a class="chat-top__items-details_group-name_link text-light-max" href="{{link}}">
                           {{name}}
                    </a>
                    <span class="chat-top__items-details_group-name-visit text-light-min">{{lastTime}}</span>
                </div>
            </div>`;
})();