"use strict";

var getElemt = function getElemt(elemt) {
  return document.querySelector(elemt);
};

var cards = getElemt('.card-box');
var Selector = getElemt('.select-wrap ol');
var cardTitle = getElemt('.card-title');
var select = '';
var ZoneList = [];
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send(null);

xhr.onload = function () {
  var str = JSON.parse(xhr.responseText);
  var data = str.result.records;

  function menuSelector(e) {
    for (var i = 0; i < data.length; i++) {
      ZoneList.push(data[i].Zone);
    }

    var zone = Array.from(new Set(ZoneList));

    for (var _i = 0; _i < zone.length; _i++) {
      select += "\n        <li><input type=\"radio\" id=\"list[".concat(_i + 1, "]\" value=\"").concat(zone[_i], "\" name=\"city\"><label class=\"select-option\" for=\"list[").concat(_i + 1, "]\">").concat(zone[_i], "</label></li>");
    }

    Selector.innerHTML = select;
  }

  menuSelector();

  function updateList($data) {
    var cont = '';
    $data.forEach(function ($item) {
      cont += "\n      <li class=\"card-item\">\n        <div class=\"card-img\">\n          <div class=\"card-txt\">\n            <div class=\"name\">".concat($item.Name, "</div>\n            <div class=\"zone\">").concat($item.Zone, "</div>\n          </div><img src=\"").concat($item.Picture1, "\" alt=\"\">\n        </div>\n        <div class=\"card-cont\">\n          <p class=\"opentime\">\n            <i class=\"material-icons\">watch_later</i><span>").concat($item.Opentime, "</span></p>\n          <p class=\"add\">\n            <i class=\"material-icons\">place</i><a href=\"https://www.google.com.tw/maps/search/").concat($item.Name).concat($item.Add, "\" target=\"_blank\">").concat($item.Add, "</a>\n          </p>\n          <p class=\"tel\"><i class=\"material-icons\">smartphone</i><a href=\"tel:").concat($item.Tel, "\">").concat($item.Tel, "</a></p>\n          <p class=\"ticketinfo\"><i class=\"material-icons\">local_offer</i>").concat($item.Ticketinfo, "</p>\n        </div>\n      </li>");
    });
    cards.innerHTML = cont;
    cardTitle.innerHTML = $data.Name || '高雄全區';
  }

  updateList(data);
  var options = document.querySelectorAll('.select-wrap input[type=radio]');
  var tags = document.querySelectorAll('.tags button');

  function changeFun(e) {}

  changeFun(); // tags.forEach(function($item){
  //   $item.addEventListener('click', updateList)
  // })
}; // ----- Scroll Top ----- //


var scrollBtn = getElemt('#scroll-top');

var scroll_top = function scroll_top() {
  window.scrollTo(0, 0);
};

scrollBtn.addEventListener('click', scroll_top);
//# sourceMappingURL=all.js.map
