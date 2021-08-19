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

function updateAns(ans, val, newAns, newVal){
    if(newAns > ans){
        ans = newAns;
        val = newVal;
    } else if(newAns === ans && newVal > val){
        val = newVal;
    }
    return [ans, val];
}

function isFlush(c1, c2, c3, c4, c5){
    if(c1.suit === c2.suit && c1.suit === c3.suit && c1.suit === c4.suit && c1.suit === c5.suit){
        getMax(c1, c2, c3, c4, c5)
    }
    return -1;
}

function isStraight(c1, c2, c3, c4, c5){
    let arr = [conversion[c1.value], conversion[c2.value], conversion[c3.value], conversion[c4.value], conversion[c5.value]];
    arr.sort();
    for(let i = 2; i <= 10; i++){
        if(arr[0] === i && arr[1] === i + 1 && arr[2] === i + 2 && arr[3] === i + 3 && arr[4] === i + 4){
            return i + 4;
        }
    }
    return -1;
}

function is4OfAKind(c1, c2, c3, c4, c5){
    let arr = [conversion[c1.value], conversion[c2.value], conversion[c3.value], conversion[c4.value], conversion[c5.value]];
    for(let i = 0; i < 2; i++){
        for(let j = i + 1; j < 3; j++){
            for(let k = j + 1; k < 4; k++){
                for(let l = k + 1; l < 5; l++){
                    if(arr[i] === arr[j] && arr[i] === arr[k] && arr[i] === arr[l]){
                        return arr[i];
                    }
                }
            }
        }
    }
    return -1;
}

function isFullHouse(c1, c2, c3, c4, c5){
    let arr = [conversion[c1.value], conversion[c2.value], conversion[c3.value], conversion[c4.value], conversion[c5.value]];
    for(let i = 0; i < 3; i++){
        for(let j = i + 1; j < 4; j++){
            for(let k = j + 1; k < 5; k++){
                let t = [];
                for(let l = 0; l < 5; l++){
                    if(l !== i && l !== j && l !== k){
                        t.push(l);
                    }
                }
                if(arr[i] === arr[j] && arr[i] === arr[k] && arr[t[0]] === arr[t[1]]){
                    return Math.max(arr[i], arr[t[0]]);
                }
            }
        }
    }
    return -1;
}

function is3OfAKind(c1, c2, c3, c4, c5){
    let arr = [conversion[c1.value], conversion[c2.value], conversion[c3.value], conversion[c4.value], conversion[c5.value]];
    for(let i = 0; i < 2; i++){
        for(let j = i + 1; j < 3; j++){
            for(let k = j + 1; k < 4; k++){
                if(arr[i] === arr[j] && arr[i] === arr[k]){
                    return arr[i];
                }
            }
        }
    }
    return -1;
}

function is2Pair(c1, c2, c3, c4, c5){
    let val = -1;
    let count = 0;
    let arr = [conversion[c1.value], conversion[c2.value], conversion[c3.value], conversion[c4.value], conversion[c5.value]];
    for(let i = 0; i < 2; i++){
        for(let j = i + 1; j < 3; j++){
            if(arr[i] === arr[j]){
                val = Math.max(val, arr[i]);
                count += 1;
            }
        }
    }
    if(count === 2){
        return val;
    }
    return -1;
}

function isPair(c1, c2, c3, c4, c5){
    let arr = [conversion[c1.value], conversion[c2.value], conversion[c3.value], conversion[c4.value], conversion[c5.value]];
    for(let i = 0; i < 2; i++){
        for(let j = i + 1; j < 3; j++){
            if(arr[i] === arr[j]){
                return arr[i];
            }
        }
    }
    return -1;
}

function getMax(c1, c2, c3, c4, c5){
    return Math.max(conversion[c1.value], conversion[c2.value], conversion[c3.value], conversion[c4.value], conversion[c5.value]);
}

let combinations = [];



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