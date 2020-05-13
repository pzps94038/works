"use strict";

var getElemt = function getElemt(elemt) {
  return document.querySelector(elemt);
};

var xhr = new XMLHttpRequest();
var cards = getElemt('.card-box');
var Selector = getElemt('.select-wrap ol');
var cardTitle = getElemt('.card-title');
var options = getElemt('.select-wrap');
var tags = getElemt('.tags');
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send(null);

xhr.onload = function () {
  var str = JSON.parse(xhr.responseText);
  var data = str.result.records; // 下拉選單

  function menuSelect(e) {
    var select = '';
    var ZoneList = []; // 把轉出來的字串 push 到空陣列裡

    for (var i = 0; i < data.length; i++) {
      ZoneList.push(data[i].Zone);
    } // 取出不重複地區物件


    var zone = Array.from(new Set(ZoneList)); // 把取出來的資料帶入選單

    for (var _i = 0; _i < zone.length; _i++) {
      select += "\n        <li><input type=\"radio\" id=\"list[".concat(_i + 1, "]\" value=\"").concat(zone[_i], "\" name=\"city\"><label class=\"select-option\" for=\"list[").concat(_i + 1, "]\">").concat(zone[_i], "</label></li>");
    }

    Selector.innerHTML = select;
  } // 資料更新


  function update($data) {
    var cont = "\n    <li class=\"card-item\">\n      <div class=\"card-img\">\n        <div class=\"card-txt\">\n          <div class=\"name\">".concat($data.Name, "</div>\n          <div class=\"zone\">").concat($data.Zone, "</div>\n        </div><img src=\"").concat($data.Picture1, "\" alt=\"").concat($data.Name, "\">\n      </div>\n      <div class=\"card-cont\">\n        <p class=\"opentime\">\n          <i class=\"material-icons\">watch_later</i><span>").concat($data.Opentime, "</span></p>\n        <p class=\"add\">\n          <i class=\"material-icons\">place</i><a href=\"https://www.google.com.tw/maps/search/").concat($data.Name).concat($data.Add, "\" target=\"_blank\">").concat($data.Add, "</a>\n        </p>\n        <p class=\"tel\"><i class=\"material-icons\">smartphone</i><a href=\"tel:").concat($data.Tel, "\">").concat($data.Tel, "</a></p>\n        <p class=\"ticketinfo\"><i class=\"material-icons\">local_offer</i>").concat($data.Ticketinfo, "</p>\n      </div>\n    </li>");
    cards.innerHTML += cont;
  } // 預設顯示高雄全區資料


  function defaultList() {
    for (var i = 0; i < data.length; i++) {
      update(data[i]);
    }

    cardTitle.innerHTML = '高雄全區';
  } // 切換內容


  function changeFun($target) {
    if (!$target) {
      return;
    }

    ;
    cards.innerHTML = '';

    for (var i = 0; i < data.length; i++) {
      if ($target.value === data[i].Zone) {
        update(data[i]);
        cardTitle.innerHTML = data[i].Zone;
      } else if ($target.value === '高雄全區') {
        update(data[i]);
        cardTitle.innerHTML = '高雄全區';
      }
    }
  } // 計算頁數


  var pages = getElemt('.page-list');

  function pagination($data) {
    var dataTotal = $data.length;
    var perPage = 6;
    var pageTotal = Math.ceil(dataTotal / perPage); // 回傳運算結果

    return {
      dataTotal: dataTotal,
      perPage: perPage,
      pageTotal: pageTotal
    };
  } // 用物件方式傳遞資料


  var pageList = {
    total: pagination(data).pageTotal
  }; // 顯示頁碼

  function displayPage() {
    var pageCont = '';

    for (var i = 0; i < pageList.total; i++) {
      pageCont += "<li data-page=\"".concat(i + 1, "\">").concat(i + 1, "</li>");
    }

    pages.innerHTML = pageCont; // 顯示全部頁數
  }

  displayPage(); // 頁碼按鈕

  function switchPage(e) {
    var page = e.target.dataset.page;
    if (e.target.nodeName !== 'LI') return;
    console.log(page);
  } // 切換內容事件


  function events(e) {
    var option = e.target.closest('.select-wrap li input');
    var tag = e.target.closest('.tags button');
    changeFun(option);
    changeFun(tag);
  } // 監聽事件


  options.addEventListener('change', events);
  tags.addEventListener('click', events);
  pages.addEventListener('click', switchPage);
  menuSelect();
  defaultList();
};
//# sourceMappingURL=all.js.map
