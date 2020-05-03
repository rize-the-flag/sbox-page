$(document).ready(function(){
    const openPostfix = '--opened';
    const menu = $('.header__menu');
    const menuButton = $('.btn-toggle');

    menuButton.click(function(){
        if (menu.is(':visible')){
            menu.slideUp(300,()=>{
                menuButton.removeClass('btn-toggle' + openPostfix);
                menu.css({'display': ''})
                menu.removeClass('header__menu--opened');
            });
        }
        else {
            menu.slideDown(300,()=>{
                menuButton.addClass('btn-toggle' + openPostfix);
                menu.css({'display': ''})
                menu.addClass('header__menu--opened');
            });
        }
    })

})