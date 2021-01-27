var card_num = document.getElementById('fname');
var ccv = document.getElementById('ccv');
var nameHolder = document.getElementById('name');
var select1 = document.getElementById('select1');
var select2 = document.getElementById('select2');

var ccv_back = document.getElementById('ccv_back');
var card_box = document.getElementById('visa-box');
var card_p = document.getElementById('visa-num');
var date_box1 = document.getElementById('date_box1');
var date_box2 = document.getElementById('date_box2');
var card_name = document.getElementById('card-name');


card_num.addEventListener('focus', function () {
    card_box.style.transform = ' rotateY(0deg)';
    card_num.addEventListener('keyup', function () {

        card_num.value = card_num.value.replace(/[^0-9]/g, '');
        if (card_num.value.length == 0) {
            card_p.innerText = "################";
            return;
        }
        if (card_num.value.length == 17) {
            card_num.value = "";
            return;
        }
        card_p.innerText = card_num.value;
    });
});
ccv.addEventListener('focus', function () {
    card_box.style.transform = ' rotateY(180deg)';
    ccv.addEventListener('keyup', function () {
         card_num.value = card_num.value.replace(/[^0-9]/g, '');
        if (ccv.value.length == 0) {
            ccv_back.innerText = '###';
            return;
        }
        ccv_back.innerText = ccv.value;
    });
});
nameHolder.addEventListener('focus', function () {
    card_box.style.transform = ' rotateY(0deg)';
    nameHolder.addEventListener('keyup', function () {
        if (nameHolder.value.length == 0) {
            card_name.innerText = '############';
            return;
        }
        card_name.innerText = nameHolder.value;
    });
});
select1.addEventListener('focus', function () {
    card_box.style.transform = ' rotateY(0deg)';

});
select2.addEventListener('focus', function () {
    card_box.style.transform = ' rotateY(0deg)';

});

select1.addEventListener('change', function () {
    date_box1.innerText = select1.value;

});
select2.addEventListener('change', function () {
    date_box2.innerText = select2.value;
})