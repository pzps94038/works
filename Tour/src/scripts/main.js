const getElemt = function(elemt) {
    return document.querySelector(elemt);
}

const xhr = new XMLHttpRequest();
xhr.open('get', 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97', true)
xhr.send(null);
xhr.onload = function(){
    const str = JSON.parse(xhr.responseText)
    const data = str.result.records;
    const cards = getElemt('.card-box');
    let cont = '';
    for( let i = 0; i < data.length; i++){
        cont += `
        <li class="card-item">
            <div class="card-img">
                <div class="card-txt">
                    <div class="name">${data[i].Name}</div>
                    <div class="zone">${data[i].Zone}</div>
                </div><img src="${data[i].Picture1}" alt="">
            </div>
            <div class="card-cont">
                <p class="opentime">
                    <i class="material-icons">watch_later</i><span>${data[i].Opentime}</span></p>
                <p class="add">
                    <i class="material-icons">place</i><a href="https://www.google.com.tw/maps/search/${data[i].Name}" target="_blank">${data[i].Add}</a>
                </p>
                <p class="tel"><i class="material-icons">smartphone</i><a href="tel:${data[i].Tel}">+${data[i].Tel}</a></p>
                <p class="ticketinfo"><i class="material-icons">local_offer</i>${data[i].Ticketinfo}</p>
            </div>
        </li>`
    }
    cards.innerHTML = cont;



    var ZoneList = [];
    for(let i=0; i < data.length; i++) {
        ZoneList.push(data[i].Zone);
    }
    var zone = Array.from(new Set(ZoneList));
    console.log(zone); 
    let select = '';
    const selecter = getElemt('.select-wrap ol');
    for(let i=0; i<zone.length; i++) {
        select += `
        <li><input type="radio" id="list[${i+1}]" name="city"><label class="select-option" for="list[${i+1}]">${zone[i]}</label></li>`
    }
    selecter.innerHTML = select;
    
    
    
}

// ----- Scroll Top ----- //
const scrollBtn = getElemt('#scroll-top');
const scroll_top = function(){
    // let targetPosition = scrollBtn.getBoundingClientRect().top;
    // let starPosition = window.pageYOffset;
    // let distance = targetPosition - starPosition;
    // window.scrollTo(0, '-' + distance);
    window.scrollTo(0, 0);
}

scrollBtn.addEventListener('click', scroll_top);