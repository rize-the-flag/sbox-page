$( document ).ready( function () {

    let callbackFormFull = `
        <div class="popup-window__close"></div>
        <form class="callback-form" action="" method="post">
            <input class="callback-form__name" type="text" placeholder="Введите ваше имя">
            <input class="callback-form__mail" type="email" placeholder="Введите ваш e-mail">
            <input class="callback-form__phone" type="phone" placeholder="Введите ваш телефон">
            <input type="button" class="callback-form__btn" value="Отправить">
        </form>
    `;

    $('button').click(function() {
        let target = this.getAttribute('data-target');
        let action = this.getAttribute('data-action');
        let formType = this.getAttribute('data-form-preview');
        eval(action)(target, formType);
    })


    $( '.popup-window' ).on( 'click','.popup-window__close', ( evt ) => {
        $(evt.target).closest('.overlay').fadeOut();
        $( 'body' ).css( 'overflow', '' );
    } );

    function showModal(target, formType) {
        let popup = $(target).children('.popup-window');
        popup.html(callbackFormFull);

        if (formType === "short"){
            popup.find('.callback-form__phone').css( 'display','none' );
        }

        $( target ).fadeIn();
        $( 'body' ).css( 'overflow', 'hidden' );
    }
} );