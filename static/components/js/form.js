import User from './class-User.js';

(function form_handlers(){

    const inputs     =  document.querySelectorAll('form input' );
    const btn_submit =  document.querySelector('button[type="submit"]');

    btn_submit.addEventListener( 'click', ( e ) => {
        e.preventDefault();
        let data = {};

        inputs.forEach( ( itm )=>{
            if( itm.value.length > 0){
                data[ itm.getAttribute('name') ] = itm.value;
            }
        });

        if ( Object.keys( data ).length > 0 ) {
            let user = new User;
            user.setData( data ).getData();
        }

    } );
})();