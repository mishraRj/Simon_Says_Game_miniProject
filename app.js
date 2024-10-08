let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let highScore = 0;

let h3 = document.createElement("h3");
h3.innerText = `High score: ${highScore}`;
document.body.prepend(h3);

let btns = ["red", "green", "yellow", "purple"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game started");
        started = true;

        levelUp();
    }
});


function gameFlash (btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    },300);
}

function userFlash (btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    },200);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //random Button
    let randIndex = Math.floor(Math.random () * 4);
    let randColor = btns[randIndex];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);
}

function checkAns (idx){
    // console.log(`Current level: ${level}`);
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score : <b>${level}</b> <br> Press any key to star again.`;
        document.querySelector("body").style.backgroundColor = "maroon";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "#212121";
        },150);
        
        if(level > highScore){
            highScore = level;
            h3.innerText = `High score: ${highScore}`
        }
        
        reset();
    }
}

function btnPress () {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}