$( document ).ready( function () {

    let startX = 0;
    let endX = 0;
    let dotsArray;
    let sliderDot = `<a class="item-control__dot"></a>`;
    let isRunning = false;

    const sliderItemControl = $( '.slider__item-control' );
    const controllLeft = $( '.slider__arrow--left' );
    const controllRight = $( '.slider__arrow--right' );
    const sliderItems = $( '.slider__item' );
    const sliderViewArea = $( '.slider__view-area' );

    let viewAreaWidth = sliderViewArea.width();
    let itemWidth = sliderItems.outerWidth( true );
    let maxScrollCount = Math.floor( sliderItems.length - viewAreaWidth / sliderItems.outerWidth( true ) );

    let slideXThreshold = 150;
    const autoSlideDelay = 3000;
    const userInputDelay = 2000;
    let currentPosition = 0;
    let autoSlider;

    initDotsControl();

    $( window ).resize( () => {
        currentPosition--;
        slide( 'left' );
    } );

    sliderViewArea.on( 'touchstart', evt => {
        stopAutoSlider();
        startX = evt.changedTouches[ 0 ].clientX;
    } );

    sliderViewArea.on( 'touchend', evt => {
        endX = evt.changedTouches[ 0 ].clientX;
        if ( Math.abs( startX - endX ) > slideXThreshold ) {
            if ( endX < startX ) {
                slide( 'left' );
            } else {
                slide( 'right' );
            }
        }
        setTimeout( runAutoSlider, userInputDelay );
    } );

    controllLeft.on( 'click', ( ) => {
        stopAutoSlider();
        slide( 'left' );
        setTimeout( runAutoSlider, userInputDelay );
    } );

    controllRight.on( 'click', ( ) => {
        stopAutoSlider();
        slide( 'right' );
        setTimeout( runAutoSlider, userInputDelay );
    } );

    function slide( direction ) {
        viewAreaWidth = $( '.slider__view-area' ).width();
        itemWidth = sliderItems.outerWidth( true );
        maxScrollCount = Math.floor( sliderItems.length - viewAreaWidth / sliderItems.outerWidth( true ) );
        let viewItemsCount = Math.ceil( viewAreaWidth / itemWidth ); //round up cause of 2x margin;

        if ( direction === 'left' ) {
            if ( currentPosition < maxScrollCount ) {
                currentPosition++;
                let shift = `${itemWidth * currentPosition}px`;
                sliderItems.css( 'transform', `translateX(-${shift})` );
            } else if ( currentPosition === maxScrollCount && viewItemsCount > 1 ) {
                currentPosition++;
            } else {
                currentPosition = 0;
                sliderItems.css( 'transform', `translateX(0)` );
            }
            flashDot( 'left' );
        } else {
            if ( currentPosition > 0 ) {
                currentPosition--;
                let shift = ( itemWidth * currentPosition ) + 'px';
                sliderItems.css( 'transform', `translateX(-${shift})` );
            }
            flashDot( 'right' );
        }
    }

    function initDotsControl() {
        for ( let i = 0; i < sliderItems.length; i++ ) {
            sliderItemControl.append( sliderDot );
        }
        dotsArray = $( '.item-control__dot' );
        flashDot( 'left' );
    }

    function flashDot( ) {
        dotsArray.each( function () {
            $( this ).removeClass( 'item-control__dot--active' );
        } );
        $( dotsArray[ currentPosition ] ).addClass( 'item-control__dot--active' );
    }

    function runAutoSlider() {
        if ( isRunning === false ) {
            autoSlider = setInterval( () => {
                slide( 'left' );
            }, autoSlideDelay );
            isRunning = true;
        }
    }

    function stopAutoSlider() {
        isRunning = false;
        clearInterval( autoSlider );
    }

    runAutoSlider();
} );

