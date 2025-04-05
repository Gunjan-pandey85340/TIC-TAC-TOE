let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;//prayerX,player0
let count = 0; // to track draw
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

//reset game
const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");

}

//box click handler

boxes.forEach((box) => {
    box.addEventListener("click" , () => {
        // console.log("box was clicked");
        if(turn0) { //player0
            box.innerText = "0";
            box.style.color = "00f0ff";
            turn0 = false;
        } else { //playerX
            box.innerText = "X";
            box.style.color = "#00f0ff";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if(count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "😐 Match Draw!";
    msgContainer.classList.remove("hide");
    disabledBoxes();
    setTimeout(() => {
        msgContainer.classList.add("hide");
    },3000); //hides msg after 3secs
};

const disabledBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => {
    msg.innerText =`🎉 Winner: ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};



const checkWinner = () =>{
    for(let pattern of winPatterns) {
          let pos1Val =  boxes[pattern[0]].innerText;
          let pos2Val = boxes[pattern[1]].innerText;
          let pos3Val = boxes[pattern[2]].innerText;

          if(pos1Val != "" && pos2Val != "" && pos3Val !="") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner",pos1Val);
                showWinner(pos1Val);
                return true;
            }
          }
        }
    };

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);


