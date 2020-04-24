"use strict";

function getElement(elem) {
  return document.querySelector(elem);
}

var colors = ['#86D73F', '#31BAF9', '#FF982D', '#FF6C03', '#FF1200']; // 顏色設定

var height = getElement('#v_height'); // 身高

var weight = getElement('#v_weight'); // 體重

var result = getElement('#result'); // 顯示結果

var btn = getElement('#btn-calculator'); // 計算按鈕

var bmi = getElement('.rst-num');
var msg = getElement('.rst-msg');
var renew = getElement('#btn-result'); // 重新輸入按鈕

var recordBox = getElement('.listBox'); // 顯示列表

var save = JSON.parse(localStorage.getItem('record')) || []; // ----- 產生列表 ----- //

function update(recordItem) {
  var cont = '';

  for (var i = 0; i < recordItem.length; i++) {
    cont += "<li data-list=".concat(i, ">\n            <div class=\"list-msg\">\n                <span class=\"tag ").concat(recordItem[i].color, "\"></span>\n                <span class=\"txt\">").concat(recordItem[i].txt, "</span>\n            </div>\n            <div class=\"list-bmi\">").concat(recordItem[i].bmi, "</div>\n            <div class=\"list-weight\">").concat(recordItem[i].weight, "kg</div>\n            <div class=\"list-height\">").concat(recordItem[i].height, "cm</div>\n            <div class=\"list-date\">").concat(recordItem[i].date, "</div>\n            <i class=\"material-icons delete\"  data-clear=\"").concat(i, "\">delete</i>\n        </li>");
  } // 判斷沒有資料時，顯示文字


  if (save.length >= 1) {
    recordBox.innerHTML = cont;
  } else {
    recordBox.innerHTML = '還沒有BMI紀錄，快來面對現實吧！';
  }
} // ----- 計算 BMI ----- //


function calculate() {
  var $w = weight.value;
  var $h = height.value / 100;
  var $bmi = Math.round($w / Math.pow($h, 2) * 100) / 100;
  bmi.textContent = $bmi;
  result.style.display = 'block';
  btn.style.display = 'none';
  var tag = ''; // 判斷 BMI 範圍

  if ($bmi <= 18.5) {
    changeColor(colors[1]);
    tag = 'blue';
    msg.textContent = '過輕';
  } else if (18.5 < $bmi && $bmi <= 25) {
    changeColor(colors[0]);
    tag = 'green';
    msg.textContent = '理想';
  } else if (25 < $bmi && $bmi <= 30) {
    changeColor(colors[2]);
    tag = 'orange1';
    msg.textContent = '過重';
  } else if (30 < $bmi && $bmi <= 35) {
    changeColor(colors[3]);
    tag = 'orange2';
    msg.textContent = '輕度肥胖';
  } else if (35 < $bmi && $bmi <= 40) {
    changeColor(colors[3]);
    tag = 'orange2';
    msg.textContent = '中度肥胖';
  } else if (40 < $bmi) {
    changeColor(colors[4]);
    tag = 'red';
    msg.textContent = '重度肥胖';
  }

  return {
    _bmi: $bmi,
    _weight: weight.value,
    _height: height.value,
    _msg: msg.textContent,
    _tag: tag
  };
} // ----- 儲存 LocalStorage ----- //


function saveLS() {
  // LS 陣列
  var obj = {
    color: calculate()._tag,
    txt: calculate()._msg,
    bmi: calculate()._bmi,
    weight: calculate()._weight,
    height: calculate()._height,
    date: nowDate()._date,
    time: nowDate()._time
  }; // 把陣列加進 save 儲存庫裡

  save.push(obj); // 新增資料按照建立時間排序

  save.sort(function (a, b) {
    return new Date(b.time) - new Date(a.time);
  }); // 儲存並更新 LS

  var toString = JSON.stringify(save);
  localStorage.setItem('record', toString);
  update(save);
} // ----- 變更顏色 ----- //


function changeColor($color) {
  result.style.background = $color;
  result.style.color = $color;
  renew.style.background = $color;
  return $color;
} // ----- 抓取時間 ----- //


function nowDate($date) {
  var today = new Date();
  var YY = today.getFullYear();
  var MM = (today.getMonth() + 1 < 10 ? '0' : '') + (today.getMonth() + 1);
  var dd = (today.getDate() < 10 ? '0' : '') + today.getDate();
  var tt = today.getTime();
  $date = MM + '-' + dd + '-' + YY;
  return {
    _date: $date,
    _time: tt
  };
} // ----- 檢查 input 內容是否正確 ----- //


var inputs = document.querySelectorAll('.inputBox input');

function blurCheck($input) {
  var txt = [' 身高', ' 體重'];
  var msg = ''; // 訊息

  var chk = true; // 檢查布林值

  for (var i = 0; i < $input.length; i++) {
    if ($input[i].value == 0 || $input[i].value.trim() == '' || isNaN($input[i].value)) {
      $input[i].classList.add('focus');
      msg += txt[i];
      chk = false;
    } else {
      $input[i].classList.remove('focus');
    }
  }

  return {
    _msg: msg,
    _chk: chk
  };
}

function checkFun() {
  var alert_msg = blurCheck(inputs)._msg;

  var alert_chk = blurCheck(inputs)._chk;

  if (alert_chk === true) {
    calculate();
    saveLS();
  } else {
    alert('請輸入您的' + alert_msg);
    inputs.forEach(function ($item) {
      $item.addEventListener('blur', function () {
        blurCheck(inputs);
      });
    });
    return false;
  }

  renew.addEventListener('click', renewFun);
} // ----- 重新輸入 ----- //


function renewFun() {
  height.value = '';
  weight.value = '';
  msg.textContent = '';
  result.style.display = 'none';
  btn.style.display = 'block';
} // ----- 清除單筆資料 ----- //


function clearData(e) {
  var $clear = e.target.dataset.clear;

  if (!$clear) {
    return;
  }

  save.splice($clear, 1);
  localStorage.setItem('record', JSON.stringify(save));
  update(save);
} // ----- 鍵盤控制 ----- //


var entKey = 0;

function keyCtrl(e) {
  var alert_chk = blurCheck(inputs)._chk;

  if (e.keyCode === 13) {
    if (entKey === 1) {
      entKey = 0;
      renewFun();
    } else if (entKey == 0 && alert_chk !== true) {
      checkFun();
    } else {
      entKey = 1;
      checkFun();
    }
  } else {
    return;
  }

  ;
} // ----- 更新與監聽 ----- //


btn.addEventListener('click', checkFun);
recordBox.addEventListener('click', clearData);
document.body.addEventListener('keydown', keyCtrl);
update(save);
//# sourceMappingURL=all.js.map
