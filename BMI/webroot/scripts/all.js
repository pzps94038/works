"use strict";function getElement(e){return document.querySelector(e)}var colors=["#86D73F","#31BAF9","#FF982D","#FF6C03","#FF1200"],height=getElement("#v_height"),weight=getElement("#v_weight"),result=getElement("#result"),btn=getElement("#btn-calculator"),bmi=getElement(".rst-num"),msg=getElement(".rst-msg"),renew=getElement("#btn-result"),recordBox=getElement(".listBox"),save=JSON.parse(localStorage.getItem("record"))||[];function update(e){for(var t="",n=0;n<e.length;n++)t+="<li data-list=".concat(n,'>\n            <div class="list-msg">\n                <span class="tag ').concat(e[n].color,'"></span>\n                <span class="txt">').concat(e[n].txt,'</span>\n            </div>\n            <div class="list-bmi">').concat(e[n].bmi,'</div>\n            <div class="list-weight">').concat(e[n].weight,'kg</div>\n            <div class="list-height">').concat(e[n].height,'cm</div>\n            <div class="list-date">').concat(e[n].date,'</div>\n            <i class="material-icons delete"  data-clear="').concat(n,'">delete</i>\n        </li>');1<=save.length?recordBox.innerHTML=t:recordBox.innerHTML="還沒有BMI紀錄，快來面對現實吧！"}function calculate(){var e=weight.value,t=height.value/100,n=Math.round(e/Math.pow(t,2)*100)/100;bmi.textContent=n,result.style.display="block",btn.style.display="none";var a="";n<=18.5?(changeColor(colors[1]),a="blue",msg.textContent+="過輕"):18.5<n&&n<=25?(changeColor(colors[0]),a="green",msg.textContent+="理想"):25<n&&n<=30?(changeColor(colors[2]),a="orange1",msg.textContent+="過重"):30<n&&n<=35?(changeColor(colors[3]),a="orange2",msg.textContent+="輕度肥胖"):35<n&&n<=40?(changeColor(colors[3]),a="orange2",msg.textContent+="中度肥胖"):40<n&&(changeColor(colors[4]),a="red",msg.textContent+="重度肥胖");var r={color:a,txt:msg.textContent,bmi:n,weight:weight.value,height:height.value,date:nowDate()._date,time:nowDate()._time};save.push(r),save.sort(function(e,t){return new Date(t.time)-new Date(e.time)});var l=JSON.stringify(save);localStorage.setItem("record",l),update(save)}function changeColor(e){return result.style.background=e,result.style.color=e,renew.style.background=e}function nowDate(e){var t=new Date,n=t.getFullYear();return{_date:(t.getMonth()+1<10?"0":"")+(t.getMonth()+1)+"-"+((t.getDate()<10?"0":"")+t.getDate())+"-"+n,_time:t.getTime()}}var inputs=document.querySelectorAll(".inputBox input");function blurCheck(e){for(var t=[" 身高"," 體重"],n="",a=!0,r=0;r<e.length;r++)0==e[r].value||""==e[r].value.trim()||isNaN(e[r].value)?(e[r].classList.add("focus"),n+=t[r],a=!1):e[r].classList.remove("focus");return{_msg:n,_chk:a}}function checkFun(){var e=blurCheck(inputs)._msg;if(!0!==blurCheck(inputs)._chk)return alert("請輸入您的"+e),inputs.forEach(function(e){e.addEventListener("blur",function(){blurCheck(inputs)})}),!1;calculate(),renew.addEventListener("click",renewFun)}function renewFun(){height.value="",weight.value="",msg.textContent="",result.style.display="none",btn.style.display="block"}function clearData(e){var t=e.target.dataset.clear;t&&(save.splice(t,1),localStorage.setItem("record",JSON.stringify(save)),update(save))}var entKey=0;function keyCtrl(e){var t=blurCheck(inputs)._chk;13==e.keyCode&&(1==entKey?(entKey=0,renewFun()):(0==entKey&&!0!==t||(entKey=1),checkFun()))}btn.addEventListener("click",checkFun),recordBox.addEventListener("click",clearData),document.body.addEventListener("keydown",keyCtrl),update(save);