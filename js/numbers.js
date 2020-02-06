"use strict";

//===============================================================
var gLen = 5 ;
var gNumsArr = [];
var gBoard ;
var counter = 0;
var gTimer = 0;
var timerInterval;
//===============================================================
function levele(num){
    gLen +=num
    var boardEl = document.getElementById("board");
    boardEl.innerHTML = "";
    generGBoard();
    restartGame();   
}

//===============================================================
function finishGame(){
    //alert('pop')
    clearTimeout(timerInterval);
    var timerSpan= document.getElementById('timer');
    timerSpan.innerText = 0;
     $("#popup").addClass("show");
    $("#popup").removeClass("hiden");
     $("#popup").append("victory after " + gTimer + ' seconds!');

}
//===============================================================
function initBoard(){
    generNumArr();
    shuffleArray();
    generGBoard();
    //startGame();

}
//===============================================================
//===============================================================
function restartGame(){
    //todo  reorgenize!!!!!
    gNumsArr = [];
    gBoard ;
    counter = 0;
    clearTimeout(timerInterval);
    gTimer = 0;
    var timerSpan= document.getElementById('timer');
    timerSpan.innerText = 'timer: 0';
    var counterSpan =document.getElementById('counterSpan');
        counterSpan.innerText = 'score: 0';
    
    $("#popup").addClass("hiden");
    $("#popup").removeClass("show");
    $(".cell").addClass("hiden");
    $(".cell").removeClass("show");
    $(".cell").removeClass("clicked");
    var tds = document.querySelectorAll("#board td");
   for (var i = 0; i < tds.length; i++) {
       tds[i].innerText ='';
   }
    $("#board").removeClass("black");
    
    var popDiv= document.getElementById('popup');
    popDiv.innerText = '';
    //$("#popup").removeClass("show30");

    generNumArr();
    shuffleArray();
    generNewGBoard();
    
}
//===============================================================
function startGame(){

    $(".cellDiv").addClass("show");
    $(".cellDiv").removeClass("hiden");
    $(".board").addClass("black");
    gTimer =0;
    
    timerInterval = setInterval(function(){
            gTimer +=1;
            var timerSpan= document.getElementById('timer');
            timerSpan.innerText = 'timer: ' + gTimer;
    }, 1000);
        
    var popDiv= document.getElementById('popup');
    popDiv.innerHTML = '<div id ="popup1" >click me to restart</div>'


}
//===============================================================
function clicked(cellEl,num){
    if (num===counter+1){
        counter++;
        cellEl.classList.add('clicked');
        var counterSpan =document.getElementById('counterSpan');
        counterSpan.innerText = 'score: ' + counter;
        //counterSpan.innerText = counter;
    }else{
        clickedWrong(cellEl);
    }
    if (counter ===gLen*gLen ){
        finishGame();
    }
}
//===============================================================
function clickedWrong(cellEl){
    cellEl.classList.add('wrong');
    var wrongInterval = setTimeout(function(){ 
        cellEl.classList.remove('wrong');
    }, 2000);
}

//===============================================================
function generCell(i,j,cellEl){
    cellEl.setAttribute('id', 'cell-'+ i+'-'+j );
    cellEl.className = 'cell' ;
    generDiv(i,j,cellEl);
    

}
//===============================================================
function generDiv(i,j,cellEl){
    var newDiv = document.createElement("div");
    cellEl.appendChild(newDiv);
    
    var rand = getRandNum();

    newDiv.setAttribute('id', 'div-'+ i+'-'+j);
    newDiv.classList.add('cellDiv');
    newDiv.classList.add('hiden');
    
    var funToEx =  "clicked(this," + rand +")";
    newDiv.setAttribute('onclick', funToEx);
    
    newDiv.innerText = rand;
 

}
//===============================================================
function getRandNum(){
    var rand = gNumsArr[0];
    gNumsArr.shift();
    return rand
}
//===============================================================
function generGBoard(){
    var boardEl = document.getElementById('board');
    for (var i = 0; i < gLen; i++) {
        var row = boardEl.insertRow(0);
        for (var j = 0; j < gLen; j++) {
            var cellEl = row.insertCell();
            generCell(i,j,cellEl);
            //generObjDiv(cellEl);
        }
    }
}
//===============================================================
function generNewGBoard(){
    for (var i = 0; i < gLen; i++) {
        for (var j = 0; j < gLen; j++) {
            var cellEl = document.getElementById("board").rows[i].cells[j];
            generCell(i,j,cellEl);
        }
    }
}

//===============================================================
//===============================================================
function generNumArr(){
    for (var i = 1; i <= gLen*gLen; i++) {
        gNumsArr.push(i);
    }
}
//===============================================================
function shuffleArray() {
    for (var i = gNumsArr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = gNumsArr[i];
        gNumsArr[i] = gNumsArr[j];
        gNumsArr[j] = temp;
    }
    //return array;
}
//===============================================================
function getCellElByIJ(i,j){
    var cellEl = document.getElementById('cell-'+ i+'-'+j);
    return cellEl;
}
//===============================================================


