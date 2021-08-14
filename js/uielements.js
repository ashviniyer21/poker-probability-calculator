cards = {};
players = [];
function createCardButton(id){
    cards[id] = null;
    let button = document.createElement("button");
    button.className = "imagebutton";
    let popup = document.createElement("div");
    popup.className = "popup";

    button.innerHTML = "<img src=\"assets/facedown.png\"  alt=\"Face Down\"/>";


    button.onclick = function () {
        popup.style.display = "block";
    }

    let suits = ["S", "C", "D", "H"];
    let suitDropdown = document.createElement("select");
    suitDropdown.id = id;
    let suitLabel = document.createElement("label");
    suitLabel.setAttribute("for", suitDropdown.id);
    suitLabel.innerHTML = "Suit: ";
    for(let i = 0; i < suits.length; i++){
        let option = document.createElement("option");
        option.value = suits[i];
        option.innerHTML = suits[i];
        suitDropdown.appendChild(option);
    }

    popup.appendChild(suitLabel);
    popup.appendChild(suitDropdown);

    let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    let valueDropdown = document.createElement("select");
    valueDropdown.id = id;
    let valueLabel = document.createElement("label");
    valueLabel.setAttribute("for", valueDropdown.id);
    valueLabel.innerHTML = "Value: ";
    for(let i = 0; i < values.length; i++){
        let option = document.createElement("option");
        option.value = values[i];
        option.innerHTML = values[i];
        valueDropdown.appendChild(option);
    }

    popup.appendChild(valueLabel);
    popup.appendChild(valueDropdown);

    popup.style.display = "none";
    let applyButton = document.createElement("button");
    applyButton.innerHTML = "Apply";
    applyButton.onclick = function () {
        let imgString = getImage(suitDropdown.value, valueDropdown.value);
        button.innerHTML = '<img src="' + imgString + '" alt=' + imgString + '/>';
        popup.style.display = "none";
        cards[id] = new Card(suitDropdown.value, valueDropdown.value);
    }
    popup.appendChild(applyButton);

    let resetButton = document.createElement("button");
    resetButton.innerHTML = "Reset";
    resetButton.onclick = function () {
        button.innerHTML = '<img src="assets/facedown.png"  alt="Face Down"/>';
        popup.style.display = "none";
        cards[id] = null;
    }
    popup.appendChild(resetButton);

    let arr = Array();
    arr.push(button);
    arr.push(popup);

    return arr;
}

function addPlayer(name){
    players.push(new Player(name + "1", name + "2"));
    let table = document.getElementById("table");
    table.insertRow().insertCell(0).appendChild(getTitle(name));
    let a = table.insertRow();
    for(let i = 0; i < 2; i++){
        let x = a.insertCell(i);
        let temp = createCardButton(name + (i + 1));
        x.appendChild(temp[1]);
        x.appendChild(temp[0]);
    }
}

function getTitle(content){
    let h3 = document.createElement("h3");
    h3.innerHTML = content;
    return h3;
}

function getImage(suit, value){
    let s = "";
    let v;
    switch (suit){
        case "S":
            s = "spades";
            break;
        case "C":
            s = "clubs";
            break;
        case "D":
            s = "diamonds";
            break;
        case "H":
            s = "hearts"
            break;
    }
    switch (value){
        case "J":
            v = "jack";
            break;
        case "Q":
            v = "queen";
            break;
        case "K":
            v = "king";
            break;
        case "A":
            v = "ace";
            break;
        default:
            v = value;
            break;
    }
    return "../assets/" + v + "_of_" + s + ".png";
}