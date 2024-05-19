'use strict'

import { monthsName } from "./js/variables.js";

let selectedTime

let firstDay
let lastDay

let tableBody = document.getElementById('tableBody')
let currentDate = document.getElementById('currentDate')

async function setSelectedTime(time = new Date().toLocaleDateString()){
    console.log('time',time)
    // if(time){
        selectedTime = new Date(time);

    // }else{
        // selectedTime = new Date();
    // }
    // console.log('selectedTime',selectedTime)
    selectedDayDetails(selectedTime)
}

function selectedDayDetails(a){
    // 5/17/2024
    // console.log(a)
    
    // const temp = new Date(a)
    // dayNumber = temp.getDate()
    // monthNumber = temp.getMonth()
    // yearNumber = temp.getFullYear()

    // console.log('dayNumber', dayNumber)
    // console.log('monthNumber', monthNumber)
    // console.log('yearNumber', yearNumber)
    
    firstDay = new Date(selectedTime.getFullYear(), selectedTime.getMonth(), 1).getDay();
    lastDay = new Date(selectedTime.getFullYear(), selectedTime.getMonth() + 1, 0).getDay();
    
    
    // console.log('d ',a,dayNumber, monthNumber,yearNumber)
    // console.log('firstDay ',firstDay)
    // console.log('lastDay ',lastDay)

    makeEachMonthComponent()
}

function makeEachMonthComponent(){
    if(tableBody.children.length > 0){
        while (tableBody.firstChild) {
            tableBody.firstChild.remove()
        }
    }
        
    let tr = document.createElement('tr')
        
    for(let i = 0; i <= 30 + firstDay; i++){
        let td = document.createElement('td')
        if(i%7 == 0){
            tr = document.createElement('tr')
        }
        if(firstDay <= i){
            td.innerText = i - firstDay + 1
        }else{
            td.innerText = ''
        }
        tr.appendChild(td)
        tableBody.appendChild(tr)
    }
    let temp = new Date(selectedTime)
    console.log('temp',temp)
    currentDate.innerText = temp.getMonth() + "/" + temp.getDate() + "/" + temp.getFullYear()
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


function dateFace1(a,b,c){
    return a + "/" + b + "/" + c
}




setSelectedTime()

