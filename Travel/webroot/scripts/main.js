"use strict";

var api = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json';

var getElemt = function getElemt(elemt) {
  return document.querySelector(elemt);
};

var cards = getElemt('.card-box');
var option = getElemt('.select-wrap');
var placeholder = getElemt('.placeholder');
var cardTitle = getElemt('.card-title');
var pageList = getElemt('.page-list');
var scrollBtn = getElemt('#scroll-top');
var jsonData = [];
axios.get(api).then(function (res) {
  jsonData = res.data.result.records;
  render(jsonData);
  events(jsonData);
})["catch"](function (err) {
  console.log(err);
}); // === 下拉選單 === //

function menuSelect(data) {
  var zone = [],
      list = [];
  data.forEach(function (i) {
    zone.push(i.Zone);
  }); // 過濾不重複地區

  list = zone.filter(function (e, i, arr) {
    return arr.indexOf(e) === i;
  });
  return list;
} // === 資料更新 === //


function update(data) {
  cards.innerHTML = '';

  for (var i = 0; i < data.length; i++) {
    var cont = "\n    <li class=\"card-item\">\n      <div class=\"card-img\">\n        <div class=\"card-txt\">\n          <div class=\"name\">".concat(data[i].Name, "</div>\n          <div class=\"zone\">").concat(data[i].Zone, "</div>\n        </div><img src=\"").concat(data[i].Picture1, "\" alt=\"").concat(data[i].Name, "\">\n      </div>\n      <div class=\"card-cont\">\n        <p class=\"opentime\">\n          <i class=\"material-icons\">watch_later</i><span>").concat(data[i].Opentime, "</span></p>\n        <p class=\"add\">\n          <i class=\"material-icons\">place</i><a href=\"https://www.google.com.tw/maps/search/").concat(data[i].Name).concat(data[i].Add, "\" target=\"_blank\">").concat(data[i].Add, "</a>\n        </p>\n        <p class=\"tel\"><i class=\"material-icons\">smartphone</i><a href=\"tel:").concat(data[i].Tel, "\">").concat(data[i].Tel, "</a></p>\n        <p class=\"ticketinfo\"><i class=\"material-icons\">local_offer</i>").concat(data[i].Ticketinfo, "</p>\n      </div>\n    </li>");
    cards.innerHTML += cont;
    var tickets = document.querySelectorAll('.ticketinfo');

    if (data[i].Ticketinfo == '') {
      tickets[i].style.display = 'none';
    }
  }
} // === 切換地區 === //


function switchData(target, data) {
  var cont;
  target.forEach(function (item) {
    item.addEventListener('click', function () {
      placeholder.textContent = item.value;
      cardTitle.textContent = item.value;
      cont = [];
      data.filter(function (d) {
        if (d.Zone == item.value) {
          cont.push(d);
        } else if (item.value == '高雄全區') {
          cont = data;
        }
      }); // update(cont)

      jsonData = cont; // 切換分頁時，替換最外層資料

      pagination(cont, 1);
    });
  });
} // === 顯示分頁 === //


function pagination(data, current) {
  var perPage = 6;
  var pages = {
    nowPage: current,
    totlePage: Math.ceil(data.length / perPage),
    minData: (current - 1) * perPage + 1,
    maxData: current * perPage
  };
  var newData = [];
  data.forEach(function (item, index) {
    var num = index + 1;

    if (num >= pages.minData && num <= pages.maxData) {
      newData.push(item);
    }
  });
  update(newData);
  pageBtn(pages, current);
} // === 頁碼按鈕 === //


function pageBtn(pages, current) {
  var total = pages.totlePage;
  var now = pages.nowPage;
  var str = ''; // 上一頁

  if (current > 1) {
    str += "<a class=\"prev\" data-page=\"".concat(Number(now) - 1, "\">prev</a>");
  } else {
    str += "<a class=\"prev off\" data-page=\"".concat(Number(now), "\">prev</a>");
  } // 當前頁


  for (var i = 1; i <= total; i++) {
    if (Number(now) === i) {
      str += "<a class=\"active\" data-page=\"".concat(i, "\">").concat(i, "</a>");
    } else {
      str += "<a data-page=\"".concat(i, "\">").concat(i, "</a>");
    }
  } // 下一頁


  if (current < total) {
    str += "<a class=\"next\" data-page=\"".concat(Number(now) + 1, "\">next</a>");
  } else {
    str += "<a class=\"next off\" data-page=\"".concat(Number(now), "\">next</a>");
  }

  pageList.innerHTML = str;
} // === 切換分頁 === //


function switchPage(e) {
  if (e.target.nodeName !== 'A') {
    return;
  }

  var page = e.target.dataset.page;
  pagination(jsonData, page);
} // === 畫面滑動 === //


function scrollTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function scrollStyle() {
  if (window.scrollY > 100) {
    scrollBtn.classList.add('is-active');
  } else {
    scrollBtn.classList.remove('is-active');
  }
} // === 畫面渲染 === //


function render(data) {
  // 選單內容
  var zone = '';
  var all = "\n    <li><input type=\"radio\" id=\"list[0]\" value=\"\u9AD8\u96C4\u5168\u5340\" name=\"city\"><label class=\"select-option\" for=\"list[0]\">\u9AD8\u96C4\u5168\u5340</label></li>";

  for (var i = 0; i < menuSelect(data).length; i++) {
    zone += "\n    <li><input type=\"radio\" id=\"list[".concat(i + 1, "]\" value=\"").concat(menuSelect(data)[i], "\" name=\"city\"><label class=\"select-option\" for=\"list[").concat(i + 1, "]\">").concat(menuSelect(data)[i], "</label></li>");
  }

  option.innerHTML = all + zone;
  placeholder.innerHTML = '-- 請選擇行政區 --'; // 預設資料內容
  // update(data)

  pagination(data, 1);
} // === 啟動事件 === //


function events(data) {
  var options = document.querySelectorAll('.select-wrap li input');
  var tags = document.querySelectorAll('.tags button');
  switchData(options, data);
  switchData(tags, data);
  pageList.addEventListener('click', switchPage);
  scrollBtn.addEventListener('click', scrollTop);
  window.addEventListener('scroll', scrollStyle);
}