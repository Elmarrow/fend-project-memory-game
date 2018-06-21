/*
 * Memory Card Game: A Udacity FEND Project
 * 
 */


//populating cards array
const cardsList = [{
    "name": "PinkFloyd",
    "img": "img/pinkfloyd.jpg"
}, {
    "name": "Blur",
    "img": "img/blur.jpg"
}, {
    "name": "AphexTwin",
    "img": "img/aphextwin.jpg"
}, {
    "name": "JoyDivision",
    "img": "img/joydivision.jpg"
}, {
    "name": "Gybe",
    "img": "img/gybe.jpg"
}, {
    "name": "Funkadelic",
    "img": "img/maggotbrain.jpg"
}, {
    "name": "RussianCircles",
    "img": "img/russian.jpg"
}, {
    "name": "TheOrgan",
    "img": "img/theorgan.jpg"
}];

//Setting up variables for the game
let count, firstChoice, secondChoice, delay, firstClick, moves, matchesCount, interval, second, minute, hour;
const timer = document.querySelector(".timer");
const modal = document.getElementById("modal");


document.body.onload = startGame();

function init() {
    count = 0;
    firstChoice = "";
    secondChoice = "";
    delay = 1000;
    firstClick = null;
    moves = 0;
    matchesCount = 0;
    interval = 0;
    second = 0;
    minute = 0;
    hour = 0;
}

function startGame() {
    init();
    resetTime();

    //Duplicating Array for second identical set
    let wholeGrid = cardsList.concat(cardsList);

    //Random sorting of the wholeGrid array
    wholeGrid.sort(() => 0.25 - Math.random());


    //Choosing div with the class container
    const game = document.getElementsByClassName("container");

    //Create a section with the class grid
    const grid = document.createElement("section");
    grid.setAttribute('class', 'grid');

    //Append the grid section to the container div 
    game[0].appendChild(grid);

    // Displaying the images to the front end
    const frontView = "img/frontview.jpg";
    wholeGrid.forEach(item => {
        const {
            name,
            img
        } = item;
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.name = name;

        const front = document.createElement("div");
        front.classList.add("front");
        front.style.backgroundImage = `url(${frontView})`;

        const back = document.createElement("div");
        back.classList.add("back");
        back.style.backgroundImage = `url(${img})`;

        grid.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
    });

    // Setting event listener for card selection
    grid.addEventListener("click", function (event) {
        let selected = event.target;
        if (selected.nodeName === "SECTION" ||
            selected === firstClick ||
            selected.parentNode.classList.contains("show") ||
            selected.parentNode.classList.contains("success")
        ) {
            return;
        }
        if (count < 2) {
            count++;
            if (count === 1) {
                firstChoice = selected.parentNode.dataset.name;
                console.log(firstChoice);
                selected.parentNode.classList.add("show");
            } else {
                secondChoice = selected.parentNode.dataset.name;
                console.log(secondChoice);
                selected.parentNode.classList.add("show");
            }
            if (firstChoice && secondChoice) {
                if (firstChoice === secondChoice) {
                    setTimeout(success, delay);

                }
                setTimeout(resetMove, delay);
            } else firstClick = selected;

        }
        if (count === 2) {
            movesCounter();
        }

    });

}
//Adding the success class to the shown cards if there is a success
const success = () => {
    const matched = document.querySelectorAll(".show");
    matched.forEach(card => {
        card.classList.add("success");
    });
    matchesCount++;

    if (matchesCount === 8) {
        gameOver();
    }
}

//Removing the show class and resetting count variable
const resetMove = () => {
    firstChoice = "";
    secondChoice = "";
    count = 0;
    firstClick = null;
    let matched = document.querySelectorAll(".show");
    matched.forEach(card => {
        card.classList.remove("show");
    });
};

//reset timer
function resetTime() {
    second = 0;
    minute = 0;
    hour = 0;
    timer.innerHTML = "0 mins & 0 secs";
    clearInterval(interval);
}

// Moves counter function
function movesCounter() {
    moves++;
    const counter = document.querySelector(".moves");
    counter.innerHTML = moves;
    if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    const ranking = document.querySelectorAll(".fa-music");
    if (moves > 13 && moves < 17) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                ranking[i].style.visibility = "collapse";
            }
        }
    } else if (moves > 18) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                ranking[i].style.visibility = "collapse";
            }
        }
    }
}

//Timer logic
function startTimer() {
    interval = setInterval(function () {
        let mins = "<span class='min'> mins & </span>";
        let secs = "<span class='sec'> secs</span>";
        timer.innerHTML = minute + mins + second + secs;
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

// Ending the game
function gameOver() {
    clearInterval(interval);
    finalTime = timer.innerHTML;
    modal.classList.add("showmodal");
    var starRating = document.querySelector(".music").innerHTML;
    document.getElementById("finalMovesCount").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;
    closeModal();
}

function closeModal() {
    const closeicon = document.querySelector(".closedModal");
    closeicon.addEventListener("click", function (e) {
        modal.classList.remove("showmodal");
        document.location.reload;
    });
}

function playAgain() {
    modal.classList.remove("showmodal");
    document.location.reload();
}