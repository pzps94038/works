function getElement(elem) {
    return document.querySelector(elem);
}
const colors = ['#86D73F', '#31BAF9', '#FF982D', '#FF6C03', '#FF1200'];
const height = getElement('#v_height');
const weight = getElement('#v_weight');
const result = getElement('#result');
const btn = getElement('#btn-calculator');

const bmi = getElement('.rst-num');
const msg = getElement('.rst-msg');
const renew = getElement('#btn-result');
const inputs = document.querySelectorAll('.inputBox input');

const save = JSON.parse(localStorage.getItem('record')) || [];

const recordBox = getElement('.listBox');
function update(recordItem) {
    let cont = '';
    for (let i=0; i<recordItem.length; i++) {
        cont += 
        `<li data-list=${i}>
            <div class="list-msg">
                <span class="tag ${recordItem[i].color}"></span>
                <span class="txt">${recordItem[i].txt}</span>
            </div>
            <div class="list-bmi">${recordItem[i].bmi}</div>
            <div class="list-weight">${recordItem[i].weight}kg</div>
            <div class="list-height">${recordItem[i].height}cm</div>
            <div class="list-date">${recordItem[i].date}</div>
            <i class="material-icons delete"  data-clear="${i}">delete</i>
        </li>`
    }
    recordBox.innerHTML = cont;
}


function calculate() {
    let $bmi = Math.round((weight.value/Math.pow(height.value/100,2))*100)/100;
    bmi.textContent = $bmi;
    result.style.display = 'block';
    btn.style.display = 'none';
    let tag = '';

    if ( $bmi <= 18.5 ) {
        changeColor(colors[1]);
        tag = 'blue';
        msg.textContent += '過輕';
    } else if ( 18.5 < $bmi && $bmi <= 25 ) {
        changeColor(colors[0]);
        tag = 'green';
        msg.textContent += '理想';
    } else if ( 25 < $bmi && $bmi <= 30 ) {
        changeColor(colors[2]);
        tag = 'orange1';
        msg.textContent += '過重';
    } else if ( 30 < $bmi && $bmi <= 35 ) {
        changeColor(colors[3]);
        tag = 'orange2';
        msg.textContent += '輕度肥胖';
    } else if ( 35 < $bmi && $bmi <= 40 ) {
        changeColor(colors[3]);
        tag = 'orange2';
        msg.textContent += '中度肥胖';
    } else if ( 40 < $bmi ) {
        changeColor(colors[4]);
        tag = 'red';
        msg.textContent += '重度肥胖';
    }

    let array = {
        color: tag,
        txt: msg.textContent,
        bmi: $bmi,
        weight: weight.value,
        height: height.value,
        date:  nowDate().dates
    };
    
    save.push(array);
    let toString = JSON.stringify(save);
    localStorage.setItem('record', toString);
    update(save);
}

function changeColor($color) {
    result.style.background = $color;
    result.style.color = $color;
    renew.style.background = $color;
    return $color;
}

function nowDate($date) {
    let today = new Date();
    let YY = today.getFullYear();
    let MM = (today.getMonth() + 1 < 10 ? '0' : '')+(today.getMonth() + 1);
    let dd = (today.getDate() < 10 ? '0' : '')+today.getDate();
    $date = MM + '-' + dd + '-' + YY ;
    return {dates: $date, times: today};
}

function blurCheck($input) {
    const txt = [' 身高', ' 體重'];
    let msg = '';
    let chk = true;
    for (let i=0; i<$input.length; i++) {
        if ($input[i].value.trim() == '' || isNaN($input[i].value)) {
            $input[i].classList.add('focus');
            msg += txt[i];
            chk = false;
        } else {
            $input[i].classList.remove('focus');
        }
    }
    return {msg: msg, chk: chk}
}

function checkFun() {
    let alert_msg = blurCheck(inputs).msg;
    let alert_chk = blurCheck(inputs).chk;
    if ( alert_chk === true ) {
        calculate();
    } else {
        alert('請輸入您的' + alert_msg);

        inputs.forEach(function($item){
            $item.addEventListener('blur', function(){
                blurCheck(inputs);
            });
        })

        return false;
    }
    renew.addEventListener('click', function() {
        height.value = '';
        weight.value = '';
        msg.textContent = '';
        result.style.display = 'none';
        btn.style.display = 'block';
    });
    
}

function clearData (e) {
    let $clear = e.target.dataset.clear;
    if ( !$clear ){ return }
    
    save.splice($clear, 1);
    localStorage.setItem('record', JSON.stringify(save));
    update(save);
}


btn.addEventListener('click', checkFun);
recordBox.addEventListener('click', clearData);
update(save);