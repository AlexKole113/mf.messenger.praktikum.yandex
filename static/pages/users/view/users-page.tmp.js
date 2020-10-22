export let usersPage = (function(){
    return `<div class="user-list bg_dark-gradient">
                <div class="search-block">
                    {{{search_block}}}
                </div>
                <div class="user-collection-block">
                    {{{user_collection_block}}}
                </div>
            </div>
            <div class="chat">
                {{{chat_alert}}}
            </div>`;
})();