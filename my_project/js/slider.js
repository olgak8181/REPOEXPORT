/* variables */
let slider = {};
let sliderCursor = {};
let sliderFlag = {};
/* functions */
function makeSlider(slider_id, time) {
    slider[slider_id] = $('#' + slider_id); 
    sliderCursor[slider_id] = 0; 
    sliderFlag[slider_id] = false; 
    let blocks = slider[slider_id].find('.slider_block');
    
    slider[slider_id].find('button.to_left').click(function(){
        sliderGo(slider_id, 'to_left');
    });
    slider[slider_id].find('button.to_right').click(function(){
        sliderGo(slider_id, 'to_right');
    });
    
    for (let i = 0; i < blocks.length; i++) {
        slider[slider_id].find('.slider_points').append(`<span onclick="sliderGo('${slider_id}', ${i})"></span>`);
    }
    slider[slider_id].find('.slider_points span').eq(0).addClass('active'); 
    
    blocks.eq(0).addClass('current');
    blocks.eq(1).addClass('next');
    blocks.eq(blocks.length - 1).addClass('prev');
    setTimeout(function hlpsld(){ 
        sliderGo(slider_id, 'to_left');
        setTimeout(hlpsld, time); 
    }, time);
}
function sliderGo(slider_id, align) {
    if (sliderFlag[slider_id]) return; 
    sliderFlag[slider_id] = true; 
    let blockparent = slider[slider_id].find('.slider_desk');
    let blocks = slider[slider_id].find('.slider_block');
    
    if (align == 'to_left') { 
        sliderCursor[slider_id]++;
        if (sliderCursor[slider_id] >= blocks.length) sliderCursor[slider_id] -= blocks.length;
        align = 'prev';
    } else if (align == 'to_right') { 
        sliderCursor[slider_id]--;
        if (sliderCursor[slider_id] < 0) sliderCursor[slider_id] += blocks.length;
        align = 'next';
    } else {
        let oldcursor = sliderCursor[slider_id]
        sliderCursor[slider_id] = align;
        if (oldcursor > align) { 
            blockparent.find('.prev').removeClass('prev');
            blocks.eq(sliderCursor[slider_id]).addClass('prev');
            align = 'next';
        } else if (oldcursor < align) { 
            blockparent.find('.next').removeClass('next');
            blocks.eq(sliderCursor[slider_id]).addClass('next');
            align = 'prev';
        } else {
            sliderFlag[slider_id] = false;
            return;
        }
    }
    setTimeout(function(){
        slider[slider_id].find('.slider_points span').removeClass('active').eq(sliderCursor[slider_id]).addClass('active');
        blockparent.find('.current').addClass('was_current'); 
       
        blocks.eq(sliderCursor[slider_id]).addClass('current');
        blockparent.find('.was_current').addClass(align).removeClass('current');
        
        blocks.on('transitionend', function(){
           
            blocks.removeClass('prev').removeClass('next').removeClass('was_current');
            
            blocks.eq((sliderCursor[slider_id] == blocks.length - 1) ? 0 : sliderCursor[slider_id] + 1).addClass('next');
            blocks.eq((sliderCursor[slider_id] == 0) ? blocks.length - 1 : sliderCursor[slider_id] - 1).addClass('prev');
            sliderFlag[slider_id] = false;
        });
    });
}