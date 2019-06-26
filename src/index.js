/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const RESET_VALUE = 2;

let scores = [0, 0];
let activePlayer = 0;
let current = 0;
let limitElement = document.getElementById("limitInput");
let limitValue = 0;
const diceElement1 = document.querySelector('.dice1');
const diceElement2 = document.querySelector('.dice2');

const dicesHide = () => {
	diceElement1.style.display = 'none';
	diceElement2.style.display = 'none';
}

const dicesShow = () => {
	diceElement1.style.display = 'block';
	diceElement2.style.display = 'block';
}

function Gamer(name = "БезИмени") {
	this.name = name;
	this.score = 0;
}

Gamer.prototype.getScore = function() {
	return this.score;
}
Gamer.prototype.setScore = function() {
	return ++this.score;
}
Gamer.prototype.resetScore = function() {
	return this.score = 0;
}

const player1 = new Gamer();
const player2 = new Gamer();

player1.name = prompt("Введите имя первого игрока", "Игрок1");
player2.name = prompt("Введите имя второго игрока", "Игрок2");

if (!localStorage[player1.name]) {
	localStorage.setItem(player1.name, 0);
};
if (!localStorage.getItem[player2.name]) {
	localStorage.setItem(player2.name, 0);
};

const initGame = () => {
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#name-0').textContent = player1.name;
  document.querySelector('#name-1').textContent = player2.name;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
	dicesHide();
}

initGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
  let dice1 = Math.floor(Math.random() * 6) + 1;
  let dice2 = Math.floor(Math.random() * 6) + 1;
	let total = dice1 + dice2;

  diceElement1.src = `dice-${dice1}.png`;
  diceElement2.src = `dice-${dice2}.png`;
	
	dicesShow();

	if ((dice1 !== RESET_VALUE) && (dice2 !== RESET_VALUE) && (dice1 !== dice2)) {
    current += total;
    document.getElementById('current-'+activePlayer).textContent = current;

    if (scores[activePlayer] + current >= (limitValue ? +limitValue : 100)) {
			let winner = activePlayer ? player2.name : player1.name;
			let numberOfWins = +localStorage.getItem(winner) + 1;
			localStorage.setItem(winner, numberOfWins);
			alert(`ИГРОК ${winner} ВЫИГРАЛ!!!`);
    }
    
  } else {
    changePlayer();
  }
});

const changePlayer = () => {
  current = 0;
  document.getElementById('current-'+activePlayer).textContent = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  activePlayer = +!activePlayer;
  dicesHide();
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
}

document.querySelector('.btn-hold').addEventListener('click', function() {
  scores[activePlayer] += current;
  document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
  changePlayer();
});


document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});

limitElement.addEventListener('change', function() {
	limitValue = this.value;
});

document.querySelector('#winnersList').addEventListener('click', function() {
	let arr = [];
  for (var i = 0; i < localStorage.length; i++) { 
		let key = localStorage.key(i);
		arr.push([key, localStorage.getItem(key)]);
	};
	arr.sort(function(a, b) {
    return b[1] - a[1];
	});
	let list = "";
	for (var i = 0; i < arr.length; i++) { 
		list += "Игрок " + arr[i][0] + " победил " + arr[i][1] + " раз\n";
	};
	alert(list);
});