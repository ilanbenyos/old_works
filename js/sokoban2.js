"use strict";

var F =1;
var W = 2
var T =3;
var M =4;
var B= 5;
//floor=1 wall=2 target = 3 man=4 box=5 
var gGame = true;
var gDirec = {i:0,j:0}
var objsToMove = [];
var gI = 7;
var gJ = 7;

var gStartEls = [{i:1,j:1, type:'M'},{i:2,j:2, type:'B'},{i:2,j:4,type:'B'},{i:1,j:2,type:'T'},{i:3,j:5,type:'T'}];

var gEls = gStartEls.slice();
var gMan = gEls[0];
//var gTargs = [{i:1,j:2},{i:3,j:5}];
var gscore = 0;
var gSteps = 0;
//var gTimestart = new Date(now);
var gArr=[];


//===============================================================
startGame(gI,gJ);
//===============================================================
function startGame(newI,jNew){
   initialmovingObjs();
//    gStartEls[1] =  {i:2,j:2, type:'B'}
//    gStartEls[2] =  {i:2,j:4,type:'B'}
    
    gI = newI;
    gJ = jNew;
    gEls = gStartEls.slice();
    var tableObj = document.getElementById("table");
    tableObj.innerHTML = "";
    gscore = 0;
    gSteps = 0;

    generStartArr();
    generArr();
    drawTable();

}
//===============================================================
function restartGame(iNew,jNew){
    closepopUp();
    startGame(iNew,jNew)
}
//===============================================================
function    initialmovingObjs(){
    //returning all moving object to start pos
    gMan =  {i:1,j:1, type:'M'}
    gStartEls[1] =  {i:2,j:2, type:'B'}
    gStartEls[2] =  {i:2,j:4,type:'B'}
}

document.onkeydown = function(e) {
    var iMove = 0;
    var jMove = 0;
    switch (e.keyCode) { //left
        case 37:  //left
                gDirec ={i:0,j:-1};
            break;
        case 38://up
                gDirec={i:1,j:0};
            break;
        case 39://right
                gDirec={i:0,j:1};
            break;
        case 40: //down
                gDirec={i:-1,j:0};
            break;
    }
    console.log (gMan.i , '/', gMan.j)
    
    if ( checkMove()){          
        objsToMove.push(gMan)       //if can move= add man to pushing list and generate move
        gSteps ++;
        makeMove();
    }else{
        objsToMove = [];        //clear pushing list
    }
}
//===============================================================
//floor=1 wall=2 target = 3 man=4 box=5 
function checkMove(){
    
    var iMove = gMan.i + gDirec.i;
    var jMove = gMan.j + gDirec.j;
    var canMove = true;
    
    var nextCellWAllObj = isElsInPos(iMove,jMove,'W');
    if (nextCellWAllObj){
        return false;//` into the wall
    }
    var nextCellBoxObj = isElsInPos(iMove,jMove,'B');
    if (nextCellBoxObj !=null ){                                    //` pusshing box
            var wall = isElsInPos(iMove+ gDirec.i,jMove+ gDirec.j,'W');//` into wall box
            var box = isElsInPos(iMove+ gDirec.i,jMove+ gDirec.j,'B');//` into another box
            if(box !=null || wall !=null ){
                return false;
            }else{
              objsToMove.push(nextCellBoxObj); 
            }
    }
    return true
}
//===============================================================
function makeMove(){
    for (var a = 0; a < objsToMove.length; a++) {
        var obj = objsToMove[a];
        var cell = document.getElementById('cell'+ obj.i+'q'+ obj.j );
        var cellClass = cell.className;
        //===================       
        //delete from table
        var txt ='cell-'+ obj.type;
        cell.classList.remove(txt);
        //===================       
        //delete from arr
        gArr[obj.i][obj.j] = "F";
        //===================       
        //gener elArr
        obj.i += gDirec.i
        obj.j += gDirec.j
        // insert to rr
        gArr[obj.i][obj.j] = obj.type;
        //draw to table
        var cell = document.getElementById('cell'+ obj.i+'q'+ obj.j );
        var txt ='cell-'+ obj.type;
        cell.classList.add(txt);
        //===================       

    }

    document.getElementById('steps').innerText = gSteps;
    generArr();
    objsToMove = [];
    checkvictory();

}
//===============================================================
function generArr(){
    for (var a = 0; a < gEls.length; a++) {
        var el = gEls[a]
        gArr[el.i][el.j] = el.type;
    }
}
//===============================================================
function deleteTable(){
    var tableEl = document.getElementById('table');
    tableEl.innerHTML = "";

}

