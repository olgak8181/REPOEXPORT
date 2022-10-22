/*console.log($(h1).html('Hello world, edited'))*/
/*console.log($('.hello, #h3'))*/
/*console.log($("input[name='in1']"))*/
/*console.log($("input[name^='in']")) имя начинается на...*/
/*console.log($("input[name$='1']")) имя заканчивается на...*/
/*console.log($("input[class~='class1']"))*/
/*console.log($('div').attr('style', 'width: 150px; height: 150px; background: red'))*/
/*console.log($('input').prop('disabled', true))*/
/*$('input').each((index, item) => {
    console.log(item)
})*/
/*$('input').each((index, item) => {
    $(item).val(index)
    console.log($(item).val())
})*/

/*$('button').on('click', () => {
    console.log('click')
})*/


/*
$('#btn1').on('click.event1', (event) => {
    console.log('event 1')
})

$('#btn2').on('click.event2', (event) => {
    console.log('event 2')
})

$('#btn2').on('click', ()=>{
    $('#btn1').trigger('click.event1')
})*/


/*$('#btn1').on('click', (event) => {
    $('p').hide()
})
$('#btn2').on('click', (event) => {
    $('p').show()
})*/



/*$('#btn1').on('click', (event) => {
    $('p').fadeOut('slow')
})
$('#btn2').on('click', (event) => {
    $('p').fadeIn('slow')
})
*/

/*$('#btn1').on('click', (event) => {
    $('p').slideUp('slow')
})
$('#btn2').on('click', (event) => {
    $('p').slideDown('slow')
})
*/


$('#btn1').on('click', (event) => {
    $('div').animate(
    {
        'left': '500px'
    }, 1500, 'swing', () => {
        alert('Я закончил двигать ящик')
    })
})

$('#btn2').on('click', (event) => {
    $('div').animate(
    {
        'right': '1000px'
    }, 1500, () => {
        alert('Я передвинул ящик обратно')
    })
})