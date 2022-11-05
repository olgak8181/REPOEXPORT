function lightbox(curimage) {
    let w, wfix, h, hfix, sides;
    let bigimage = curimage.src.split('images/').join('images/big_'); 
    getModalWindow('lightbox');
    w = document.documentElement.clientWidth - 40; 
    h = document.documentElement.clientHeight - 40; 
    sides = curimage.clientWidth/curimage.clientHeight; 
    if (w > sides * h) { 
        wfix = Math.floor(sides * h); 
        hfix = h;
    } else if (w < sides * h) { 
        wfix = w
        hfix = Math.floor(w / sides); 
    }
    
    document.getElementById('lightbox').style.cssText = `left: ${(w - wfix)/2 + 20}px; top: ${(h - hfix)/2 + 20}px; width: ${wfix - 80}px; height: ${hfix - 80}px;`;
    
    document.getElementById('lightbox').insertAdjacentHTML('beforeend', `<img src="${bigimage}">`);
    
    setTimeout(function(){
        document.getElementById('lightbox').classList.add('ready');
    });
}