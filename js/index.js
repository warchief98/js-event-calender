'use strict'

import { monthsName } from "./variables.js";

let selectedTime

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
    selectedTime = new Date(time);
    if(render)
        selectedDayDetails(selectedTime)
}

async function selectedDayDetails(a){
    // 5/17/2024

    firstDay = new Date(selectedTime.getFullYear(), selectedTime.getMonth(), 1).getDay();
    lastDay = new Date(selectedTime.getFullYear(), selectedTime.getMonth() + 1, 0).getDay();

    makeEachMonthComponent()
}

function makeEachMonthComponent(){
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
            td = document.createElement('td')
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
    let temp = new Date(selectedTime)
    console.log('temp',temp)
    currentDate.innerText = monthsName[temp.getMonth()] + "/" + temp.getDate() + "/" + temp.getFullYear()
    addClickEventToEachDay()
}

async function nextMonth(){
    if(selectedTime.getMonth()+2 > 12){
        setSelectedTime(1 + "/" + selectedTime.getDate() + "/" + selectedTime.getFullYear())
    }else{
        setSelectedTime(selectedTime.getMonth()+2 + "/" + selectedTime.getDate() + "/" + selectedTime.getFullYear())
    }
}
document.getElementById('nextBtn').addEventListener('click',() => {
    nextMonth()
})

async function prevMonth(){
    if(selectedTime.getMonth() == 0){
        setSelectedTime(12 + "/" + selectedTime.getDate() + "/" + selectedTime.getFullYear())
    }else{
        setSelectedTime(selectedTime.getMonth() + "/" + selectedTime.getDate() + "/" + selectedTime.getFullYear())
    }
}
document.getElementById('prevBtn').addEventListener('click',() => {
    prevMonth()
})


setSelectedTime()

function addClickEventToEachDay(){
    allDayNodes = document.querySelectorAll('.box')
    allDayNodes.forEach((element, index)=> {
        element.addEventListener('click', () => {
            toggleShow()
            let temp = selectedTime.getMonth() + `/${index+1}/` + selectedTime.getFullYear()
            reserveSelected = temp
            setSelectedTime(temp, false)
        })
    })
}

function toggleShow(){
    eventBox.classList.toggle('event-box-show')
}
document.getElementById('closeModal').addEventListener('click',() => {
    toggleShow()
})

document.getElementById('saveEvent').addEventListener('click',() => {
    let temp = {
        date: reserveSelected,
        text: textArea.value
    }
    eventArray.push(temp)

    console.log('array',eventArray)

    setSelectedTime(reserveSelected)
    toggleShow()
})
