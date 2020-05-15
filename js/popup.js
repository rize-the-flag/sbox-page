$( document ).ready( function () {
  const callbackFormFull = `
        <div class="popup-window__close"></div>
        <form class="callback-form" action="" method="post">
            <input class="callback-form__name" type="text" placeholder="Введите ваше имя" required>
            <input class="callback-form__mail" type="email" placeholder="Введите ваш e-mail" required>
            <input class="callback-form__phone" type="text" placeholder="Введите ваш телефон" required>
            <input type="submit" class="callback-form__button button button--orange" value="Отправить">
        </form>
    `;

  $( 'button' ).click( function () {
    let target = this.getAttribute( 'data-target' );
    let action = this.getAttribute( 'data-action' );
    let formType = this.getAttribute( 'data-form-preview' );
    eval( action )( target, formType );
  } );

  $( '.popup-window' ).on( 'click', '.popup-window__close', ( evt ) => {
    $( evt.target ).closest( '.overlay' ).fadeOut();
    $( 'body' ).removeClass( 'modal-open' );
    document.removeEventListener( 'wheel', disableWheel );
    document.removeEventListener( 'keydown', disableArrows );
    document.removeEventListener( 'mousedown', disableMiddleMouseBtn );
  } );

  function showModal( target, formType ) {
    let popup = $( target ).children( '.popup-window' );

    popup.html( callbackFormFull );

    if ( formType === 'short' ) {
      const callbackMail = popup.find( '.callback-form__mail' );
      callbackMail.css( 'display', 'none' );
      callbackMail.removeAttr( 'required' );
    }



    $( target ).fadeIn();
    $( 'body' ).addClass( 'modal-open' );

    document.addEventListener( 'wheel', disableWheel, { passive: false } );
    document.addEventListener( 'keydown', disableArrows, { passive: false } );
    document.addEventListener( 'mousedown', disableMiddleMouseBtn, { passive: false } );

  }

  function disableArrows( e ) {
    const blocklist = [ 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight' ];
    if ( blocklist.indexOf( e.code ) >= 0 ) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  function disableWheel( e ) {
    e.preventDefault();
    e.stopPropagation();
  }

  function disableMiddleMouseBtn( e ) {
    let middleMouseBtn = 1;
    if ( e.button === middleMouseBtn ) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

} );
