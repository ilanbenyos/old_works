"use strict";

var gGame = true;
var gIBoard = 15;
var gJBoard = 15;
var gBobmbRand = 0.1 ;     //randomality of bombs in board
var gCount = 0;
var gBoard = generBoard(gBobmbRand);
generNums(gIBoard, gJBoard, gBoard)
generTable();

//===============================================================
//===============================================================
function restartGame(newI,newJ){
    var tableObj = document.getElementById("table");
    tableObj.innerHTML = "";
    //var oDeletedTable = oTableData.parentNode.removeChild(tableObj);  
     gGame = true;
    gIBoard = newI;
    gJBoard = newJ;
    gBobmbRand = 0.1 ;     //randomality of bombs in board
    gCount = 0;

    gBoard = generBoard(gBobmbRand);
    generNums(gIBoard, gJBoard, gBoard);
    generTable();
}



//===============================================================
//===============================================================

//===============================================================
function clicked(cell,i,j,event){
    if (event.button ===0){
        clickedRight(cell,i,j,event);
    }else{
        clickedLeft(cell,i,j,event);
    }
}
//===============================================================
function clickedLeft(cell,i,j,event){
    
    if (gBoard[i][j].clicked=== false){
        if(gBoard[i][j].checkes === true){
            gBoard[i][j].checkes= false;
            cell.className -= ' flag'   ;
        }else{
            gBoard[i][j].checkes= true;
            cell.className += ' flag'   ;
        }
    }
       // .className += ' new-class';
}
//===============================================================
//===============================================================
function clickedRight(cell,i,j,event){
        //gBoard[i][j].clicked = true;
    if (gBoard[i][j].val === "B") boom(cell,i,j);
    if (gBoard[i][j].val === 0)   cell0(cell,i,j);
    if (gBoard[i][j].val > 0)       showCell(cell,i,j);

}
//===============================================================
//===============================================================
//===============================================================



function filterNbors11111111111(i,j,arr){
   var arr1 = [];
   for (var a = 0; a < arr.length; a++) {
       var el = arr[a];
        var i1 = el.i;
        var j1 = el.j;
        if (i1===i||i1===j||j1===i||j1===j ){
            arr1.push(el);
        }
    }
    return arr1
}
//===============================================================
//===============================================================
function generFilterNbors(i,j,cell){
   var arr =generNbors(i,j)
   var arr1 = [];
   for (var a = 0; a < arr.length; a++) {
       var el = arr[a];
        var i1 = el.i;
        var j1 = el.j;
            if (i1===i||i1===j||j1===i||j1===j ){
                arr1.push(el);
                var cell1 = document.getElementById('cell'+i1+'q'+j1);
                //cell1.classList.add("rrr")
            }

        
    }
    return arr1
}
//===============================================================
function filterClickedNbors(arr){
    arr= arr.filter(function(el){
        return gBoard[el.i][el.j].clicked === false
    })
    return arr;
}
//===============================================================
function cell0(cell,i,j){
    showCell(cell,i,j);
    
    var nbors = generFilterNbors(i,j,cell);
    // var nbors1 = generNbors(i,j);
    //  var nbors = filterNbors(i,j,nbors1) ;  //filter 8 nbors to 4
        
        
        while (nbors.length > 0){
            var i1 = nbors[0].i;
            var j1 = nbors[0].j;
            var cell1 = document.getElementById('cell'+i1+'q'+j1);
            //cell1.classList.add("ttt")
            //gBoard[i1][j1].clicked = true;
            showCell(cell1,i1,j1);
            if(gBoard[i1][j1].clicked === false){
                //gBoard[i1][j1].clicked === true;
                showCell(cell1,i1,j1);
                if(gBoard[i1][j1].val === 0){
                    var nbors1 = generFilterNbors(i1,j1,cell1);
                    nbors1 = filterClickedNbors(nbors1);
                    nbors = nbors.concat(nbors1);
                    //nbors.push({i:i1,j:j1});
                    //cell1.classList.add("nbors")
                }else{
                    showCell(cell1,i1,j1);
                }
            }
            gBoard[i1][j1].clicked = true;
            nbors.splice(0,1);
            //cell1.classList.remove("ttt")

        }

    //checkForBombs(nbors);
}
//===============================================================
function showCell(cell,i,j){
    //gBoard[i][j].clicked = true;
    var val =  gBoard[i][j].val;
    if (gBoard[i][j].clicked ===false){
        var className = 'cell'+val;
        cell.classList.add(className)   
        cell.innerHTML = val;
        if (val === 0) cell.className += ' cell0After';
        
        //cell.className -= ' flag'   ;
        cell.classList.remove("flag")
        gCount ++;
        console.log(gCount);
    }
        
    if (gCount === gIBoard * gJBoard ){
        gGame = false;
        //alert('victory!');
    }
}
//===============================================================
// function boom(cell,i,j){
//     gGame = false;
//     var bombsArr = document.getElementsByClassName('cell');
//     for (var cell = 0; cell < bombsArr.length; cell++) {
//        if (bombsArr[cell].val=== "B") bombsArr[cell].classList += " bombAfter";
//         bombsArr[cell].innerText = bombsArr[cell].textContent;

        
//     }
//     //cell.className = " deathBomb";
// }
//===============================================================
function boom(cell,i,j){
    gGame = false;
    var bombsArr = document.getElementsByClassName('bomb');
    for (var cell = 0; cell < bombsArr.length; cell++) {
        
        bombsArr[cell].classList += " bombAfter";
        //showCell(cell,i,j);
    }
    showAll();
}

