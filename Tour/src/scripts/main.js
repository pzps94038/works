const getElemt = function (elemt) {
  return document.querySelector(elemt);
}

const cards = getElemt('.card-box');
const Selector = getElemt('.select-wrap ol');
const cardTitle = getElemt('.card-title');
let select = '';
let ZoneList = [];


const xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true)
xhr.send(null);
xhr.onload = function () {
  const str = JSON.parse(xhr.responseText)
  const data = str.result.records;

  function menuSelector(e) {
    for (let i = 0; i < data.length; i++) {
      ZoneList.push(data[i].Zone);
    }
    let zone = Array.from(new Set(ZoneList));
    for (let i = 0; i < zone.length; i++) {
      select += `
        <li><input type="radio" id="list[${i + 1}]" value="${zone[i]}" name="city"><label class="select-option" for="list[${i + 1}]">${zone[i]}</label></li>`
    }
    Selector.innerHTML = select;
  }
  menuSelector()


  function updateList($data){
    let cont = '';
    $data.forEach(function($item){
      cont += `
      <li class="card-item">
        <div class="card-img">
          <div class="card-txt">
            <div class="name">${$item.Name}</div>
            <div class="zone">${$item.Zone}</div>
          </div><img src="${$item.Picture1}" alt="">
        </div>
        <div class="card-cont">
          <p class="opentime">
            <i class="material-icons">watch_later</i><span>${$item.Opentime}</span></p>
          <p class="add">
            <i class="material-icons">place</i><a href="https://www.google.com.tw/maps/search/${$item.Name}${$item.Add}" target="_blank">${$item.Add}</a>
          </p>
          <p class="tel"><i class="material-icons">smartphone</i><a href="tel:${$item.Tel}">${$item.Tel}</a></p>
          <p class="ticketinfo"><i class="material-icons">local_offer</i>${$item.Ticketinfo}</p>
        </div>
      </li>`
    })
    cards.innerHTML = cont;
    cardTitle.innerHTML = $data.Name || '高雄全區';
  }

  updateList(data);

  const options = document.querySelectorAll('.select-wrap input[type=radio]');
  const tags = document.querySelectorAll('.tags button');

  function changeFun(e) {
    
  }
  changeFun()

  // tags.forEach(function($item){
  //   $item.addEventListener('click', updateList)
  // })
 
}

// ----- Scroll Top ----- //
const scrollBtn = getElemt('#scroll-top');
const scroll_top = function () {
  window.scrollTo(0, 0);
}

scrollBtn.addEventListener('click', scroll_top);
