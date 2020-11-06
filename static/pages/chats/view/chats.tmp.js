export let chats = (function(){
    return `<div class="user-list bg_dark-gradient">
                <div class="search-block">
                    {{{search_block}}}
                </div>
                <div class="user-collection-block">
                    {{{user_collection_block}}}
                </div>
            </div>
            <div class="chat">
            <div class="chat-top bg_dark">
                    <div class="chat-top__items separator-dark">
                        <div class="chat-top__items-mobile-list">
                            <a href="" class="chat-top-mobile-user-list">
                                <i class="fas fa-bars fa-2x text-light-min mobile-menu-starter"></i>
                            </a>
                        </div>
                        <div class="chat-top__items-details">
                           
                        </div>
                        {{{chat_menu}}}
                    </div>
                </div>
                {{{chat_alert}}}
            </div>
{{{modal}}}
`;
})();