let table = document.getElementById("table");
table.insertRow().insertCell(0).appendChild(getTitle("Flop"));
let a = table.insertRow();
for(let i = 0; i < 5; i++){
    let x = a.insertCell(i);
    let temp = createCardButton("Flop" + (i+1));
    x.appendChild(temp[1]);
    x.appendChild(temp[0]);
}
addPlayer("Player 1");
addPlayer("Player 2");
let playerAdd = document.getElementById("add");
let count = 3;
playerAdd.onclick = function () {
    addPlayer("Player " + count);
    count += 1;
}

// console.log(isFullHouse(new Card("S", "2"), new Card("S", "3"), new Card("S", "4"), new Card("S", "5"), new Card("S", "6")));