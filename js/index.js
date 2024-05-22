// 'use strict'

import { monthsName, state as State } from "./variables.js";
import { initCalender } from "./api.js";
import { callApi } from "./api.js";

// await initCalender()
// const myPromis = new Promise((resolve, reject)=>{
//     let temp = fetch()
//     if(temp)
//         resolve('ok');
//     reject('error')
// })
// myPromis.then((res)=>{
//     console.log('success after some delay')
// })
// myPromis.then((err)=> {
//     console.log('err after some delay')
// })

// import callApi from "./api.js";

const apiUrl = 'http://localhost:3000/events'

async function onLoad(){
    // const res = await callApi1()
    // let temp = await callApi()
    // const res = new Promise(async(resolve,reject)=>{
    //     temp = await callApi1()
    //     resolve('done')
    // })
    // res.then((response)=>{
        // console.log('temp',temp)
    //     console.log('res',response)
    // })
    const res = await callApi('GET', apiUrl)
    console.log('res',res)
}

onLoad()

// async function callApi(method, url, data){
//     const requestOptions = {
//         method: method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     };
    

//     await fetch(url, requestOptions)
//     .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })

//       .then(data => {
//         eventArray = JSON.stringify(data);
//       })
      
//       .catch(error => {
//         console.error
//         ('Error:', error);
//       });
// }

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // console.log(data);
        eventArray = data
        makeEachMonthComponent()
    })
    .catch(error => {
        console.error('Error:', error);
    });


// let State.selectedTime

let allDayNodes
let reserveSelected
let eventArray =[
    // {
    //     date:'5/17/2024',
    //     text:'some text'
    // }
]

let firstDay
let lastDay

let tableBody = document.getElementById('tableBody')
let currentDate = document.getElementById('currentDate')
let textArea = document.getElementById('eventTextArea')
let eventBox = document.getElementById('eventContainer')

async function setSelectedTime(time = new Date().toLocaleDateString(), render = true){
    State.selectedTime = new Date(time);
    // console.log('set()',State.selectedTime.toLocaleDateString())
    if(render){
        // console.log('1111', State.selectedTime.toLocaleDateString())
        selectedDayDetails()
    }
    console.error('selected',State.selectedTime)
}

function selectedDayDetails(a){
    // ***5/17/2024

    firstDay = new Date(State.selectedTime.getFullYear(), State.selectedTime.getMonth(), 1).getDay();
    lastDay = new Date(State.selectedTime.getFullYear(), State.selectedTime.getMonth() + 1, 0).getDay();

    makeEachMonthComponent()
}

function makeEachMonthComponent(){
    // ***remove all nodes to generate now
    if(tableBody.children.length > 0){
        while (tableBody.firstChild) {
            tableBody.firstChild.remove()
        }
    }
        
    let tr = document.createElement('tr')
        
    for(let i = 0; i < 30 + firstDay; i++){
        let td

        if(i%7 == 0){
            tr = document.createElement('tr')
        }
        if(firstDay <= i){
            let timeTemp = `${State.selectedTime.getMonth()+1}` + `/${i - firstDay + 1}/` + State.selectedTime.getFullYear()
            // setSelectedTime(timeTemp, false)
            td = document.createElement('td')

            eventArray.forEach(x => {
                // console.log('x.data',x.data)
                if(x.date === timeTemp){
                    td.classList.add('event')
                }
            })
            td.classList.add('box')
            td.innerText = i - firstDay + 1
        }else{
            td = document.createElement('td')
            td.classList.add('invisBox')
            td.innerText = ''
        }
        tr.appendChild(td)
        tableBody.appendChild(tr)
    }

    // renew the value of State.selectedTime to show
    // setSelectedTime(new Date().toLocaleDateString(), false)
    currentDate.innerText = monthsName[State.selectedTime.getMonth()] + "/" + State.selectedTime.getDate() + "/" + State.selectedTime.getFullYear()
    addClickEventToEachDay()
}

async function nextMonth(){
    if(State.selectedTime.getMonth() >= 11){
        State.selectedTime.setMonth(0)
        State.selectedTime.setFullYear(State.selectedTime.getFullYear() + 1)
    }else{
        // let temp = State.selectedTime.getMonth() + 1
        // console.log('State.selectedTime',State.selectedTime.toLocaleDateString())
        // console.log('temp',temp.toString())
        // State.selectedTime.setMonth(temp.toString())
        // console.log('State.selectedTime',State.selectedTime.toLocaleDateString())
        // console.log('State.selectedTime',State.selectedTime.toLocaleDateString())
        // let time = State.selectedTime.getMonth()+3 + '/' + State.selectedTime.getDate() + '/' + State.selectedTime.getFullYear()
        // console.log('time',time)
        State.selectedTime.setMonth((State.selectedTime.getMonth() + 1).toString())
        // setSelectedTime(time)
    }
    // console.log('State.selectedTime',State.selectedTime.toLocaleDateString())
    // setTimeout(() => {
        setSelectedTime(State.selectedTime)
    // },300) 
    // console.log('State.selectedTime',State.selectedTime.toLocaleDateString())

}
document.getElementById('nextBtn').addEventListener('click',() => {
    nextMonth()
})

async function prevMonth(){
    if(State.selectedTime.getMonth() == 0){
        State.selectedTime.setMonth(11)
        State.selectedTime.setFullYear(State.selectedTime.getFullYear()-1)
    }else{
        State.selectedTime.setMonth(State.selectedTime.getMonth()-1)
    }
    selectedDayDetails()
}
document.getElementById('prevBtn').addEventListener('click',() => {
    prevMonth()
})

function addClickEventToEachDay(){
    allDayNodes = document.querySelectorAll('.box')
    allDayNodes.forEach((element, index)=> {
        element.addEventListener('click', () => {
            toggleShow()
            let timeTemp = `${State.selectedTime.getMonth()+1}` + `/${index+1}/` + State.selectedTime.getFullYear()
            reserveSelected = timeTemp
            setSelectedTime(timeTemp, false)

            //replace available value to text area or ""
            eventArray.forEach(x => {
                if(x.date === timeTemp){
                    textArea.value = x.text
                }else{
                    textArea.value = ''
                }
            })
        })
    })
}

function toggleShow(){
    eventBox.classList.toggle('event-box-show')
}
document.getElementById('closeModal').addEventListener('click',() => {
    toggleShow()
})

document.getElementById('saveEvent').addEventListener('click',async () => {
    let temp = {
        date: reserveSelected,
        text: textArea.value
    }
    eventArray.push(temp)
    // let temp2 = 
    // let data = await 
    let res = await callApi('POST', apiUrl, temp)
    console.log('resPOST',res)
    // if(data){
    // }
    // debugger



    console.log('array',eventArray)

    setSelectedTime(reserveSelected)
    toggleShow()
})


setSelectedTime()
