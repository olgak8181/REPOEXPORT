/* variables */
const russMonth = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];

/* functions */
function makeDatePicker(fieldDate) {
    getModalWindow('calendar');
    makeCalendar(fieldDate);
    
}
function makeCalendar(fieldDate) {
    let hlpdate = new Date(); 
    
    
    let tyear = hlpdate.getFullYear();
    let tmonth = hlpdate.getMonth();
    let tday = hlpdate.getDate();    
    
    if (fieldDate.match(/^\d{4}\-\d{2}\-\d{2}$/)) { 
        hlpdate = new Date(fieldDate);
    }
    
    
    let curyear = hlpdate.getFullYear();
    let curmonth = hlpdate.getMonth();
    let curday = hlpdate.getDate();
    
    
    hlpdate = new Date(curyear, curmonth); 
    let prevdays = ((hlpdate.getDay() + 6) % 7); 
    
    
    hlpdate = new Date(curyear, curmonth + 1, 0); 
    let lastday = hlpdate.getDate() + prevdays; 
    let weeks = Math.ceil(lastday / 7);
    
    
    let hlpstr = '<button type="button" class="close">&times;</button><div class="dp_header"><span class="bigprev"><<</span><span class="prev"><</span><strong>' + russMonth[curmonth] + ' ' + curyear + '</strong><span class="next">></span><span class="bignext">>></span></div>';
    hlpstr += '<div class="dp_grid"><span class="headday">Пн</span><span class="headday">Вт</span><span class="headday">Ср</span><span class="headday">Чт</span><span class="headday">Пт</span><span class="headday holiday">Сб</span><span class="headday holiday">Вс</span>';
    
    
    for (let i = 0; i < weeks * 7; i++) {
        if ((i >= prevdays) && (i < lastday)) {
            let getdate = curyear + '-' + addZero(curmonth + 1) + '-' + addZero(i - prevdays + 1);
            hlpstr += '<span class="getter';
            if ((i % 7 == 5) || (i % 7 == 6)) hlpstr += ' holiday';
            if (((i - prevdays + 1) == tday) && (tmonth == curmonth) && (tyear == curyear)) hlpstr += ' today';
            hlpstr += '" data-get="' + getdate + '">' + (i - prevdays + 1) + '</span>';
        } else {
            hlpstr += '<span class="empty"></span>';
        }
    }
    
    
    hlpstr += '</div>';
    $('#calendar').html(hlpstr);
    
    
    $('.modal .close').click(dropModalWindow);
    $('#calendar .prev').click(function(){
        makeCalendar(`${curyear}-${addZero(curmonth)}-01`);
    })
    $('#calendar .next').click(function(){
        makeCalendar(`${curyear}-${addZero(curmonth + 2)}-01`);
    })
    $('#calendar .bigprev').click(function(){
        makeCalendar(`${curyear - 1}-${addZero(curmonth + 1)}-01`);
    })
    $('#calendar .bignext').click(function(){
        makeCalendar(`${curyear + 1}-${addZero(curmonth + 1)}-01`);
    })
    $('#calendar .getter').click(function(){ 
        $('#date').val(this.dataset.get);
        dropModalWindow();
        
    });
}
