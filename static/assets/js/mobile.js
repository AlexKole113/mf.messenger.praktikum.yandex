(function () {

    document.body.addEventListener('click',function ( e ) {
        if ( e.target.classList.contains('mobile-menu-starter' ) ) {
            e.preventDefault();
            document.querySelector('.user-list').classList.toggle("open");
            document.querySelector('.mobile-wrapper').classList.toggle("active");
        }

        if ( e.target.classList.contains('mobile-close' ) ) {
            e.preventDefault();
            document.querySelector('.mobile-wrapper').classList.remove("active");
            document.querySelector('.user-list').classList.remove("open");
        }

        if ( e.target.classList.contains('mobile-wrapper' ) ) {
            document.querySelector('.mobile-wrapper').classList.remove("active");
            document.querySelector('.user-list').classList.remove("open");
            document.querySelector('.chat-top__items-menu').classList.remove("open");
            if( document.querySelector('.modal') ){
                document.querySelector('.modal').classList.remove("open");
            }

            if( document.querySelector('.chat-bottom__items-menu') ){
                document.querySelector('.chat-bottom__items-menu').classList.remove("open");
            }
            document.querySelectorAll(".z-25").forEach((elm) => {
                elm.classList.remove("z-25");
            });
        }

        if ( e.target.dataset.target ==='modal' ) {
            e.preventDefault()
            document.querySelector( e.target.dataset.modal ).classList.add('open');
            document.querySelector( e.target.dataset.modal ).classList.add('z-25');
            document.querySelector('.mobile-wrapper').classList.toggle("active");
        }
    })

})()

