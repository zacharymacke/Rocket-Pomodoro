//global interval, holds all global timers
let placeHolderTime, interval, timerOn;
let circle = document.getElementById('timer');
let radius = circle.r.baseVal.value;
let circumference = radius * 2 * Math.PI;
let studyTime, breakTime, numRounds;
let curSession = "study"
let cycle = 0;
// set the strokeDasharry settings utilizing circumference
circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDasharrayoffset = `${circumference}`;

window.onload = function(){
	init();
};

let rocketButton = document.getElementById("rocketbutton").addEventListener('click', function(){
  studyCycle();
});

let menu = document.getElementById('rocketOpenButton').addEventListener('click', function(){
  document.getElementById("menubar").style.display = 'block'; 
  document.getElementById("rocketOpenButton").style.display = "none";
});

let rocketclose = document.getElementById('rocketclosebutton').addEventListener('click', function(){
  document.getElementById("menubar").style.display = "none"; 
  document.getElementById("rocketOpenButton").style.display = "inline-block";
});

let setTime = document.getElementById("setTime").addEventListener('click', function(){
  document.getElementById("menubar").style.display = "none"; 
  document.getElementById("rocketOpenButton").style.display = "inline-block";
  document.getElementById("timeLeft").innerHTML = studyTime + ":00";
  init();
})

function init(){
  updateMinutes("minuteRange", 'minuteDisplay');
  updateMinutes("breakRange", 'breakDisplay');
  updateMinutes("roundRange", 'roundDisplay');
  //reset interval if exists
  clearInterval(interval);
  setProgress(100);
  setTimer(false);
  studyTime = document.getElementById('minuteRange').value;
  //studyTime = 0;
  if(curSession === "study"){
    placeHolderTime = document.getElementById('minuteRange').value;
  }else{
    placeHolderTime = document.getElementById('minuteRange').value;
  }
  breakTime = document.getElementById('breakRange').value;
  numRounds = document.getElementById('roundRange').value;
  document.getElementById("timeLeft").innerHTML = studyTime + ":00";
  cycle =0;
}

function updateMinutes(range, choice){
  // monitor sliders
  let slider = document.getElementById(range);
  let output = document.getElementById(choice);
  slider.oninput = function(){
    if(range === 'roundRange'){
      output.innerHTML = this.value + ".0";
    }else{
      output.innerHTML = this.value + ":00";
    }
  }
}

function timer(minutes, seconds, callback){
  interval = window.setInterval(function(){
    if(seconds == 0){
      if(minutes == 0){
        clearInterval(interval);
        callback();
        seconds = 1;
      }else{
        minutes--;
        seconds = 60;
      }
    }
    seconds--
    // fix leading 0's
    let adjustedTime = fixTime(minutes, seconds);
    document.getElementById("timeLeft").innerHTML = adjustedTime;
    //update ring
    let totSeconds = (minutes * 60) + seconds;
    let percent = (totSeconds / (placeHolderTime * 60));
    console.log("total seconds"+ totSeconds);
    console.log("placeHolderTime"+ placeHolderTime);
    setProgress((1-percent)*100);
  }, 1000);
}

function studyCycle(){
  /*  set timeOn disable start button 
      (don't want to triger a second interval) */
  setTimer(true);
  studyTimerOn(breakTimerOn);
}

function studyTimerOn(callback){
  let minutes = studyTime;
  let seconds = 0;
  placeHolderTime = minutes;
  document.getElementById("timerType").innerHTML = "Work"
  timer(minutes, seconds, callback);
}

function breakTimerOn(){
  //let minutes = breakTime;
  let minutes = breakTime;
  let seconds = 0;
  placeHolderTime = minutes;
  document.getElementById("timerType").innerHTML = "Break";
  console.log(cycle);
  if(cycle < numRounds - 1){
    cycle+=1;
    console.log("cycle count: " + cycle );
    timer(minutes, seconds, studyCycle);
  }
}

function fixTime(minutes, seconds){
  //fix leading 0
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return (minutes + ':' + seconds);
}

function setProgress(percent) {
  const offset = circumference - percent / 100 * circumference;
  circle.style.strokeDashoffset = offset;
}

function setTimer(status){
  timerOn = status;
  document.getElementById("rocketbutton").disabled = status;
}
