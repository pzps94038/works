const getElemt = function (elemt) {
  return document.querySelector(elemt);
}
const cards = getElemt('.card-box');
const Selector = getElemt('.select-wrap ol');
const cardTitle = getElemt('.card-title');
const options = getElemt('.select-wrap');
const tags = getElemt('.tags');

const xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true)
xhr.send(null);
xhr.onload = function () {
  const str = JSON.parse(xhr.responseText)
  const data = str.result.records;

  function menuSelect(e) {
    let select = '';
    let ZoneList = [];

    // 把轉出來的字串 push 到空陣列裡
    for (let i = 0; i < data.length; i++) {
      ZoneList.push(data[i].Zone);
    }
    // 取出不重複地區物件
    let zone = Array.from(new Set(ZoneList));

    // 把取出來的資料帶入選單
    for (let i = 0; i < zone.length; i++) {
      select += `
        <li><input type="radio" id="list[${i + 1}]" value="${zone[i]}" name="city"><label class="select-option" for="list[${i + 1}]">${zone[i]}</label></li>`
    }
    Selector.innerHTML = select;
  }
 
  function update($data){
    let cont = `
    <li class="card-item">
      <div class="card-img">
        <div class="card-txt">
          <div class="name">${$data.Name}</div>
          <div class="zone">${$data.Zone}</div>
        </div><img src="${$data.Picture1}" alt="${$data.Name}">
      </div>
      <div class="card-cont">
        <p class="opentime">
          <i class="material-icons">watch_later</i><span>${$data.Opentime}</span></p>
        <p class="add">
          <i class="material-icons">place</i><a href="https://www.google.com.tw/maps/search/${$data.Name}${$data.Add}" target="_blank">${$data.Add}</a>
        </p>
        <p class="tel"><i class="material-icons">smartphone</i><a href="tel:${$data.Tel}">${$data.Tel}</a></p>
        <p class="ticketinfo"><i class="material-icons">local_offer</i>${$data.Ticketinfo}</p>
      </div>
    </li>`
    cards.innerHTML += cont;
  }
  
  function defaultList(){
    for(let i=0; i<data.length; i++){
      update(data[i]);
    }
    cardTitle.innerHTML = '高雄全區'
  }

  function changeFun($target){
    if( !$target ) { return };
    cards.innerHTML = '';
    for(let i=0; i<data.length; i++){
      if($target.value === data[i].Zone) {
        update(data[i]);
        cardTitle.innerHTML = data[i].Zone;
      } else if ( $target.value === '高雄全區' ) {
        update(data[i]);
        cardTitle.innerHTML = '高雄全區'
      }
    }

    // 計算頁數
    let totalPages = document.querySelectorAll('.card-item').length;
    let perPage = 6;
    let currentPage = Math.ceil(totalPages / perPage);
    console.log(currentPage)
  }

  function events(e) {
    const option = e.target.closest('.select-wrap li input');
    const tag = e.target.closest('.tags button');
    changeFun(option)
    changeFun(tag)
  }

  options.addEventListener('change', events );
  tags.addEventListener('click', events );
  menuSelect();
  defaultList();
  
}

