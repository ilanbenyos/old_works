"use strict";

//===============================================================
//===============================================================
//===============================================================

var G = {
    books: [{ id: 1, title: '007', price: 16, rate: 6, img: 'img/007.jpg' },
            { id: 2, title: 'pluto', price: 12, rate: 8, img: 'img/pluto.png' },
    ],
    tableBtns: [{ name: 'read', class: 'btn-info' },
                { name: 'edit', class: 'btn-warning' },
                { name: 'del', class: 'btn-danger' }],
    mainBoardEl : document.getElementById('mainBoard'),
    initImg : 'img/book.png',
    lastId : 2



}
//===============================================================
//===============================================================
drawBoard();
//===============================================================

//===============================================================
function delTable(){
        //var booksTable = document.getElementById('mainBoard');
        G.mainBoardEl.innerHTML = '';
}
//===============================================================
function addNewBook() {
    //get form values===============================
    var title = document.getElementById('formAddTitle').value;
    var price = document.getElementById('formAddPrice').value;
    var rate = document.getElementById('formAddRate').value;
    var img = document.getElementById('formAddImgFile').value;
    //make sure ing path present and valid=================================
    if (img){
        img = 'img/' +img.split('\\').pop();
    }else{
        img =G.initImg;
    }
    //generat new obj=========================
    var bookObj = {
        title: title,
        price: price,
        rate: rate,
        img: img
    }
    //check if to create new obj or edit old one=====================
    var idEl = document.getElementById('formAddId');
    if (idEl.innerText){        //new obj
        var oldBookObj = getBookObjById(idEl.innerText);
        var idx = getBookIdxById(oldBookObj.id)
        bookObj.id = oldBookObj.id;
        G.books[idx] = bookObj;
    }else{      //existing obj
        G.lastId ++;
        bookObj.id = G.lastId ;
        G.books.push(bookObj);
    }
   //final the move================================= 
   delTable();
   drawBoard();
  
    
   closeNav();
}
//===============================================================
function initForm11111111111(){
    document.getElementById('formAddTitle').value   =null;
    document.getElementById('formAddPrice').value   =null;
    document.getElementById('formAddRate').value    =null;
    document.getElementById('formAddImgFile').value =null;

    closeNav();
}
//===============================================================
function getIdxById(id) {
    for (var i = 0; i < G.books.length; i++) {
        if (G.books[i].id = id) return i
    }
}

//===============================================================
function drawBoard() {

    generBoardHead(G.mainBoardEl);
    for (var i = 0; i < G.books.length; i++) {
        generBookLine(i, G.mainBoardEl);
    }
}
//===============================================================
//{id:1,name:'007',price:16,rate:6}

function generBookLine(bookIdx, el) {
    var div = document.createElement("div");        // Create a <button> element
    var rowDivEl = el.appendChild(div);                                // Append the text to <button>

    rowDivEl.classList.add('bookLine');
    generBookKeys(rowDivEl, bookIdx);
    generBtns(rowDivEl, bookIdx);
    //generBtns(rowEl,bookIdx)
}
//===============================================================
function generBoardHead(parerntEl) {    //create header
    if(G.books.length ===0) return;

    var keysNames = Object.keys(G.books[0]);
    var boardHeadLineEl = generDiv(parerntEl,' ',['bookLine']);
    var boardHeadKeysEl = generDiv(boardHeadLineEl,' ',['bookKeys']);
    
    
    for (var key in keysNames) {
        var KeyCaption = keysNames[key];
        generDiv(boardHeadKeysEl,KeyCaption,['bookKey',KeyCaption]);
    }

}
//===============================================================
function generDiv(parentEl,caption,classArr){
    var div = document.createElement("div");        // Create a <button> element
    var divKeyEl = parentEl.appendChild(div);                                // Append the text to <button>
    
    div.innerText = caption;

    classArr.forEach(function(className) {
        divKeyEl.classList.add(className);
    }, divKeyEl);
    return divKeyEl;
}



//===============================================================
function generBookKey(divKeysEl,keyVal,keyIdx, bookIdx,bookObj){
    var div = document.createElement("div");        // Create a <button> element

    var divElv = generDiv(boardHeadLineEl,KeyCaption,['bookKey',keyIdx]);
    
    //if (keyIdx==='title')     divKeyEl.classList.add('title');

    //=============img/ text==========
    var key = Object.keys(bookObj)[keyIdx];
    if (keyIdx==='img'){
        var img = document.createElement("img");
        img.setAttribute("src", bookObj.img);
        divElv.appendChild(img);
    }

}
//===============================================================

function generBookKeys(rowDivEl, bookIdx) {
     var div = document.createElement("div");        // Create a <button> element
    var keysDivEl = rowDivEl.appendChild(div);                                // Append the text to <button>
    var bookObj = G.books[bookIdx]
    keysDivEl.classList.add('bookKeys');

    
        var divElv = generDiv(keysDivEl,bookObj.id,['bookKey','id']);
       var divElv = generDiv(keysDivEl,bookObj.title,['bookKey','title']);
       var divElv = generDiv(keysDivEl,bookObj.price,['bookKey','price']);
       var divElv = generDiv(keysDivEl,bookObj.rate,['bookKey','rate']);
       var divElv = generDiv(keysDivEl,bookObj.img,['bookKey','img']);
            
        divElv.innerText = '';
        var img = document.createElement("img");
        img.setAttribute("src", bookObj.img);
        divElv.appendChild(img);


}

