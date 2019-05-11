// exemple-1

// var clickCount = 0;
// function clickHandler(evt){
//    clickCount++;
//    console.log(evt);
//    var str = "Thanks for clicking " + clickCount;
//    this.innerText = str;
// }

// var p = document.getElementById("pElement");
// p.addEventListener("click", clickHandler);

//js-1

// function bodyClick(evt) {
//     console.log(evt.pageX, evt.pageY);
//  }
//  window.onclick = bodyClick;

// p5-1

// function setup(){

// }
// function mouseClicked() {
//     console.log(mouseX, mouseY);
//  }

//js-2

// function windowLoad() {
//     console.log("Window is loaded");
//  }
//  window.onload = windowLoad;
//  // .addEventListener("onload",windowLoad)
 
//p5-2

// function setup(){

// }
// function preload() {
//     console.log("Window is loaded");
//  } 

//js-3

// function keydown(evt) {
//     console.log("You printed " + evt.key);
//  }
//  window.onkeydown = keydown;
//  // .addEventListener('keydown', keydown);
 

//p5-3

// function setup(){

// }
// function keyPressed() {
//     console.log(key);
//  }

//chat

function main() {
    var socket = io();
    var chatDiv = document.getElementById('chat');
    var input = document.getElementById('message');
    var button = document.getElementById('submit');
 
    function handleSubmit(evt) {
        var val = input.value;
        if (val != "") {
            socket.emit("send message", val);
        }
    }
    button.onclick = handleSubmit;
    function handleMessage(msg) {
        var p = document.createElement('p');
        p.innerText = msg;
        chatDiv.appendChild(p);
        input.value = "";
}

socket.on('display message', handleMessage);
} // main closing bracket

window.onload = main;   