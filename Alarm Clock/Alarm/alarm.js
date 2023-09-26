const currentTime = document.querySelector("h1"),
content = document.querySelector(".content"),
selectItem = document.querySelectorAll("select"),
setAlarmBtn = document.querySelector("button");

// Adding Ringtone in Alarm  
let alarmTime, isAlarmSet = false,
ringtone = new Audio("Danger Alarm.mp3");

// This loop will handle the Hour 
for(let i = 12; i > 0; i--){
    i = i < 10 ? "0" + i : i;      
    let option = `<option value="${i}">${i}</option>`;
    selectItem[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// This loop will handle the Minute 
for(let i = 59; i >= 0; i--){
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}"> ${i}</option>`;
    selectItem[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// This loop will handle the AM/PM 
for(let i = 2; i > 0; i--){
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}"> ${ampm}</option>`;
    selectItem[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
    let date = new Date(),
    h = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds(),
    ampm = "AM";

    if(h >= 12){
        h = h-12;
        ampm = "PM"
    }
    //if hour value is 0, set this value 12
    h = h == 0 ? h = 12 : h;

    // adding 0 before hr, min, sec if this value is less than 10
    h = h < 10 ? "0" + h : h;
    m= m < 10 ? "0" + m : m;
    s= s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if(alarmTime == `${h}:${m} ${ampm}`){
        ringtone.play();
        ringtone.loop = true;
    }
}, 1000);

// Function to set the Alarm
function setAlarm(){
    if(isAlarmSet){
        alarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmBtn.innerText = "Set Alarm";
        return isAlarmSet = false;
    }

    let time = `${selectItem[0].value}:${selectItem[1].value} ${selectItem[2].value}`;

    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        return alert("Please, select a valid time to set Alarm!");
    }
    isAlarmSet = true;
    alarmTime = time;
    content.classList.add("disable");     
    setAlarmBtn.innerText = "clear Alarm";
}

setAlarmBtn.addEventListener("click", setAlarm);
