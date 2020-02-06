"use strict";

var gI={
        boxs:[  {id:0, id: 'balloons',  i:230,j:464,iD:-1.2,jD:-1.2},
                {id:1, id: 'calculator',i:123,j:120,iD:1.1,jD:1},
                {id:2, id: 'mines',i:221,j:333,iD:0.2,jD:-0.7},
                {id:3, id: 'sokoban',i:121,j:323,iD:-1,jD:2},
                {id:4, id: 'maze',i:142,j:23,iD:1,jD:-2},
                {id:5, id: 'tetris',i:172,j:253,iD:-1.3,jD:-.6},
                {id:5, id: 'snake',i:457,j:243,iD:-.6,jD:1.2},
                {id:5, id: 'sudoku',i:273,j:394,iD:1.5,jD:1},
                {id:5, id: 'booksRUs',i:174,j:233,iD:1,jD:1.2},
                {id:5, id: 'numbers',i:223,j:122,iD:0.8,jD:1},
        ],
        steps:1,
        speed:20,
        buffer:10


}
init();
//====================================================================
function init(){
    initBallsPar();
    setInterval(makeMove, gI.speed);
}
//====================================================================
function initBallsPar(){
    for (var i = 0; i < gI.balls.length; i++) {
        var ballObj =  gI.balls[i];
        var ballEl = getElByObj(ballObj)
        updateObjvals(ballObj,ballEl);
    }
}

//====================================================================

function makeMove(){
    for (var i = 0; i < gI.balls.length; i++) {
        var ballObj =  gI.balls[i];
        var obj2 = checkBooms(ballObj,i)
        if (obj2){
            boom(ballObj,obj2);
        }
        moveBall(ballObj)
    }
    //var radius = checkBallsWidth(ballObj);
}
//====================================================================
function checkBooms(obj1,idx){
    var boxsArr = gI.balls;
    var len = boxsArr.length
    for (var a = 0; a < len-1; a++) {
        if (a!=idx) {
           var obj2 = gI.balls[a];
           if( checkBoom2Obj(obj1,obj2)) return obj2; ;
           
        }
    }
    return false;
}
//====================================================================
function moveBall(ballObj){
        moveObj(ballObj);
        moveEl(ballObj);
}
//====================================================================
function makeMoveEls111111111111111(){
    for (var i = 0; i < gI.balls.length; i++) {
        var ballObj =  gI.balls[i];
        moveEl(ballObj);
    }
    //var radius = checkBallsWidth(ballObj);
}
//====================================================================


function getDist2Points(p1,p2){
    var iDist = Math.pow(p1.iX-p2.iX, 2);
    var jDist = Math.pow(p1.jX-p2.jX, 2);
    var dist = Math.pow(iDist+jDist, 0.5);
    return dist
}

//====================================================================
function checkBoom2Obj(obj1,obj2){
    var x1 = obj1.points.x
    var x2 = obj2.points.x
    
    var dist = getDist2Points(x1,x2);
    var boomDist = (obj1.dimentions.height + obj2.dimentions.height)/4;
    if (dist< boomDist) 
        return true;

    return false;
}

//====================================================================
function boom(obj1,obj2){
    //var ballObj = getobjByEl(el1);
    obj1.iD *= -1;
    obj1.jD *= -1;
    moveBall(obj1)
    moveBall(obj1)
    //moveEl(ballObj)
    //boxObj = getobjByEl(el2);
    obj2.iD *= -1;
    obj2.jD *= -1;
    moveBall(obj2)
    moveBall(obj2)
    //moveEl(ballObj)
}

//====================================================================
function getobjByEl(el){
    var elId = el.id;
    for (var i = 0; i < gI.balls.length; i++) {
        if(el.id === gI.balls[i].id){
            return gI.balls[i];
        }
    }
    return false;
}

//====================================================================
//====================================================================
function  makePos(boxObj){
    var boxEl = document.getElementById(boxObj.id);
    boxEl.style.bottom = boxObj.i + 'px';
    boxEl.style.left = boxObj.j + 'px'; 

}
//====================================================================
function moveEl(ballObj){
    var ballEl = document.getElementById(ballObj.id);
    var rect = getRect(ballEl);

    ballEl.style.bottom = ballObj.i + 'px';
    ballEl.style.left = ballObj.j+'px'; 
}
//====================================================================
function moveObj(ballObj){
    var ballEl = document.getElementById(ballObj.id);
    var rect = ballEl.getBoundingClientRect();
    
    var contEl = ballEl.parentElement;
    var cont = contEl.getBoundingClientRect()
    
    updateObjvals(ballObj,ballEl);
    //var cont = gerParRect(boxEl);
    if (rect.bottom >=cont.bottom){
            ballObj.iD = - ballObj.iD;
    }
    if (rect.top <=cont.top){
               ballObj.iD = - ballObj.iD;
    }
    if (rect.left <=cont.left)  {
            ballObj.jD = - ballObj.jD;
    }
    if (rect.right >=cont.right){
             ballObj.jD = - ballObj.jD;
    }
    ballObj.i += ballObj.iD* gI.steps;
    ballObj.j += ballObj.jD* gI.steps;


}

//====================================================================
function updateObjvals(ballObj,ballEl){
    
    var rect = getRect(ballEl);
    var points = getCornersElByRect(rect);
    var x = getXPoint(rect);
    points.x = x;
    ballObj.points= points;
    ballObj.dimentions = {height:rect.h, width:rect.w}
}
//====================================================================
function getCornersElByRect(r){
    //var r = getRect(el);
    
    var corners =  {
                    tl:{i:roundVal(r.t) , j:roundVal(r.l)},
                    tr:{i:roundVal(r.t) , j:roundVal(r.r)},
                    bl:{i:roundVal(r.b) , j:roundVal(r.l)},
                    br:{i:roundVal(r.b) , j:roundVal(r.r)}}

    return corners;
}
//====================================================================


function getXPoint(rect){
    var iX = (2*rect.b-rect.t)/2;
    var jX = (2*rect.r-rect.l)/2;
    return {iX:roundVal(iX),jX:roundVal(jX)}
}

//====================================================================
function gerParRect(boxEl){
    var t = boxEl.clientTop;
    var l = boxEl.clientLeft;
    var h = boxEl.clientHeight;
    var w = boxEl.clientwidth;
    var b=t-h;
    var r=l+w;
    var rect = {t:t,b:b,l:l,r:r}
    
    return rect;
}
//====================================================================
//====================================================================
function roundVal(val){
     return val.toFixed(2);
}
//====================================================================
function getRect(el){
    var r = el.getBoundingClientRect();
    return {t:r.top, b:r.bottom,l:r.left,r:r.right,h:r.height,w:r.width}
}
//====================================================================
// function getCornersArr(el){
//     var r = getRect(el);
//     return ([(r.t,r.l),(r.t,r.r),(r.b,r.l),(r.b,r.r)])
// }
//====================================================================
function getElByObj(obj){
    return  document.getElementById(obj.id);
}


//====================================================================
//====================================================================
//====================================================================
