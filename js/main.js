
let level = 4;
let mode = 1000;
let category = "programing";
let start = document.querySelector(".control-btns .start");
let tries = document.querySelector(".tries span");
let memoryGame = document.querySelector(".memory-game");
let cards;

// ======================================= section one =======================================

// Start sitting the game 
start.onclick = () => {

    gameInfo();

    // Start get the img and added to html page
    getItems();
    // End get the img and added to html page
}
// End sitting the game 
function gameInfo() {

    // Start set the name of player
    if (document.querySelector("#name-player").value == null || "" ) {
        document.querySelector(".info-container .name span").innerHTML = "مجهول";
    } else {
        document.querySelector(".info-container .name span").innerHTML = document.querySelector("#name-player").value;
    }
    // End set the name of player

    // Start set the level of the game
    level = document.querySelector("#levels").value;
    document.querySelector(".level span").innerHTML = level;
    // Start set the level of the game

    // Start set the category of the game
    category = document.querySelector("#select-category").value;
    document.querySelector(".category span").innerHTML = category;
    // Start set the category of the game
    
    // Start set the category of the game
    mode = document.querySelector("#mode").value;
    document.querySelector(".type-mode span").innerHTML = mode;
    // Start set the category of the game

    // Start remove sitting from game from dom 
    document.querySelector(".control-btns").remove();
    // End remove sitting from game from dom 

}
function getItems() {
    
    let imgRequest = new XMLHttpRequest;
    imgRequest.onreadystatechange = function ()  {
        if (this.readyState === 4 && this.status === 200) {
            console.log(`the request is true`);
            console.log("----------------");
            let imgs = JSON.parse(imgRequest.responseText);
            addData(imgs[1]);
        } else {
            console.log("----------------");
            console.log(`ready state is => ${this.readyState} status is => ${this.status}`);
        }
    }
    imgRequest.open( "Get" ,"../img.json");
    imgRequest.send();
}

function addData(data) {

    // Start add data twice in page
    for (let i = 0; i < 2; i++) {
        for (let i = 1; i <= level; i++) {

            let mainDiv = document.createElement("div");
                mainDiv.className = "card";
                mainDiv.dataset.tech = i;

            let frontDiv = document.createElement("div");
                frontDiv.className = "face front";

            let backDiv = document.createElement("div");
                backDiv.className = "face back";

            let icon = document.createElement("i");
                icon.className = (data[i]);

            backDiv.appendChild(icon);
            mainDiv.appendChild(frontDiv);
            mainDiv.appendChild(backDiv);
            memoryGame.appendChild(mainDiv);
        }
    }
    // End add data twice in page

    diviCards();
    dealWithCards();

}
// توزيع الكروت بشكل عشوائي
function diviCards() {

    cards = Array.from(memoryGame.children);
    let cardsNumRange = [...Array(cards.length).keys()];
    shuffle(cardsNumRange);
    cards.forEach((card,index) =>  card.style.order = cardsNumRange[index])
}
function shuffle(arr) {
    let current = arr.length;
    let random;
    let temp;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = arr[current];
        arr[current] = arr[random];
        arr[random] = temp;
    }
    return temp;
}
// ======================================= section tow =======================================
// dealing with the card
// this will run after add cards and shuffle 


function dealWithCards() {

    cards.forEach(function(oneCard) {

        oneCard.addEventListener("click", ()=> {

            oneCard.classList.add("active");
            let FlippedCards = Array.from(document.querySelectorAll(".card.active"));
            
            if(FlippedCards.length === 2) {
                stopClicking();
                marchCards(FlippedCards[0],FlippedCards[1]);
            }
            
        })
    })

}
function stopClicking() {
    memoryGame.classList.add("no-cliCking");
    setTimeout(() => { memoryGame.classList.remove("no-cliCking")}, mode)
}


function marchCards(firstCard, secondCard) {

    if (firstCard.dataset.tech === secondCard.dataset.tech ) {

        firstCard.classList.remove("active");
        secondCard.classList.remove("active");

        firstCard.classList.add("has-match");
        secondCard.classList.add("has-match");
    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        setTimeout(() => {
                
            firstCard.classList.remove("active");
            secondCard.classList.remove("active");
        }, mode)
    }
}



            //  oneCard.classList.add("active"); 

            // let flipCard = document.querySelectorAll(".card.active")

            // if( flipCard.length === 2) {

            //     stopClicking();

            //     marchCards(flipCard[0], flipCard[1]);     
                 
            // } 