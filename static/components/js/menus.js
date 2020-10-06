


const mobile_menu         = document.querySelector('.chat-top-mobile-user-list');
const user_list           = document.querySelector('.user-list');
const mobile_wrapper      = document.querySelector('.mobile-wrapper');
const mobile_closer       = document.querySelector('.mobile-close');
const chat_menu_starter   = document.querySelector('.chat-top__items-menu-starter');
const chat_menu           = document.querySelector('.chat-top__items-menu');
const attach_menu_starter = document.querySelector('.chat-bottom__items--add-attach');
const attach_menu         = document.querySelector('.chat-bottom__items-menu');


// mobile menu
mobile_menu.addEventListener('click',(e)=>{
    e.preventDefault();
    user_list.classList.toggle('open');
    mobile_wrapper.classList.toggle('active');
});

mobile_wrapper.addEventListener('click',function(e){
    this.classList.remove('active');
    user_list.classList.remove('open');
    chat_menu.classList.remove('open');
    attach_menu.classList.remove('open');
    document.querySelectorAll('.z-25').forEach((elm)=>{
        elm.classList.remove('z-25');
    })
});

mobile_closer.addEventListener('click',function(e){
    e.preventDefault();
    mobile_wrapper.classList.remove('active');
    user_list.classList.remove('open');
});

//chat menu
chat_menu_starter.addEventListener('click',function(e){
    this.classList.toggle('z-25')
    chat_menu.classList.toggle('open');
    mobile_wrapper.classList.toggle('active');
});

//attach menu
attach_menu_starter.addEventListener('click',function(e){
    this.classList.toggle('z-25')
    attach_menu.classList.toggle('open');
    mobile_wrapper.classList.toggle('active');
});
