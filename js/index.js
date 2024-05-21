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
    // console.log('set()',selectedTime.toLocaleDateString())
    if(render){
        console.log('1111', selectedTime.toLocaleDateString())
        selectedDayDetails()
    }
    console.error('selected',selectedTime)
}

function selectedDayDetails(a){
    // ***5/17/2024

    firstDay = new Date(selectedTime.getFullYear(), selectedTime.getMonth(), 1).getDay();
    lastDay = new Date(selectedTime.getFullYear(), selectedTime.getMonth() + 1, 0).getDay();

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
            let timeTemp = `${selectedTime.getMonth()+1}` + `/${i - firstDay + 1}/` + selectedTime.getFullYear()
            // setSelectedTime(timeTemp, false)
            td = document.createElement('td')

            eventArray.forEach(x => {
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

    // renew the value of selectedTime to show
    // setSelectedTime(new Date().toLocaleDateString(), false)
    currentDate.innerText = monthsName[selectedTime.getMonth()] + "/" + selectedTime.getDate() + "/" + selectedTime.getFullYear()
    addClickEventToEachDay()
}

async function nextMonth(){
    if(selectedTime.getMonth() >= 11){
        selectedTime.setMonth(0)
        selectedTime.setFullYear(selectedTime.getFullYear() + 1)
    }else{
        // let temp = selectedTime.getMonth() + 1
        // console.log('selectedTime',selectedTime.toLocaleDateString())
        // console.log('temp',temp.toString())
        // selectedTime.setMonth(temp.toString())
        // console.log('selectedTime',selectedTime.toLocaleDateString())
        console.log('selectedTime',selectedTime.toLocaleDateString())
        // let time = selectedTime.getMonth()+3 + '/' + selectedTime.getDate() + '/' + selectedTime.getFullYear()
        // console.log('time',time)
        selectedTime.setMonth((selectedTime.getMonth() + 1).toString())
        // setSelectedTime(time)
    }
    console.log('selectedTime',selectedTime.toLocaleDateString())
    // setTimeout(() => {
        setSelectedTime(selectedTime)
    // },300) 
    console.log('selectedTime',selectedTime.toLocaleDateString())

}
document.getElementById('nextBtn').addEventListener('click',() => {
    nextMonth()
})

async function prevMonth(){
    if(selectedTime.getMonth() == 0){
        selectedTime.setMonth(11)
        selectedTime.setFullYear(selectedTime.getFullYear()-1)
    }else{
        selectedTime.setMonth(selectedTime.getMonth()-1)
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
            let timeTemp = `${selectedTime.getMonth()+1}` + `/${index+1}/` + selectedTime.getFullYear()
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


setSelectedTime()
