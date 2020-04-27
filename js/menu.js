$(document).ready(function(){
    const openPostfix = '--opened';
    const menu = $('.header-nav__menu');
    const menuButton = $('.burger-btn');

    menuButton.click(function(){
        if (menu.is(':visible')){
            menu.slideUp(300,()=>{
                menuButton.removeClass('burger-btn' + openPostfix);
                menu.css({'display': ''})
                menu.removeClass('menu--opened');
            });
        }
        else {
            menu.slideDown(300,()=>{
                menuButton.addClass('burger-btn' + openPostfix);
                menu.css({'display': ''})
                menu.addClass('menu--opened');
            });
        }
    })

})