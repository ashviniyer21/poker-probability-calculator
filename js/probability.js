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
conversion['A'] = 14;


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


function calculateProbability2(){
    console.log("calculating");
    let keys = Object.keys(odds);
    let flopNames = ["Flop1", "Flop2", "Flop3", "Flop4", "Flop5"];
    for(let i = 0; i < flopNames.length; i++){
        if(cards[flopNames[i]] != null){
            filter(keys, cards[flopNames[i]]);
        }
    }
    let dist = [];
    for(let i = 0; i < 140; i++){
        dist.push(0);
    }
    for(let i = 0; i < keys.length; i++){
        let vals = odds[keys[i]];
        let score = vals[0] * 14 + vals[1] - 1;
        dist[score]++;
    }
    console.log(keys.length);
    for(let i = 0; i < dist.length; i++){
        dist[i] /= keys.length;
    }
    let newDist = [];
    newDist.push(dist[0] / 2);
    for(let i = 1; i < dist.length; i++){
        newDist.push(dist[i] / 2 + dist[i - 1] / 2 + newDist[i-1]);
    }
    for(let i = 0; i < players.length; i++){
        let c1 = cards[players[i].card1Name];
        let c2 = cards[players[i].card2Name];
        let playerKeys = [...keys];
        if(c1 != null){
            filter(playerKeys, c1);
        }
        if(c2 != null){
            filter(playerKeys, c2);
        }
        let prob = 0;
        for(let j = 0; j < playerKeys.length; j++){
            let vals = odds[playerKeys[j]];
            let score = vals[0] * 14 + vals[1] - 1;
            prob += newDist[score];
        }
        prob /= playerKeys.length;
        document.getElementById("probability").innerHTML += "Player " + String(i + 1) + ": " + String(Math.round(prob * 100) / 100) + "\n";
    }
}

function filter(keys, card){
    for(let i = 0; i < keys.length; i++){
        if(keys[i].indexOf(card.cardName) === -1){
            keys.splice(i, 1);
            i--;
        }
    }
}

function calculateProbability(){
    console.log("calculating");
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
    let wins = [];
    // console.log(players.length);
    for(let i = 0; i < players.length; i++){
        wins.push(0);
    }
    getCombinations(cardCount, unknownCards.length);
    // console.log(combinations);
    console.log(combinations.length);
    for(let i = 0; i < combinations.length; i++){
        for(let j = 0; j < combinations[i].length; j++){
            cards[unknownCards[j]] = deck.get(combinations[i][j]);
        }
        let flop = [cards["Flop1"], cards["Flop2"], cards["Flop3"], cards["Flop4"], cards["Flop5"]];
        let p1Hand = [cards["Player 11"], cards["Player 12"]];
        let hand = calculateHand(flop, p1Hand);
        let prevVals = [0];
        wins[0]++;
        prevVals.push(0);
        for(let j = 1; j < players.length; j++){
            let c1 = cards[players[j].card1Name];
            let c2 = cards[players[j].card2Name];
            let temp = calculateHand(flop, [c1, c2]);
            if(temp[0] > hand[0]){
                hand[0] = temp[0];
                hand[1] = temp[1];
                wins[j]++;
                for(let k = 0; k < prevVals.length; k++){
                    wins[prevVals[k]]--;
                }
                prevVals = [j];
            } else if(temp[0] === hand[0]){
                if(temp[1] > hand[1]){
                    hand[1] = temp[1];
                    wins[i]++;
                    for(let k = 0; k < prevVals.length; k++){
                        wins[prevVals[k]]--;
                    }
                    prevVals = [j];
                } else if(temp[1] === hand[1]){
                    wins[j]++;
                   prevVals.push(j);
                }
            }
        }
    }
    let total = 0;
    for(let i = 0; i < wins.length; i++){
        if(isNaN(wins[i])){
            break;
        }
        total += wins[i];
    }
    let tempString = "Probabilities: <br>";
    for(let i = 0; i < wins.length; i++){
        let percent = Math.round(10000 * wins[i] / total)/100;
        if(isNaN(percent)){
            break;
        }
        tempString += "Player " + (i + 1) + ": " + percent + "<br>";
    }
    document.getElementById("probability").innerHTML = tempString;
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