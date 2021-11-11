let conversion = {};
conversion['2'] = 2;
conversion['3'] = 3;
conversion['4'] = 4;
conversion['5'] = 5;
conversion['6'] = 6;
conversion['7'] = 7;
conversion['8'] = 8;
conversion['9'] = 9;
conversion['10'] = 10;
conversion['J'] = 11;
conversion['Q'] = 12;
conversion['K'] = 13;
conversion['A'] = 1;


function calculateHand(flop, hand){
    let arr = [];
    let ans = 0;
    let val = 0;
    for(let i = 0; i < flop.length; i++){
        arr.push(flop[i]);
    }
    for(let i = 0; i < hand.length; i++){
        arr.push(hand[i]);
    }
    // console.log(arr);
    for (let i = 0; i < 3; i++) {
        for (let j = i + 1; j < 4; j++) {
            for (let k = j + 1; k < 5; k++) {
                for (let l = k + 1; l < 6; l++) {
                    for (let m = l + 1; m < 7; m++) {
                        let name = "";
                        let cards = [arr[i], arr[j], arr[k], arr[l], arr[m]];
                        cards.sort(function (a, b) {
                            return a.sortVal - b.sortVal;
                        });
                        // console.log(cards);
                        for(let a = 0; a < cards.length; a++){
                            name += cards[a].cardName;
                        }
                        // console.log(name);
                        // console.log(odds[name]);
                        let tempAns = odds[name][0];
                        let tempVal = odds[name][1];
                        if(tempAns > ans){
                            ans = tempAns;
                            val = tempVal;
                        } else if(tempAns === ans && tempVal > val){
                            val = tempVal;
                        }
                    }
                }
            }
        }
    }
    return [ans, val];
}

let combinations = [];
function calculateProbability() {
    let deck = new Deck();
    const keys = Object.keys(cards);
    let cardCount = 52;
    let unknownCards = [];
    for(let i = 0; i < keys.length; i++){
        let temp = keys[i];
        if(cards[temp] !== null){
            deck.removeCard(cards[temp].suit, cards[temp].value);
            cardCount--;
        } else {
            unknownCards.push(temp);
        }
    }
    let flop = ["Flop1", "Flop2", "Flop3", "Flop4", "Flop5"]
    let flopCount = 0;
    for(let i = 0; i < flop.length; i++) {
        if(cards[flop[i]] != null) {
            flopCount++;
        }
    }
    getCombinations(cardCount, unknownCards.length);
    let wins = new Array(players.length).fill(0);
    let total = 0;
    console.log(combinations.length);
    for (let i = 0; i < combinations.length; i++) {
        console.log("HERE")
        for (let j = 0; j < unknownCards.length; j++) {
            cards[unknownCards[j]] = deck.get(combinations[i][j]);
        }
        let flop = [cards["Flop1"], cards["Flop2"], cards["Flop3"], cards["Flop4"], cards["Flop5"]];
        let scores = [];
        for(let j = 0; j < players.length; j++) {
            let hand = [cards[players[j].card1Name], cards[players[j].card2Name]];
            scores.push(calculateHand(flop, hand));
        }
        console.log(scores);
        let max = [0];
        for(let j = 1; j < scores.length; j++) {
            if(scores[j][0] > scores[max[0]][0]) {
                max = [j];
            } else if(scores[j][0] === scores[max[0]][0] && scores[j][1] > scores[max[0]][1]) {
                max = [j];
            } else if(scores[j][0] === scores[max[0]][0] && scores[j][1] === scores[max[0]][1]) {
                max.push(j);
            }
        }
        for(let j = 0; j < max.length; j++) {
            wins[max[j]]++;
            total++;
        }
    }
    let probString = "";
    console.log(wins);
    for(let i = 0; i < players.length; i++) {
        probString += "Player " + (i + 1) + ": " + Math.round(wins[i] / total * 10000.0) / 100.0 + "\n";
    }
    document.getElementById("probability").innerHTML = probString;
}

async function getApiRequest(url) {
    let data;
    await fetch(url).then(response => response.json()).then(response => data = response['winners']['cards']);
    return data;
}

function getCombinations(length, goal, set = new Set()){
    if(goal === 0){
        combinations.push([...set]);
    } else {
        for(let i = 0; i < length; i++){
            if(!set.has(i)){
                set.add(i);
                getCombinations(length, goal-1, set);
                set.delete(i);
            }
        }
    }
}