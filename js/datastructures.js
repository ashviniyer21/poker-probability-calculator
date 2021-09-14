class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.cardName = value + suit;
        let tempVal;
        if(value === "A"){
            tempVal = 1;
        } else if(value === "K"){
            tempVal = 13;
        } else if(value === "Q"){
            tempVal = 12;
        } else if(value === "J"){
            tempVal = 11;
        } else {
            tempVal = parseInt(value);
        }
        if(suit === "S"){
            this.sortVal = tempVal;
        } else if(suit === "C"){
            this.sortVal = 13 + tempVal;
        } else if(suit === "D"){
            this.sortVal = 26 + tempVal;
        } else {
            this.sortVal = 39 + tempVal;
        }
    }
}

class Deck {
    constructor() {
        this.cards = [];
        let suits = ["S", "C", "D", "H"];
        let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        for(let i = 0; i < suits.length; i++){
            for(let j = 0; j < values.length; j++){
                this.cards.push(new Card(suits[i], values[j]));
            }
        }
    }
    removeCard(suit, value){
        for(let i = 0; i < this.cards.length; i++){
            if(this.cards[i].suit === suit && this.cards[i].value === value){
                this.cards.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    addCard(card){
        this.cards.push(card);
    }

    get(i){
        return this.cards[i];
    }

    size(){
        return cards.size();
    }
}

class Player {
    constructor(card1Name, card2Name) {
        this.card1Name = card1Name;
        this.card2Name = card2Name;
    }
}