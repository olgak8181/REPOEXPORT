/* variables */
let citylist = ['Москва', 'Санкт-Петербург', 'Архангельск', 'Астрахань', 'Ашхабад', 'Барнаул', 'Белгород', 'Бобруйск', 'Благовещенск', 'Брянск', 'Витебск', 'Владивосток', 'Владимир', 'Вологда', 'Гродно', 'Грозный', 'Днепропетровск', 'Донецк', 'Ейск', 'Екатеринбург', 'Казань', 'Калининград', 'Пенза', 'Петрозаводск', 'Самара', 'Саратов', 'Тамбов', 'Тула', 'Тюмень'];
let rangemin = 1000;
let rangemax = 70000;
let startbasket = [
    {
        id: 1,
        name: 'Смартфон Xiaomi 12T Pro',
        price: 50990,
        quantity: 1,
        link: ''
    },
    {
        id: 2,
        name: 'Электросамокат Xiaomi M365 Pro',
        price: 38190,
        quantity: 2,
        link: ''
    },
    {
        id: 111,
        name: 'Смартфон Xiaomi Poco F4 GT',
        price: 52190,
        quantity: 1,
        link: ''
    }
];

/* functions */
function getModalWindow(idname) {
    $('body').append('<div class="screener"></div><div class="modal" id="'+idname+'"><button type="button" class="close">&times;</button></div>');
    $('.screener, .modal .close').click(dropModalWindow);
}
function dropModalWindow() {
    $('.screener, .modal').remove();
}
function actiontimer() {
    let counter = new Date($('.actiontimer').data('actionend'));
    let today = new Date();
    let delta = counter.getTime() - today.getTime();
    let res = true;
    if (delta < 0) {
        delta = 0;
        res = false;
    }
    delta = Math.round(delta/1000);
    let seconds = delta % 60;
    delta = Math.floor(delta/60);
    let minutes = delta % 60;
    delta = Math.floor(delta/60);
    let hours = delta % 24;
    let days = Math.floor(delta/24);
    let helpstr = `${days} ${multiple(days, 'день', 'дня', 'дней')} ${addZero(hours)} ${multiple(hours, 'час', 'часа', 'часов')} ${addZero(minutes)} ${multiple(minutes, 'минута', 'минуты', 'минут')} ${addZero(seconds)} ${multiple(seconds, 'секунда', 'секунды', 'секунд')}`;
    $('.actiontimer').html(helpstr);
    return res;
}
function addZero(num) {
    if (num < 10) {
        num = '0' + num;
    }
    return num;
}
function multiple(num, word1, word2, word3) {
    wnum = num % 100;
    if (((wnum % 10) == 1) && (wnum != 11)) {
        return word1;
    } else if (((wnum % 10) >= 2) && ((wnum % 10) <= 4) && (wnum != 12) && (wnum != 13) && (wnum != 14)) {
        return word2;
    } else {
        return word3;
    }
}

function orderReCount() {
    let point = $('.table');
    let allsum = 0;
    point.find('tbody tr').each(function(){
        let price = +$(this).find('.price').html();
        let qty = +$(this).find('.qty strong').html();
        let sum = qty * price;
        allsum += sum;
        $(this).find('.sum').html(sum);
    });
    point.find('.allsum span').html(allsum);
}
function changeOrder(line, num){
    let newnum = +$(line).find('.qty strong').html() + num;
    if (newnum > 0) {
        $(line).find('.qty strong').html(newnum);
        orderReCount();
    }
}


