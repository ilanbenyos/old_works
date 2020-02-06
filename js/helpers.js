"use strict";
//===============================================================
//===============================================================
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
//===============================================================
function bodyClicked(){

}
//===============================================================
