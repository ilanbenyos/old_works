 "use strict";
console.log('App is starting');
 

var balsLen = 30;
//var gBals = genergBals(gStartBals)
var gIntervalBals = null;
var gMaxBalRad = 50;
var gMinBalRad = 20;
var gScreenWitdh = 800;
var gScreenHeight = 350;
var speedIncrease = 0.03;
var gRunningId =0;
var gBals = [];
var opacityDec = 0.1;      //decrease of opacity by move
var score = 0;
var scoreLevel = 20;
generGBals(balsLen);
startGame();
//=============================================================
function generGBals(balsLen){           
    var tempArr = [];
    for (var id = 0; id < balsLen; id++) {
        var balObj =  generBal()
        tempArr.push(balObj);
        
    }
}

//=============================================================
function generBal(){
    var randColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    var left = Math.floor( (Math.random() * (gScreenWitdh-gMaxBalRad)));
    //var left = id * 50;
    var randBottom = Math.floor(gMaxBalRad - (Math.random() * (gScreenWitdh-gMaxBalRad)) );
    var randRadius = Math.floor(gMinBalRad + Math.random() * (gMaxBalRad - gMinBalRad));
    var randSpeed =Math.random() ;


     gRunningId ++;       //get id from global var  
     var id =  gRunningId;

    var balObj =    {id         :id,
                    bottom      : randBottom,
                    left        : left,
                    speed       : randSpeed,
                    class       : 'balloon balloon4',
                    boom        : false,
                    text        : id,
                    radius      : randRadius,
                    onclick     : 'boom(this,'+ id + ')',
                    onmouseover : 'boom(this,'+ id + ')',
                    opacity     : 1,
                    bgcolor     : randColor }
    gBals.push(balObj);

     generBalDiv(balObj);
    console.log(balObj)
    //console.log(gBals)
    return balObj
}
//=============================================================
function generBalDiv(balObj){
    
    var txtLeft      = ' ; left: ' + balObj.left + 'px';
    var txtBottom    = ' ; bottom: ' + balObj.bottom + 'px';
    var txtBgcolor   = ' ; background-color: ' + balObj.bgcolor ;
    var txtOpacity   = ' ; opacity: ' + balObj.opacity ;
    var txtHeight    = ' ; height: ' + 2 * balObj.radius + 'px';
    var txtwidth     = ' ; width: ' + 2 * balObj.radius + 'px';
    
    var txtStyle =txtBottom + txtLeft + txtBgcolor +txtHeight + txtwidth + txtOpacity ;

    var skyOjb = document.querySelector('.sky');

    var newDiv = document.createElement("div");
    //newDiv.innerHTML = '<span>' + balObj.id + '</span>'
    document.getElementById('sky').appendChild(newDiv);
    
    newDiv.setAttribute('id', balObj.id);
    newDiv.setAttribute('class', balObj.class);
    //newDiv.setAttribute('onclick', balObj.onclick);
    newDiv.setAttribute('onmouseover', balObj.onmouseover);
    newDiv.setAttribute('style', txtStyle);
    

}
//=============================================================
function setAttributes(el, balObj) {
  for(var key in balObj) {
    el.setAttribute(key, balObj[key]);
  }
}
//=============================================================
//=============================================================
function restartGame(btn){
    if (gIntervalBals){
        clearInterval(gIntervalBals);
        gIntervalBals = null;
    }
   startGame();
}
//=============================================================
function startGame(){
    //gBals = genergBals();
    toggleGame()
}
//=============================================================

function toggleGame(btn) {
    //gStartTime = Date.now();
    if (!btn){
        var btn = document.querySelectorAll('.btnRestart');
    }
    if(gIntervalBals){
        clearInterval(gIntervalBals);
        btn.innerText='start';
        gIntervalBals = null;
    }else{
        gIntervalBals = setInterval(moveBals, 50);
        btn.innerText='stop';
    }

}
//=============================================================
function boom(balDiv,id){
    var id = balDiv.id;   
    var balObj = getObjById(gBals,id);
    if(balObj.boom === false){
        balObj.boom = true;
        balDiv.innerText = 'BLOOP!'
        //generBal();
        score ++
        //generate another balloon if we rised level
        if (score % scoreLevel === 0) generBal();
    }
}

//=============================================================
function deleteBal(id){     // delete the ballon from arr and div
        console.log ('before delete:' , gBals.length);
        
        //var balDiv = balDiv.id;
        var pos = getPosById(gBals,id);
        gBals.splice(pos,1);        //delete from arr
        var divBal = document.getElementById(id);
        divBal.parentNode.removeChild(divBal);
        generBal()
        console.log ('after delete:', gBals.length);
}

//=============================================================
//func gets arr and value and return the wanted pos
function getPosById(arr,value) {
  for (var i=0, iLen=arr.length; i<iLen; i++) {
    if (arr[i].id == value) return i;
  }
 return false;
}
//=============================================================
function getObjById(arr,value) {
  for (var i=0, iLen=arr.length; i<iLen; i++) {
    if (arr[i].id == value) return arr[i];
  } 
    return false;

}
//==
//=============================================================
//=============================================================

function moveBals() {
    for(var i in gBals){
        var balEl = gBals[i];
        var id = balEl.id;
        //var balDiv = document.querySelectorAll('.balloon');
        var balDiv = document.getElementById(id);
        if (balEl.bottom > gScreenWitdh){   //balloon out of screen
            //deleteBal(id);
            balEl.boom = true;
            //generBal();
        }
        if (balEl.boom != false){
            balEl.opacity -= opacityDec;
            balDiv.style.opacity = balEl.opacity;
        }
        if (balEl.opacity <=0){
            deleteBal(id); //delete ballon after opacity = 0
        }
        balEl.bottom += balEl.speed     //bal poss in arr
        balDiv.style.bottom = balEl.bottom +'px';
        balEl.speed += speedIncrease;
        
    }
}
//=============================================================
//=============================================================
//=============================================================
//=============================================================
//=============================================================
//=============================================================
//=============================================================