/* on ready */
$(function(){
    $('.topmenu a').each(function(){
        if (this.href == location.href.split('#')[0]) this.className = 'current';
    });
    
    $('#city span').html(localStorage.getItem('city') || 'Москва');
    
    $('#city').click(function(){
        getModalWindow('citymodal');
        $('.modal').append('<h1>Выберите город:</h1><input type="text" id="citysearch" placeholder="Введите часть названия города..."><div class="columns"></div>');
        for (let city of citylist) {
            $('.modal .columns').append('<p>' + city + '</p>');
        }
        $('.modal p').click(function(){
            let city = $(this).html()
            $('#city span').html(city);
            localStorage.setItem('city', city);
            dropModalWindow();
        });
        $('#citysearch').on('input', function(){
            let namepart = $('#citysearch').val().toLowerCase();
            $('.modal p').each(function(){
                if (!this.innerHTML.toLowerCase().includes(namepart)) {
                    this.style.display = 'none';
                } else {
                    this.style.display = 'block';
                }
            });
        });
    });
    
    if ($('.action').length) {
        actiontimer();
        let timer0 = setInterval(function(){
            if (!actiontimer()) clearInterval(timer0);
        }, 1000);
    }
    
    $('.slider').each(function(){
        makeSlider(this.id, 2000);
    });
    
    if ($('.catmenu li li').length) {
        if ($('.catmenu.simple').length) { 
            $('.catmenu > ul > li').click(function(e){
                if (e.target.tagName != 'A') {
                    $('.open').removeClass('open'); 
                    $(this).find('ul').addClass('open'); 
                }
            });
        } else { 
            $('.catmenu li li').slideUp(1); 
            $('.catmenu > ul > li').click(function(e){
                if ((e.target.tagName != 'A') && (!$(this).find('.open').length)) {
                    let here = $(this).find('ul'); 
                    if (here.length) { 
                        if ($('.catmenu .open').length) { 
                            $('.catmenu .open li').slideUp(1000, function(){ 
                                $('.catmenu .open').removeClass('open'); 
                                here.find('li').slideDown(1000, function(){ 
                                    here.addClass('open'); 
                                });
                            });
                        } else { 
                            here.find('li').slideDown(1000, function(){ 
                                here.addClass('open'); 
                            });
                        }
                    } else {
                        if ($('.catmenu .open').length) { 
                            $('.catmenu .open li').slideUp(1000, function(){ 
                                $('.catmenu .open').removeClass('open'); 
                            });
                        }
                    }
                }
            });
        }
    }
    
    
    
    if ($('#slider-range').length) {
        $('#slider-range').slider({
            range: true,
            min: rangemin,
            max: rangemax,
            values: [rangemin, rangemax],
            slide: function(event, ui) {
                $('#amount1').val(ui.values[0]);
                $('#amount2').val(ui.values[1]);
            }
        });
        $('#amount1').on('change', function() {
            let v1 = +$('#amount1').val();
            let v2 = +$('#amount2').val();
            if (v1 > rangemax) {
                v1 = rangemax;
            } else if (v1 < rangemin) {
                v1 = rangemin;
            }
            $('#amount1').val(v1);
            if (v1 > v2) {
                v2 = v1;
                $('#amount2').val(v2);
            }
            $('#slider-range').slider('values', [v1, v2]);
        });
        $('#amount2').on('change', function() {
            let v1 = +$('#amount1').val();
            let v2 = +$('#amount2').val();
            if (v2 > rangemax) {
                v2 = rangemax;
            } else if (v2 < rangemin) {
                v2 = rangemin;
            }
            $('#amount2').val(v2);
            if (v1 > v2) {
                v1 = v2;
                $('#amount1').val(v1);
            }
            $('#slider-range').slider('values', [v1, v2]);
        });
        $('#amount1').val(rangemin);
        $('#amount2').val(rangemax);
    }
    
    if ($('.images .gallery').length) {
        $('.bigimage img').click(function(){
            lightbox(this);
        });
        
        $('.gal_left').click(function(){
            if (!$(this).hasClass('disabled')) galSlide('right');
        });
        
        $('.gal_right').click(function(){
            if (!$(this).hasClass('disabled')) galSlide('left');
        });
        
        $('.rail img').click(function(){
            let attr = $(this).attr('src').split('mini_').join('');
            $('.bigimage img').attr('src', attr);
        });
    }
    
    $('.btn-buy').click(function(){
        let res = {}
        let aim = $(this).parents('.product');
        res.id = aim.data('product-id');
        res.name = aim.find('h1').html();
        res.price = aim.find('.price span').html();
        res.quantity = 1
        res.link = location.href;
        let basket = JSON.parse(localStorage.getItem('basket'));
        /*
        вариант с флагом
        */
        if (basket) {
            let flag = false;
            for (let item of basket) {
                if (item.id == res.id) {
                    item.quantity = +item.quantity + +res.quantity;
                    flag = true;
                    break;
                }
            }
            if (!flag) basket.push(res);
        } else {
            basket = [res];
        }
        localStorage.setItem('basket', JSON.stringify(basket));
    });
    
    if ('.order') {
        let point = $('.table tbody');
        let count = 1;
        let basket = JSON.parse(localStorage.getItem('basket'));
        if (!basket) basket = [];
        basket.push(...startbasket);
        for (let item of basket) {
            let hlpstr = '<tr data-id="'+item.id+'"><th scope="row" class="index">'+count+'</th><td class="name"><a href="'+item.link+'">'+item.name+'</a></td><td class="qty"><span class="minus">&minus;</span><strong>'+item.quantity+'</strong><span class="plus">&plus;</span></td><td class="price">'+item.price+'</td><td class="sum"></td><td class="delete icon">&#xe906;</td></tr>';
            point.append(hlpstr);
            count++;
        }
        orderReCount();
        $('.table .plus').click(function(){
            changeOrder($(this).parents('tr'), 1);
        });
        $('.table .minus').click(function(){
            changeOrder($(this).parents('tr'), -1);
        });
        $('.table .delete').click(function(){
            $(this).parents('tr').remove();
            if ($('tbody tr').length) {
                orderReCount();
            } else {
                $('.order').addClass('empty');
            }
        });
        $('.order form .submit').click(function(){
            $('.is-invalid').removeClass('is-invalid');
            $('.invalid-feedback').remove();
            let form = document.forms[0];
            let valid = true;
            if (!form.name.value) {
                $('form #name').addClass('is-invalid').parents('.mb-3').append('<div class="invalid-feedback">Должно быть указано имя!</div>');
                valid = false;
            }
            if (!form.addr.value) {
                $('form #addr').addClass('is-invalid').parents('.mb-3').append('<div class="invalid-feedback">Должен быть указан адрес!</div>');
                valid = false;
            }
            if (!form.phone.value.match(/^((\+7)|(8))?\s?\(?\d{3}\)?\s?\d{3}\-?\d{2}\-?\d{2}$/)) {
                $('form #phone').addClass('is-invalid').parents('.mb-3').append('<div class="invalid-feedback">Должен быть указан телефон!</div>');
                valid = false;
            }
            
            if (!form.agree.checked) {
                valid = false;
            }
            
            
            if (valid) {
                let products = [];
                $('.table tbody tr').each(function(){
                    let res = {
                        id: this.dataset.id,
                        qty: +$(this).find('.qty strong').html()
                    };
                    products.push(res);
                })
                let data = {
                    name: form.name.value,
                    phone: form.phone.value,
                    mail: form.mail.value,
                    addr: form.addr.value,
                    comm: form.comm.value,
                    date: form.date.value,
                    order: products
                };
                fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }).then((response) => response.json()).then(function(json){
                    localStorage.removeItem('basket')
                    getModalWindow('order');
                    $('.modal').append('<p>Ваш заказ оформлен под номером ' + json.id + '.</p>');
                    $('.order').addClass('empty');
                    form.reset();
                });
            }
        });
        $('.order .input-group .icon').click(function(){
            let date = new Date()
            makeDatePicker(`${date.getFullYear()}-${addZero(+date.getMonth() + 1)}-${addZero(+date.getDate())}`)
        });
    }
    
    console.log('just loaded');
});