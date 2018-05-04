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
    "name": "UADA", 
    "img": "img/uada.jpg"
 },{
    "name": "Exodus",
    "img": "img/exodus.jpg"
 },{
    "name": "Slayer", 
    "img": "img/slayer.jpg"
 },{
    "name": "BlackSabbath", 
    "img": "img/blacksabbath.jpg"
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



 //Duplicating Array for second indentical set
 let wholeGrid = cardsList.concat(cardsList);


 //Random sorting of the wholeGrid array
 wholeGrid.sort(() => 0.5 - Math.random());

 
 //Choosing div with the class container
 const game = document.getElementsByClassName("container");


 //Create a section with the class grid
 const grid = document.createElement("section");
 grid.setAttribute('class', 'grid');
 
 
 //Append the grid section to the container div 
 game[0].appendChild(grid);


 // Displaying the images to the front end
 wholeGrid.forEach(item => {
    const {name, img} = item;
    const card = document.createElement("div");
     card.classList.add("card");
     card.dataset.name = name;
     card.style.backgroundImage = `url(${img})`;
     grid.appendChild(card);
 });
