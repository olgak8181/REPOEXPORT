/* variables */
let galFlag = false;
/* functions */
function galSlide(direction) {
    if (galFlag) return; 
    galFlag = true; 
    
    let pos = parseInt($('.rail').css('left'));
    let width = parseInt($('.rail').css('width'));
    let windowwidth = parseInt($('.gallery > div').css('width'));
    let step = parseInt($('.rail img').css('width')) + parseInt($('.rail').css('gap'));
    let move = '';
    if (direction == 'left') { 
        if (windowwidth >= width + pos) { 
            galFlag = false;
            return;
        }
        move += '-=' + step; 
    } else { 
        if (pos >= 0) { 
            galFlag = false;
            return;
        }
        move += '+=' + step; 
    }
    $('.gallery .disabled').removeClass('disabled'); 
    
    $('.rail').animate({left: move}, 1000, function() {
        if (parseInt($('.rail').css('left')) >= 0) { 
            $('.gallery .gal_left').addClass('disabled');
        } else if (windowwidth >= width + parseInt($('.rail').css('left'))) { 
            $('.gallery .gal_right').addClass('disabled');
        }
        galFlag = false; 
    });
}