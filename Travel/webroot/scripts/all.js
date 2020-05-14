"use strict";

var getElemt = function getElemt(elemt) {
  return document.querySelector(elemt);
};

var xhr = new XMLHttpRequest();
var cards = getElemt('.card-box');
var cardTitle = getElemt('.card-title');
var options = getElemt('.select-wrap ol');
var tags = getElemt('.tags');
var pages = getElemt('.page-list');
var jsonData;
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send(null);

xhr.onload = function () {
  var str = JSON.parse(xhr.responseText);
  jsonData = str.result.records; // 主要 data

  if (xhr.status == 200) {
    // 監聽事件
    options.addEventListener('change', events);
    tags.addEventListener('click', events);
    pages.addEventListener('click', switchPage);
    menuSelect();
    defaultList();
    pagination(jsonData);
  } else {
    console.log('error:' + xhr.status);
  }

  console.log(xhr.status);
}; // 下拉選單


function menuSelect(e) {
  var all = '';
  var select = '';
  var ZoneList = []; // 把轉出來的字串 push 到空陣列裡

  for (var i = 0; i < jsonData.length; i++) {
    ZoneList.push(jsonData[i].Zone);
  } // 取出不重複地區物件


  var zone = Array.from(new Set(ZoneList));
  all += "\n  <li><input type=\"radio\" id=\"list[0]\" value=\"\u9AD8\u96C4\u5168\u5340\" name=\"city\"><label class=\"select-option\" for=\"list[0]\">\u9AD8\u96C4\u5168\u5340</label></li>"; // 把取出來的資料帶入選單

  for (var _i = 0; _i < zone.length; _i++) {
    select += "\n      <li><input type=\"radio\" id=\"list[".concat(_i + 1, "]\" value=\"").concat(zone[_i], "\" name=\"city\"><label class=\"select-option\" for=\"list[").concat(_i + 1, "]\">").concat(zone[_i], "</label></li>");
  }

  options.innerHTML = all + select;
} // 資料更新


function update($data) {
  var cont = "\n  <li class=\"card-item\">\n    <div class=\"card-img\">\n      <div class=\"card-txt\">\n        <div class=\"name\">".concat($data.Name, "</div>\n        <div class=\"zone\">").concat($data.Zone, "</div>\n      </div><img src=\"").concat($data.Picture1, "\" alt=\"").concat($data.Name, "\">\n    </div>\n    <div class=\"card-cont\">\n      <p class=\"opentime\">\n        <i class=\"material-icons\">watch_later</i><span>").concat($data.Opentime, "</span></p>\n      <p class=\"add\">\n        <i class=\"material-icons\">place</i><a href=\"https://www.google.com.tw/maps/search/").concat($data.Name).concat($data.Add, "\" target=\"_blank\">").concat($data.Add, "</a>\n      </p>\n      <p class=\"tel\"><i class=\"material-icons\">smartphone</i><a href=\"tel:").concat($data.Tel, "\">").concat($data.Tel, "</a></p>\n      <p class=\"ticketinfo\"><i class=\"material-icons\">local_offer</i>").concat($data.Ticketinfo, "</p>\n    </div>\n  </li>");
  cards.innerHTML += cont;
} // 預設顯示高雄全區資料


function defaultList() {
  for (var i = 0; i < jsonData.length; i++) {
    update(jsonData[i]);
  }

  cardTitle.innerHTML = '高雄全區';
} // 切換內容


function changeFun($target) {
  if (!$target) {
    return;
  }

  ;
  cards.innerHTML = '';

  for (var i = 0; i < jsonData.length; i++) {
    if ($target.value === jsonData[i].Zone) {
      update(jsonData[i]);
      cardTitle.innerHTML = jsonData[i].Zone;
    } else if ($target.value === '高雄全區') {
      update(jsonData[i]);
      cardTitle.innerHTML = '高雄全區';
    }
  }
} // 切換內容事件


function events(e) {
  var option = e.target.closest('.select-wrap li input');
  var tag = e.target.closest('.tags button');
  changeFun(option);
  changeFun(tag);
} // 計算並顯示頁碼


function pagination($data) {
  var pageCont = '';
  var dataTotal = jsonData.length;
  var perPage = 6;
  var pageTotal = Math.ceil(dataTotal / perPage); // 如果內容>6，則頁碼索引+1

  $data.forEach(function (num, index) {
    // num = 內容數量 index = 頁碼索引
    if (num > 6) {
      index + 1;
    }
  });

  for (var i = 0; i < pageTotal; i++) {
    pageCont += "<li data-page=\"".concat(i + 1, "\">").concat(i + 1, "</li>");
  }

  pages.innerHTML = pageCont; // 顯示全部頁數
}

function switchPage(e) {
  var pageBtn = e.target.dataset.page;

  if (e.target.nodeName !== 'LI') {
    return;
  }

  console.log(pageBtn);
}
//# sourceMappingURL=all.js.map
