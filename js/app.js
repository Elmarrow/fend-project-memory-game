/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 
// Shuffle function from http://stackoverflow.com/a/2450976
/*function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
*/


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 //populating cards array

 const cardsList = [{
    "name": "PinkFloyd", 
    "img": "img/pinkfloyd.jpg"
 },{
    "name": "Blur",
    "img": "img/blur.jpg"
 },{
    "name": "AphexTwin", 
    "img": "img/aphextwin.jpg"
 },{
    "name": "JoyDivision", 
    "img": "img/joydivision.jpg"
 },{
    "name": "Gybe", 
    "img": "img/gybe.jpg"
 },{
    "name": "Funkadelic", 
    "img": "img/maggotbrain.jpg"
 },{
    "name": "RussianCircles", 
    "img": "img/russian.jpg"
 },{
    "name": "TheOrgan", 
    "img": "img/theorgan.jpg"
 }];

 //Setting up variables for selection and matching
 let count = 0;
 let firstChoice = "";
 let secondChoice = "";
 let delay = 1000;
 let firstClick = null;
 let moves = 0;
 let counter = document.querySelector(".moves");

 //Duplicating Array for second indentical set
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
    const {name, img} = item;
    const card = document.createElement("div");
     card.classList.add("card");
     card.dataset.name = name;

     const front = document.createElement("div");
     front.classList.add("front");
     front.style.backgroundImage= `url(${frontView})`;

     const back = document.createElement("div");
     back.classList.add("back");
     back.style.backgroundImage = `url(${img})`;

     grid.appendChild(card);
     card.appendChild(front);
     card.appendChild(back);
 });


 //Adding the success class to the shown cards if there is a success
const success = () => {
    const matched = document.querySelectorAll (".show");
    matched.forEach(card => {
        card.classList.add("success");
    });
}


//Removing the show class and resetting count variable
 
const resetMove = () => {
    firstChoice = "";
    secondChoice = "";
    count = 0;
    firstClick = null;

    var matched = document.querySelectorAll (".show");
    matched.forEach(card => {
        card.classList.remove("show");
    });
};

// Moves counter function
function movesCounter () {
    moves++;
    counter.innerHTML = moves;
}

 // Setting event listener for card selection
 grid.addEventListener("click", function (event){
     let selected = event.target;
     if (selected.nodeName === "SECTION" || 
     selected === firstClick ||
     selected.parentNode.classList.contains ("show") ||
     selected.parentNode.classList.contains ("success")
    ) {
        return;
     }
     if (count < 2){
         count++;
         if (count === 1){
            firstChoice = selected.parentNode.dataset.name;
            console.log(firstChoice);
            selected.parentNode.classList.add("show");
         } else {
             secondChoice = selected.parentNode.dataset.name;
             console.log(secondChoice);
             selected.parentNode.classList.add("show");
         }
     if (firstChoice && secondChoice) {
         if (firstChoice === secondChoice){
         setTimeout(success, delay);
         }
         setTimeout(resetMove, delay);
     }
     else firstClick = selected;
     }
     if (count === 2) {
         movesCounter();
     }
     let matchesCount = document.querySelectorAll ("success");
     if matchesCount === 8 {
         gameover();
     }
 });
