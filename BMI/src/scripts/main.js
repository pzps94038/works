// // 存入LocalStorage
// // 顯示結果，呼叫LS

// function getElement(elem) {
//     return document.querySelector(elem);
// }

// // 計算結果
// function calculate() {
//     const radio = document.querySelectorAll('.gender');
//     const age = getElement('#age').value;
//     const height = getElement('#height').value;
//     const weight = getElement('#weight').value;
//     const _bmr = getElement('#bmr');
//     const _bmi = getElement('#bmi');
//     const _ideal = getElement('#ideal');
//     const _result = getElement('#result');
//     let bmi,bmr,ideal;
//     let str = '';
//     let msg = '';

//     const colors = ['#31BAF9', '#86D73F', '#FF982D', '#FF6C03', '#FF1200'];
//     const text = ['體重過輕', '理想體重', '體重過重', '輕度肥胖', '中度肥胖', '重度肥胖'];
    
//     // 判斷性別 - 計算BMR 理想體重
//     function bmrCount (){
//         for(let i=0; i<radio.length; i++) {
//             let radioChecked = radio[i];
//             if ( radioChecked.checked == true) {
//                 switch(radioChecked.value) {
//                     case 'male':
//                         bmr = Math.floor(66+weight*13.7+height*5-age*6.8);
//                         ideal = Math.round((height-80)*70/100);
//                         break;
//                     case 'female':
//                         bmr = Math.floor(655+weight*9.6+height*1.8-age*4.7);
//                         ideal = Math.round((height-70)*60/100);
//                         break;
//                 }
//             }
//         }
//     }
        
//     // 計算BMI - 判斷BMI範圍
//     function bmiCount() {
//         bmi = Math.round((weight/Math.pow(height/100,2))*100)/100;
//         const idealweight = ideal + 'kg';
//         if(bmi < 18.5) {
//             str += '體重過輕，理想體重：' + idealweight;
//             msg += text[0];
//             _result.style.color = colors[0];

//         } else if ( bmi >= 18.5 && bmi < 24 ) {
//             str += '理想體重，繼續維持!';
//             msg += text[1];
//             _result.style.color = colors[1];

//         } else if ( bmi >= 24 && bmi < 27 ) {
//             str += '體重過重，理想體重：' + idealweight;
//             msg += text[2];
//             _result.style.color = colors[2];

//         } else if ( bmi >= 27 && bmi < 30 ) {
//             str += '輕度肥胖，理想體重：' + idealweight;
//             msg += text[3];
//             _result.style.color = colors[3];

//         } else if ( bmi >= 30 && bmi < 35 ) {
//             str += '中度肥胖，理想體重：' + idealweight;
//             msg += text[4];
//             _result.style.color = colors[3];
            
//         } else if ( bmi >= 35 ) {
//             str += '重度肥胖，理想體重：' + idealweight;
//             msg += text[5];
//             _result.style.color = colors[4];
//         }
//     }

//     // 檢查內容
//     let chk = true;
//     function checkContent(e) {
//         const inputs = document.querySelectorAll('input[type="text"]');
//         if (radio.checked == false) {
//             chk = false;    
//         }
//         inputs.forEach(function($input){
//             if($input.value == '' || isNaN($input.value)) {
//                 chk = false;
//             }
//         })
//     }


//     // 顯示結果
//     function showResult() {
//         const _popup = getElement('#popup');
//         const _overlay = getElement('#overlay');
//         const close = getElement('#close');
//         const checkmark = document.querySelectorAll('.checkmark');

//         if (chk === true) {
//             // 顯示彈出視窗
//             _popup.style.display = 'block';
//             _overlay.style.display = 'block'; 

//             _bmr.innerHTML = bmr;
//             _bmi.innerHTML = bmi;
//             _ideal.innerHTML = str;
//             _result.innerHTML = msg;
//         } else {
//             // alert('有資料不正確喔！\n再檢查一下吧～');
//             // return false;
//         }

//         // 彈出視窗關閉按鈕
//         close.addEventListener('click',function(){
//             _popup.style.display = 'none';
//             _overlay.style.display = 'none';
//         })
//     }
    
//     bmrCount();
//     bmiCount();
//     checkContent();
//     showResult();

// }
// getElement('.count').addEventListener('click', calculate);

// const inputBox = document.querySelectorAll('input[type="text"]');
// inputBox.forEach(function($input){
//     $input.addEventListener('blur', function(){
//         if($input.value == '' || isNaN($input.value)) {
//             $input.classList.add('alert');
//         } else {
//             $input.classList.remove('alert');
//         }
//     })
// })