const newPeriodFormEl = document.getElementsByTagName("form")[0];
const startDateInputEl = document.getElementById("start-date");
const endDateInputEl = document.getElementById("end-date");

const STORAGE_KEY = "period-tracker";

newPeriodFormEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const startDate = startDateInputEl.value;
    const endDate = endDateInputEl.value;

    if (checkDatesInvalid(startDate,endDate)){
        newPeriodFormEl.reset();
        return
    }

    storeNewPeriod(startDate,endDate);

    renderPastPeriods();

    newPeriodFormEl.reset();
});

function checkDatesInvalid(start,end){
    if(start>end||!start||!end){
        return true
    }
    return false
}

function storeNewPeriod(start,end){
    const data = getAllStortedPeriod();
    
    
}

function getAllStortedPeriod(){
    const data = window.localStorage.getItem(STORAGE_KEY);
    const period = data ? JSON.parse(data) : [];

    return period;
}

function renderPastPeriods(){

}