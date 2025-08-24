const newPeriodFormEl = document.getElementsByTagName("form")[0];
const startDInputEl = document.getElementById("start-date");
const endDInputEl = document.getElementById("end-date");
const pastPeriodsUl = document.getElementById("pastPeriodsUl");
const btnSubmit = document.getElementById("btnSubmit");
const btnTest = document.getElementById("btnTest");

const STORAGE_KEY = "period-tracker";

renderPastPeriods();

btnTest.addEventListener("click",(event)=>{
    window.localStorage.clear(STORAGE_KEY);
    renderPastPeriods()
});

btnSubmit.addEventListener("click",(event)=>{
    event.preventDefault();
    const startD = startDInputEl.value;
    const endD = endDInputEl.value;

    if (checkDatesInvalid(startD,endD)){
        newPeriodFormEl.reset();
        return
    }

    storeNewPeriod(startD,endD);

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
    
    // console.log("data : ",data);
    const startD = new Date(start).toISOString().split("T")[0];
    const endD = new Date(end).toISOString().split("T")[0];
    
    data.push({startD,endD});
    let sortedData = data.sort((a,b)=>{
        return new Date(b.startD) - new Date(a.startD)
    });

    // console.log(data);
    window.localStorage.setItem(STORAGE_KEY,JSON.stringify(sortedData));
}

function getAllStortedPeriod(){
    const data = window.localStorage.getItem(STORAGE_KEY);
    // console.log(data);
    // let period = data ? JSON.parse(data) : [];
    let periods;
    try{
        periods = data ? JSON.parse(data) : [];
    }catch{
        periods = []; // 解析失败时也返回空数组
    }

    return periods;
}

function renderPastPeriods(){
    pastPeriodsUl.innerHTML = "";
    const data = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    
    // pastPeriodsUl;
    
    const liNode = [];
    try{for(let i=0;i<data.length;i++){
        const liStart = document.createElement("li");
        const liEnd = document.createElement("li");

        liStart.innerText = (i+1)+" : from tw "+formatDate(data[i].startD);
        liEnd.innerText =   (i+1)+" :   to "+formatDate(data[i].endD);

        liNode.push(liStart);
        liNode.push(liEnd);
    }}catch{
        
        
    }
    
    
    liNode.forEach(li=>pastPeriodsUl.appendChild(li));

    checkSecurity();
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-TW", { timeZone: "UTC" });
}

function checkSecurity(){
    if (window.isSecureContext) {
        console.log("this window isSecureContext ");
    }
}