//===============================================================
function drawTable(){
//  delete table
    var tableEl = document.getElementById('table');
    tableEl.innerHTML = "";

    for (var i = 0; i < gI; i++) {
        var row = tableEl.insertRow(0);
        for (var j = 0; j < gJ; j++) {
            var cell = row.insertCell();
            cell.setAttribute('id', 'cell'+ i+'q'+j );
            var cellClass = 'cell cell-'+ gArr[i][j] ;
            cell.className = cellClass;
            var funToEx =  "clicked(this," + i + ","+ j +",event)";
            cell.setAttribute('onmousedown', funToEx);
        }
    }
}
//===============================================================
function checkvictory(){ //find how many obj from that type we have
    var targetsCountObj = countObjType('T');
    var arr = targetsCountObj.arr;
    var count = targetsCountObj.count;
    var check = true
    for (var a = 0; a < arr.length; a++) {
        if(! isElsInPos(arr[a].i,arr[a].j,'B')) check = false;
    }
    if (check ===true) victory();
}
//===============================================================
function victory(){
    var elPopup     = document.querySelector('.popUp');
    var elCarName   = elPopup.querySelector('h3');
    var elRaceTime  = elPopup.querySelector('h4 > span');

    elPopup.innerText     = 'game over';
    //elRaceTime.innerText    = (Date.now() - gStartTime) / 1000;

    elPopup.style.opacity       = 1;
    elPopup.style.visibility    = 'visible';
    //visibility: hidden
    //alert('victory');
    initialmovingObjs();
}
//===============================================================
function countObjType(type){
    var arr = [];
    var count =0;
    for (var a = 0; a < gEls.length; a++) {
        if(gEls[a].type === type){
            count++;
            arr.push(gEls[a])          
        }   
    }  
   return {arr:arr,count:count};
}

//===============================================================
//===============================================================
function getElsInPos(iSrc,jSrc,type){    //find what objects we have in cell
    var arr = [];
    for (var a = 0; a < gEls.length; a++) {
        if(gEls[a].i===iSrc && gEls[a].j===jSrc && gEls[a].type === type){
            arr.push(gEls[a]);  
        }     
    }
   return arr;
}

//===============================================================
function isElsInPos(iSrc,jSrc,type){    //find what objects we have in cell
    for (var a = 0; a < gEls.length; a++) {
        if(gEls[a].i===iSrc && gEls[a].j===jSrc && gEls[a].type === type){
            return gEls[a] ;
        }     
    }
   return null;
}

//===============================================================
//===============================================================
//===============================================================
//===============================================================
function clickedRight(cell,i,j,event){
        //gBoard[i][j].clicked = true;
    if (gBoard[i][j].val === "B") boom(cell,i,j);
    if (gBoard[i][j].val === 0)   cell0(cell,i,j);
    if (gBoard[i][j].val > 0)       showCell(cell,i,j);

}

//===============================================================
//floor=1 wall=2 man=3 box=4
function generStartArr(){
    for (var i = 0; i < gI; i++) {
        gArr[i]=[];
        for (var j = 0; j < gJ; j++) {
            if (i===0 || i===gI-1 ||j===0 || j===gJ-1) {
               gArr[i][j] = 'W';
               gEls.push({i:i,j:j,type:'W'})
            }else{
               gArr[i][j] = 'F';
            }
        }
    }
   //return arr;
}

//===============================================================
function    closepopUp(){
    var elPopup     = document.querySelector('.popUp');
    elPopup.style.visibility    = 'hidden';
}
//===============================================================
