class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
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

    get(i){
        return this.cards[i];
    }
}

class Player {
    constructor(card1Name, card2Name) {
        this.card1Name = card1Name;
        this.card2Name = card2Name;
    }
}