//===============================================================
function showAll(){
    for (var i = 0; i < gIBoard; i++) {
        for (var j = 0; j < gJBoard; j++) {
            if (gBoard[i][j].val !='B') {
                var cell = document.getElementById('cell'+i+'q'+j);
                cell.innerText = gBoard[i][j].val;
            }
            if (gBoard[i][j].val === 0) cell.className += ' cell0After';

        }
    }
}


//===============================================================
//===============================================================
//===============================================================
//===============================================================
//===============================================================


function generNbors(i,j){
     var arr = [];
     
    //  arr.push({i:i-1,j:j-1});
    //  arr.push({i:i+1,j:j-1});
    //  arr.push({i:i-1,j:j+1});
    //  arr.push({i:i+1,j:j+1});
    // arr= arr.filter(function(el){
    //     var i1 = el.i;
    //     var j1 = el.j;
    //     return (i1>=0 && i1< gIBoard && j1>=0 && j1< gJBoard )
    // });
     for (var a = i-1; a <= i+1; a++) {
        for (var b = j-1; b <= j+1; b++) {
            if (a>=0 && a< gIBoard ){
                if( b>=0 && b< gJBoard ){
                    if( a!=i || b!=j){
                        arr.push({i:a,j:b});
                    }
                }
            }
        }
    }
   return arr;
}
//===============================================================
function checkForBombs(arr){
    var count = 0;
    for (var nbor = 0; nbor < arr.length; nbor++) {
    //for(var nbor in arr){
        var i = arr[nbor].i;
        var j = arr[nbor].j;
        if(gBoard[i][j].val === 'B'){
            count ++;
        }
    }
    return count;
}
//===============================================================
function generNums(){
    for (var i = 0; i < gIBoard; i++) {
        for (var j = 0; j < gJBoard; j++) {
            if (gBoard[i][j].val !='B') {
                var nborsArr = generNbors(i,j);     //create arr of nbors
                var nborsCount = checkForBombs(nborsArr);  //check how many nbors are bobms 
                gBoard[i][j].val = nborsCount;
                //gBoard[i][j] = nborsCount;
            }
        }
    }
}
//===============================================================
//===============================================================
function generBoard(){
    var arr=[];
    for (var i = 0; i < gIBoard; i++) {
        arr[i]=[];
        for (var j = 0; j < gJBoard; j++) {
           var rand = Math.random() ;
           var val = null;
           if (rand < gBobmbRand){
                val = 'B';
            }
            arr[i][j] = {val: val, clicked :false, checkes: false}
        }
    }
    //arr = generNums(iBoard, jBoard, arr)
    return arr;
}

//===============================================================
function generCellClasses(i,j){
    var cellClass = 'cell ';
    if (gBoard[i][j].val === 'B' ){
            cellClass+=' bomb';
    }else{ 
        cellClass+= 'cell'+ gBoard[i][j].val;
    }
    cellClass+=' hidden';
    return cellClass;
}
//===============================================================
function generTable(){
    var tableEl = document.getElementById('table');
    for (var i = 0; i < gIBoard; i++) {
        var row = tableEl.insertRow(0);
        for (var j = 0; j < gJBoard; j++) {
            var cell = row.insertCell();
            cell.setAttribute('id', 'cell'+ i+'q'+j );
            //cell.setAttribute('class', 'cell');
            var cellClasses = generCellClasses(i,j);
            cell.className = cellClasses;
            //cell.classList.add(cellClasses)
            var funToEx =  "clicked(this," + i + ","+ j +",event)";
            cell.setAttribute('onmousedown', funToEx);
            
            //cell.innerHTML = gBoard[i][j].val;
            //createBtn(cell,i,j,'clicked')
        }
    }
}
//===============================================================
