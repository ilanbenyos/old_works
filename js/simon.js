var gNotes = [  { color: 'blue' },
                { color: 'red' },
                { color: 'yellow' },
                { color: 'green' }]

var gState;
var gFreePlay = false;
var gSounds = ['horse','chicken','cow','frog','duck','dog']
//==========================================================================
function getInitialState() {
    return {
        seqIdxs: [],
        isUserTurn: false,
        currUserNoteIdx: 0
    }
}
//==========================================================================
function init() {
    gState = getInitialState();
    renderPiano();
    doComputerTurn();
}
//==========================================================================
function renderPiano() {
    var strHtmls = gNotes.map(function (note, i) {

        var strOnClick = ' onclick="noteClicked(this, ' + i + ')" ';
        
        var strHtml = '<button ' + strOnClick + ' class="' + note.color + '"></button>';
        return strHtml;
    });

    var elPiano = document.querySelector('.piano');
    elPiano.innerHTML = strHtmls.join('');
}

//==========================================================================
function doComputerTurn() {
    tellUser('Computer Turn');
    addNote();
    playNotesSeq();
    gState.currUserNoteIdx = 0;
}

//==========================================================================
function addNote() {
    var seqIdx = getRandomInt(0, gNotes.length);
    gState.seqIdxs.push(seqIdx);
}
//==========================================================================
function playNotesSeq() {
    var elNotes = document.querySelectorAll('.piano button');
    gState.seqIdxs.forEach(function handleNote(seqIdx, i) {
        setTimeout(function () {
            playNote(elNotes[seqIdx],seqIdx);
        }, 1000 * (i + 1));
    });

    // After all notes were played:
    setTimeout(function () {
        tellUser('Your Turn');
        gState.isUserTurn = true;
    }, 1000 * (gState.seqIdxs.length + 1));

}

//==========================================================================
// Called from DOM
function noteClicked(elNote, idxUserClicked) {
    if (!gState.isUserTurn) return;
    if (gFreePlay === true){
        playNote(elNote, idxUserClicked);
        return;
    } 

    playNote(elNote, idxUserClicked);


    var noteIdxCorrect = gState.seqIdxs[gState.currUserNoteIdx];

    if ( idxUserClicked === noteIdxCorrect ) {
        // If user done playing the curr seq
        if (gState.currUserNoteIdx === gState.seqIdxs.length - 1) {
            doComputerTurn();
        } else {
            gState.currUserNoteIdx++;
        }
    } else {
        alert('Game Over, try Again!');
        init();
    }

}
//==========================================================================
function freeNotes(btnEl){
    if (gFreePlay === false){
         gFreePlay = true;
         btnEl.innerText = 'return to game'
    }else{  
        gFreePlay = false;
        btnEl.innerText = 'free play'
    }

}
//==========================================================================
function playNote(elNote,idx) {
    
    var txt = 'sounds/'+gNotes[idx].color +'.wav' 
    var audio = new Audio(txt);
    audio.play();

    elNote.classList.add('playing');
    setTimeout(function () {
        elNote.classList.remove('playing');
    }, 500)
}
//==========================================================================
function tellUser(msg) {
    var elMsg = document.querySelector('.msg');
    elMsg.innerText = msg;
}

//==========================================================================
function giveMeMore(){
    var sideNav = document.getElementById("mySidenav");
    width = sideNav.style.width;
    var btns = document.querySelectorAll(".freeStyle");
    if (width === '0px' || width === ''){
        openSide();
        btns[1].innerText = 'close';
    }else{
        closeSide() ;
        btns[1].innerText = 'give me more!';

    }
}

//==========================================================================
function openSide() {
    document.getElementById("mySidenav").style.width = "70px";
}
//==========================================================================
function closeSide() {
    document.getElementById("mySidenav").style.width = "0";
}
//==========================================================================
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function playSound(btnEl,idx){
    var txt = 'sounds/'+gSounds[idx] +'.wav' 
    var audio = new Audio(txt);
    audio.play();
}