//===============================================================
function generBookKeys11111(rowDivEl, bookIdx) {
     var div = document.createElement("div");        // Create a <button> element
    var keysDivEl = rowDivEl.appendChild(div);                                // Append the text to <button>
    var bookObj = G.books[bookIdx]
    keysDivEl.classList.add('bookKeys');
    
    var div = document.createElement("div");        // Create a <button> element
    
    for (var keyIdx in bookObj) {
        var KeyCaption = bookObj[keyIdx];

       var divElv = generDiv(keysDivEl,KeyCaption,['bookKey',keyIdx]);
    //=============img/ text==========
        if (keyIdx==='img'){
            divElv.innerText = '';
            var img = document.createElement("img");
            img.setAttribute("src", bookObj.img);
            divElv.appendChild(img);
            
        }

    }
}
//===============================================================

function generBtns(rowDivEl, bookIdx) {
     var div = document.createElement("div");        // Create a <button> element
    var divKeysEl = rowDivEl.appendChild(div);                                // Append the text to <button>
    divKeysEl.classList.add('btnsDiv');
    for (var btnIdx in G.tableBtns) {
        generBtn(divKeysEl, bookIdx, btnIdx);
    }

}
//===============================================================
// tableBtns: [{name:'read',class:'btn-info'},

function generBtn(cellEl, bookIdx, btnIdx) {
    var btnType = G.tableBtns[btnIdx];
    var caption = btnType.name;
    var btnClass = btnType.class;
    var bookObj = G.books[bookIdx];
    
    var btn = document.createElement("BUTTON");        // Create a <button> element
    var txt = document.createTextNode(caption);       // Create a text node

    btn.appendChild(txt);                                // Append the text to <button>
    cellEl.appendChild(btn);

    btn.classList.add('btn');
    btn.classList.add(caption);
    btn.classList.add('btn');

    var funTxt = caption + "(this," + bookObj.id+ ")";
    btn.setAttribute('onclick', funTxt);

}

//===============================================================
function add(){
    openNav();
     $(".del").addClass("hidden1");
     $(".edit").addClass("hidden1");
     $(".add").removeClass("hidden1");
     $("input").prop('disabled', false);

}
//===============================================================
function read(bookEl,bookId){
    var bookObj = getBookObjById(bookId)    
    openBook(bookId);

    $("input").prop('disabled', true);
     $("#formInputImg").addClass("hidden1");

     $(".add").addClass("hidden1");
     $(".del").removeClass("hidden1");
     $(".edit").removeClass("hidden1");
}
//===============================================================
function closeForm(){
    closeNav();
}
//===============================================================
function delBook(){
    var id = getBookIdByFormId();
    del(false, id);
    closeForm();

}
//===============================================================
function getBookIdByFormId(){     
    var id = document.getElementById('formAddId').innerText;
    if(id) return id;
    return null;
}
//===============================================================
function del(btnEl, bookId){
    var idx = getBookIdxById(bookId);
    var arr= G.books;
    if (idx || idx ===0){
        arr.splice(idx,1);
    }
    console.log(G.books);
    delRow(btnEl);

}
//===============================================================
function openBook(bookId){
    var bookObj = getBookObjById(bookId);
    openNav();

    document.getElementById('formAddTitle').value = bookObj.title;
    document.getElementById('formAddPrice').value= bookObj.price;
    document.getElementById('formAddRate').value = bookObj.rate;
    
    document.getElementById('formImg').src = bookObj.img;
    var idEl = document.getElementById('formAddId');
    
    idEl.classList.remove("hidden1");

    idEl.innerText = bookObj.id;

}
//===============================================================
function edit(btnEl, bookId){
    var idx = getBookIdxById(bookId);
    //var bookObj = getBookObjById(bookId)
     
     read(true,bookId)
    openToEdit();
    $(".add").removeClass("hidden1");
}
//===============================================================
function editBook(){
    
    var bookId = getBookIdByFormId();
     $(".add").removeClass("hidden1");
    openBook(bookId);
    openToEdit();
}
//===============================================================
function openToEdit(){
    $("input").prop('disabled', false);
         $("#formInputImg").removeClass("hidden1");
}
//===============================================================
function delRow(btnEl){
    var mainBoardEl = document.getElementById('mainBoard');
    if (btnEl){
        var rowEl = btnEl.parentElement.parentElement;
        mainBoardEl.removeChild(rowEl);
    }else{
        eraseBoard();
        drawBoard();
    }
}
//===============================================================
function initForm(){
    document.getElementById('formAddTitle').value = null;
    document.getElementById('formAddPrice').value=null;
    document.getElementById('formAddRate').value = null;
    
    document.getElementById('formImg').src = G.initImg;

    var idEl = document.getElementById('formAddId');
    
    idEl.classList.remove("hidden1");

    idEl.innerText = null;
}

//===============================================================
function eraseBoard(){
    var mainBoardEl = document.getElementById('mainBoard');
    mainBoardEl.innerHTML = '';
}

//===============================================================
function getBookIdxById(id){
    for (var i = 0; i < G.books.length; i++) {
            var id1 = G.books[i].id
            if( id1 == id) return i;
    }
    return null
}
//===============================================================
function getBookObjById(id){
    for (var i = 0; i < G.books.length; i++) {
        if(G.books[i].id == id) {
            return G.books[i];
        }
    }
    return null
}
//===============================================================
function getBookIdxById(id){
    for (var i = 0; i < G.books.length; i++) {
        if(G.books[i].id == id) {
            return i;
        }
    }
    return null
}

//===============================================================


//===============================================================
/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
     $(".add").removeClass("hidden1");
     $(".del").removeClass("hidden1");
     $(".edit").removeClass("hidden1");
     
     //dontRefresh()
     initForm();

}
