const api = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json'
const getElemt = function (elemt) {
  return document.querySelector(elemt)
}

const cards = getElemt('.card-box')
const option = getElemt('.select-wrap')
const placeholder = getElemt('.placeholder')
const cardTitle = getElemt('.card-title')
const pageList = getElemt('.page-list')
const scrollBtn = getElemt('#scroll-top')

let jsonData = []
axios.get(api).then( res => {
  jsonData = res.data.result.records
  render(jsonData)
  events(jsonData)
}).catch( err => {
  console.log(err)
})

// === 下拉選單 === //
function menuSelect(data){
  let zone = [],
      list = []
  data.forEach( i => {
    zone.push(i.Zone)
  })
  // 過濾不重複地區
  list = zone.filter( (e, i, arr) => {
    return arr.indexOf(e) === i
  })
  return list
}

// === 資料更新 === //
function update(data) {
  cards.innerHTML = ''
  for( let i=0; i<data.length; i++ ){
    let cont = `
    <li class="card-item">
      <div class="card-img">
        <div class="card-txt">
          <div class="name">${data[i].Name}</div>
          <div class="zone">${data[i].Zone}</div>
        </div><img src="${data[i].Picture1}" alt="${data[i].Name}">
      </div>
      <div class="card-cont">
        <p class="opentime">
          <i class="material-icons">watch_later</i><span>${data[i].Opentime}</span></p>
        <p class="add">
          <i class="material-icons">place</i><a href="https://www.google.com.tw/maps/search/${data[i].Name}${data[i].Add}" target="_blank">${data[i].Add}</a>
        </p>
        <p class="tel"><i class="material-icons">smartphone</i><a href="tel:${data[i].Tel}">${data[i].Tel}</a></p>
        <p class="ticketinfo"><i class="material-icons">local_offer</i>${data[i].Ticketinfo}</p>
      </div>
    </li>`
    cards.innerHTML += cont
    
    const tickets = document.querySelectorAll('.ticketinfo')
    if( data[i].Ticketinfo == '' ){
      tickets[i].style.display = 'none'
    }
  }
}

// === 切換地區 === //
function switchData(target, data) {
  let cont
  target.forEach( item => {
    item.addEventListener('click', () => {
      placeholder.textContent = item.value
      cardTitle.textContent = item.value
      cont = []
      data.filter( d => {
        if( d.Zone == item.value ){
          cont.push(d)
        } else if (item.value == '高雄全區'){
          cont = data
        }
      })
      // update(cont)
      jsonData = cont // 切換分頁時，替換最外層資料
      pagination(cont, 1)
    })
  })
}

// === 顯示分頁 === //
function pagination(data, current) {
  const perPage = 6
  const pages = {
    nowPage: current,
    totlePage: Math.ceil(data.length / perPage),
    minData: (current - 1) * perPage + 1,
    maxData: current * perPage
  }
  let newData = []
  data.forEach( (item, index) => {
    let num = index + 1
    if( num >= pages.minData && num <= pages.maxData ){
      newData.push(item)
    }
  })
  update(newData)
  pageBtn(pages, current)
}

// === 頁碼按鈕 === //
function pageBtn(pages, current){
  const total = pages.totlePage
  const now = pages.nowPage
  let str = ''

  // 上一頁
  if( current > 1 ){
    str += `<a class="prev" data-page="${Number(now) - 1}">prev</a>`
  } else {
    str += `<a class="prev off" data-page="${Number(now)}">prev</a>`
  }

  // 當前頁
  for( let i=1; i<=total; i++ ){
    if( Number(now) === i ){
      str += `<a class="active" data-page="${i}">${i}</a>`
    } else {
      str += `<a data-page="${i}">${i}</a>`
    }
  }

  // 下一頁
  if( current < total ){
    str += `<a class="next" data-page="${Number(now) + 1}">next</a>`
  } else {
    str += `<a class="next off" data-page="${Number(now)}">next</a>`
  }
  pageList.innerHTML = str
}

// === 切換分頁 === //
function switchPage(e){
  if( e.target.nodeName !== 'A' ) { return }
  let page = e.target.dataset.page
  pagination(jsonData, page)
}

// === 畫面滑動 === //
function scrollTop (){
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
function scrollStyle (){
  if( window.scrollY > 100 ){
    scrollBtn.classList.add('is-active')
  } else {
    scrollBtn.classList.remove('is-active')
  }
}

// === 畫面渲染 === //
function render(data){
  // 選單內容
  let zone = ''
  let all = `
    <li><input type="radio" id="list[0]" value="高雄全區" name="city"><label class="select-option" for="list[0]">高雄全區</label></li>`

  for( let i=0; i<menuSelect(data).length; i++ ){
    zone += `
    <li><input type="radio" id="list[${i + 1}]" value="${menuSelect(data)[i]}" name="city"><label class="select-option" for="list[${i + 1}]">${menuSelect(data)[i]}</label></li>`
  }
  option.innerHTML = all + zone
  placeholder.innerHTML = '-- 請選擇行政區 --'

  // 預設資料內容
  // update(data)
  pagination(data, 1)
}

// === 啟動事件 === //
function events(data){
  const options = document.querySelectorAll('.select-wrap li input')
  const tags = document.querySelectorAll('.tags button')
  switchData(options, data)
  switchData(tags, data)
  pageList.addEventListener('click', switchPage)
  scrollBtn.addEventListener('click', scrollTop)
  window.addEventListener('scroll', scrollStyle)
}
