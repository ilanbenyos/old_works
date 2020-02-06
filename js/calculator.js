console.log('App is starting');
 
var gOldCur = '';
var gOldOp ='';
var gCurStr = '';
var gAccNum = '';
var gOp = '';

//=============================================================
//=============================================================
function rr(par){
    console.log ('experiment====', par);
}
 //mainFun(rr);
function mainFun(fun, a){
    fun(a)
}
//=============================================================
function resetRes(){
    gAccNum = '';
    elPanel = document.querySelector('.panelRes');
    elPanel.innerText = '';


}
//=============================================================
function resetAllPar(){
    gCurStr = '';
    gAccNum = '';
    gOp = '';
}
//=============================================================
 function resetAll(){
    resetAllPar() ;
    resetAllPanels();
 }   
    
//=============================================================
function printConsole(){
    console.log ('cur:', gCurStr , '; op:',gOp, '; res:',gAccNum,'; oldcur:',gOldCur, '; oldOp: ', gOldOp  )
}
//=============================================================
function printPanels(){
    printConsole()
    gOldOp = gOp;       //make current num and op old par
    gOldStr = gCurStr;

    var elPanel = document.querySelector('.panel');
    elPanel.innerText = gCurStr;
    elPanel = document.querySelector('.panelOp');
    elPanel.innerText = gOp;
    elPanel = document.querySelector('.panelRes');
    elPanel.innerText = gAccNum;
    printConsole();
}
//=============================================================

//=============================================================
function resetAllPanels(){
    // gCurStr = '';
    // gAccNum = 0;
    // gOp = undefined;
        var str = '.panel'
        resetPanel('.panel');
        resetPanel('.panelOp');
        resetPanel('.panelRes');
}

//=============================================================
function turnMinus(){
    if (gCurStr != '' ){
        gCurStr = gCurStr* (-1);
    }
    if (gCurStr === '' &&  gAccNum != '' ){
        gAccNum = gAccNum* (-1);
        gOp = '';
    }
    
    printPanels();
}
//=============================================================
function resetPanel(str){  //get's panels name and reset it
        var elPanel = document.querySelector(str);
        elPanel.innerText = '';
}
//=============================================================
function sqr(num){
    var temp = Math.pow(+gCurStr, num);
    if (!gCurStr)   temp = Math.pow(+gAccNum, num);

    //resetAllPanels();
    resetAll()
    gAccNum =temp;
    printPanels()
}

//=============================================================
function persent(){
    if(gCurStr != '' && gAccNum !=''){
        gAccNum = gAccNum / 100 * gCurStr;
        gCurStr = ''
    }
    gOp = '';
    printPanels();
}
//=============================================================
function diverseX(){
    if(gCurStr != '' ){
        gAccNum = 1/gCurStr ;
       gCurStr = '';
    }else if(gAccNum != ''){
        gAccNum = 1/gAccNum ;
    }
    gOp = '';
    printPanels();
  
}
//=============================================================
function clearLog(opt){
    if (opt ==='ce'){
        resetPanel('.panel');
        gCurStr = '';

    }
    if (opt ==='c'){
        resetAll();
    }

}

//=============================================================
//=============================================================
function backSpace(){
    var len = gCurStr.length 
    gCurStr = gCurStr.slice(0, gCurStr.length-1);
        printPanels();
}
//=============================================================
function calcResult(){
    //var temp = 0;
        num2 = Number(gAccNum);
        num1 = Number(gCurStr);
       
    switch (gOp) {
        case  '+':
            gAccNum = num2 + num1;
            break;
        case  '-':
            gAccNum = num2 - num1;
            break;
        case  'X':
            gAccNum = num2 *num1;
            break;
        case  '/':
            gAccNum = num2 / num1;
            break;
        case  '':
            gAccNum = gCurStr;
            break;
        
    }
    
    if ( gAccNum != '') {
        //set numbers panel
        var elPanel = document.querySelector('.panelRes');
        elPanel.innerText = gAccNum;
    }
    gOp = '';;
    gCurStr = '';
       printPanels();
      
}
//=============================================================
function addDigit(dig){
    if (gOp ==='' ) {
        resetRes();
    }
     gCurStr += '' + dig;
    printPanels();
}
//=============================================================
function setOperator(op){
    if (gOp==='')  gOp =  op;
    //set numbers panel
    if(gCurStr != '' && gAccNum !='' ){
        calcResult();
       gCurStr = '' ;
    }
    gOp = op;
    if(gCurStr != '' && gAccNum==='' ){
       gAccNum = gCurStr ;
       gCurStr = '';
    }


    
    printPanels();
}
//=============================================================
