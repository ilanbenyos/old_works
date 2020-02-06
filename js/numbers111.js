"use strict";

//===============================================================
//===============================================================
//===============================================================
var gGameState = 0;
var gDirec ={i:0,j:0};
var gStep = 3 ; //px
var gFrames = 350 ; //milisec
var gI = 10;
var gJ = 10;

var gTableWidth = 500;
var gTableHeight = 500;
var CS = gTableWidth/gI;     //px

var gScore = 0;
var gInterval ;
var gSupertime = 100 ;

var wall=1;
var food=2;
//var power=3;
var pacman=4;
var monster=5;
var shadow = 6;

var gObjTypes = [   {type:1, name :'wall',char:'W'},
                    {type:2, name :'food', char:'1',score:1},
                    {type:3, name :'power', char:'1F353',score:20},
                    {type:4, name :'pacman',class: 'players'},
                    {type:5, name :'monster',score:30, class: 'players'},
                    {type:6, name :'shadow', class: 'shadow'}]
var gBoard = [];
var gBoardFloors = [{i:1,j:4,type:wall},{i:2,j:4,type:wall},{i:0,j:0,type:wall},
                    {i:3,j:4,type:wall},{i:4,j:4,type:wall},
                    {i:3,j:3,type:3},{i:5,j:5,type:3},
                    {i:5,j:0,type:food},{i:5,j:gJ-1,type:food},     //2 doors!
                ];
var directions      = [  {i:1,j:0,class:'up'},{i:-1,j:0,class:'down'},{i:0,j:-1,class:'left'},
                         {i:0,j:1,class:'right'},{i:0,j:0,class:'stop'}];
var STOP = {i:0,j:0};
var gPacman = {i:5,j:5, id : 'pacman',name:'pacman', direct:{i:0,j:0},directOld:{i:0,j:0},type:5};

var gMonsters = [{i:4,j:2,id : 'monster1', name:'monster',direct:STOP,defaultPos :{i:1,j:6},type:4},
                {i:7,j:7,id : 'monster2', name:'monster',direct:STOP,defaultPos :{i:7,j:6},type:4}];

//===============================================================
function initBoard(){
    generGBoard();
    generatFloor();
    generTable();
    drawTable()
    //generGBoardRect();  //gen cells rectangle values
    generMonsters();
    generObjDiv(gPacman);

    startGame();

}
//===============================================================
function getDirectionClass(direct){
    for (var a = 0; a < directions.length; a++) {
        if (direct.i ===directions[a].i && direct.j===directions[a].j){
            return directions[a].class;
        }
    }
    return null;
}
//===============================================================
function getRect(i,j){
    var percent = 0.9;
    //var t = 
    //return {t:,b:b,l:l,r:r}
}
//===============================================================
function getNumPos(num){
    return Math.floor(num *CS);
}
//===============================================================
function generMonsters(){
    for (var a = 0; a < gMonsters.length; a++) {
        var obj = gMonsters[a];
        generObjDiv(obj);
        
    }
}

//===============================================================
function generObjDiv(obj){
    var el = document.getElementById("board").rows[obj.i].cells[obj.j];
    var left = el.offsetLeft;
    var bottom = el.offsetTop - el.offsetHeight;
    //var bottom = el.style.bottom;
    
    obj.iPos = bottom;
    obj.jPos = left;

    var txtLeft      = ' ; left: ' + obj.j + 'px';
    var txtBottom    = ' ; bottom: ' + obj.i + 'px';
    var txtHeight    = ' ; height: ' + 75/gI*0.7 + 'vh';
    var txtWidth     = ' ; width: ' + 75/gJ*0.7  + 'vw';
    
    var txtStyle =txtBottom + txtLeft +txtHeight+ txtWidth;

    var boardEl = document.querySelector('.board');
    var newDiv = document.createElement("div");
    boardEl.appendChild(newDiv);
    
    // newDiv.style.bottom = obj.i * cellWidth+ 'px' 
    // document.getElementById('myElement').style.left = 0; // or whatever

    newDiv.setAttribute('id', obj.id);
    newDiv.setAttribute('class', obj.name);
    newDiv.classList.add(obj.name);
    newDiv.classList.add('players');
    newDiv.setAttribute('style', txtStyle);    
    
    generDivPos(newDiv,obj);
    //updateDivPos(newDiv,cellEl,obj)

}

//===============================================================
function generDivPos(elDiv,obj){
    var cellEl = getCellElByObj(obj);

    var nextPos = getCellPos(cellEl,obj.i,obj.j);
    elDiv.style.left    = obj.jPos + 'px'; // or whatever
    elDiv.style.bottom  = obj.iPos+ 'px'; // or whatever

    
}
//===============================================================

//===============================================================


function getClassByObjType(type){
    var name = getObjKeyByType(type,'name')
    //var name = getObjNameByType(type);
    return name;
}
//===============================================================
function generatFloor(){
    gBoardFloors.forEach(function enterWalls(obj){
        gBoard[obj.i][obj.j]= obj.type;
    });
}
//===============================================================
function getCellVal(i,j){
    if (i=== gI-1) return wall;
    if (i=== 0) return wall;
    if (j=== gJ-1) return wall;
    if (j=== 0) return wall;
    return food;
}

//===============================================================
function generGBoard(){
    //var arr=[];
    for (var i = 0; i < gI; i++) {
        gBoard[i]=[];
        for (var j = 0; j < gJ; j++) {
            gBoard[i][j] = getCellVal(i,j);
        }
    }
    //return arr;
}
//===============================================================
// function generGBoardRect(){
//     //var arr=[];
//     for (var i = 0; i < gI; i++) {
//         for (var j = 0; j < gJ; j++) {
//             var cellEl = getCellElByIJ(i,j);
//         }
//     }
// }

//===============================================================
function getObjKeyByType(type,prop){
    
    //debugger;
    for (var i = 0; i < gObjTypes.length; i++) {
       if (gObjTypes[i].type ===type) {
       for(var key in gObjTypes[i])
            if (key ===prop) {
                return gObjTypes[i][key];
            }
       }
    }
    return null;
}
// 

//===============================================================
function generTable(){
    var boardEl = document.getElementById('board');
    for (var i = 0; i < gI; i++) {
        var row = boardEl.insertRow(0);
        for (var j = 0; j < gJ; j++) {
            var cell = row.insertCell(0);
        }
    }
}
//===============================================================
function drawTable(){
    var boardEl = document.getElementById('board');
    for (var i = 0; i < gI; i++) {
        for (var j = 0; j < gJ; j++) {
            var cellEl = document.getElementById("board").rows[i].cells[j];
            var txt =  gI -i-1;
            cellEl.setAttribute('id', 'cell-'+ i +'-'+j );
            var name = getObjKeyByType(gBoard[i][j],'name')
            cellEl.className = 'cell ' + name ;
            var funToEx =  "clicked(this," + i + ","+ j +",event)";
            cellEl.setAttribute('onclick', funToEx);
        }
    }
}
