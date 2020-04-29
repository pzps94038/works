"use strict";

var getElemt = function getElemt(elemt) {
  return document.querySelector(elemt);
};

var xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true);
xhr.send(null);

xhr.onload = function () {
  var str = JSON.parse(xhr.responseText);
  var data = str.result.records;
  var cards = getElemt('.card-box');
  var cont = '';

  for (var i = 0; i < data.length; i++) {
    cont += "\n        <li class=\"card-item\">\n            <div class=\"card-img\">\n                <div class=\"card-txt\">\n                    <div class=\"name\">".concat(data[i].Name, "</div>\n                    <div class=\"zone\">").concat(data[i].Zone, "</div>\n                </div><img src=\"").concat(data[i].Picture1, "\" alt=\"\">\n            </div>\n            <div class=\"card-cont\">\n                <p class=\"opentime\">\n                    <i class=\"material-icons\">watch_later</i><span>").concat(data[i].Opentime, "</span></p>\n                <p class=\"add\">\n                    <i class=\"material-icons\">place</i><a href=\"https://www.google.com.tw/maps/search/").concat(data[i].Name, "\" target=\"_blank\">").concat(data[i].Add, "</a>\n                </p>\n                <p class=\"tel\"><i class=\"material-icons\">smartphone</i><a href=\"tel:").concat(data[i].Tel, "\">+").concat(data[i].Tel, "</a></p>\n                <p class=\"ticketinfo\"><i class=\"material-icons\">local_offer</i>").concat(data[i].Ticketinfo, "</p>\n            </div>\n        </li>");
  }

  cards.innerHTML = cont;
  var ZoneList = [];

  for (var _i = 0; _i < data.length; _i++) {
    ZoneList.push(data[_i].Zone);
  }

  var zone = Array.from(new Set(ZoneList));
  console.log(zone);
  var select = '';
  var selecter = getElemt('.select-wrap ol');

  for (var _i2 = 0; _i2 < zone.length; _i2++) {
    select += "\n        <li><input type=\"radio\" id=\"list[".concat(_i2 + 1, "]\" name=\"city\"><label class=\"select-option\" for=\"list[").concat(_i2 + 1, "]\">").concat(zone[_i2], "</label></li>");
  }

  selecter.innerHTML = select;
}; // ----- Scroll Top ----- //


var scrollBtn = getElemt('#scroll-top');

var scroll_top = function scroll_top() {
  // let targetPosition = scrollBtn.getBoundingClientRect().top;
  // let starPosition = window.pageYOffset;
  // let distance = targetPosition - starPosition;
  // window.scrollTo(0, '-' + distance);
  window.scrollTo(0, 0);
};

scrollBtn.addEventListener('click', scroll_top);
//# sourceMappingURL=all.js.map
