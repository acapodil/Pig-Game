/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, gamePlaying, lastDice;



init();

//manipulate the DOM
//select the ID


var x = document.querySelector('#score-0').textContent;

//add event listener to the roll dice button
//this uses an 'anonymous function' to handle button click
document.querySelector('.btn-roll').addEventListener('click', function(){

    if(gamePlaying){

      //1. random number(s)
      var dice1 = Math.floor(Math.random() * 6) + 1;
      var dice2 = Math.floor(Math.random() * 6) + 1;

      // display the result
      document.getElementById('dice-1').style.display = 'block';
      document.getElementById('dice-2').style.display = 'block';
      document.getElementById('dice-1').src = 'dice-' + dice1 +'.png';
      document.getElementById('dice-1').src = 'dice-' + dice2 +'.png';

      //two sixes in a row

      if(dice1 !== 1 && dice2 != 1){

        //Add score
        roundScore += dice1 + dice2;
        document.querySelector('#current-'+ activePlayer).textContent = roundScore;

      }else{

        //Next player
        nextPlayer();
      }

      lastDice = dice;

    }

});

document.querySelector('.btn-hold').addEventListener('click', function(){

  if (gamePlaying){
    //add current score to players global scores
    scores[activePlayer] += roundScore;

    //update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;

    // Undefined, 0, null, or "" are Coerced  to  false
    // anything else  is  coerced to true
    if(input){
      winningScore = input;
    }else{
      winningScore = 100;
    }

    //check if player one the game
    if(scores[activePlayer] >= winningScore){
      //current active player wins!
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    }else{
      nextPlayer();

    }
  }

});

function nextPlayer(){

  //Next player
  //Ternary operator!!
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  //set  roundscore back  to 0
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

}

//new game. call init() function on click
document.querySelector('.btn-new').addEventListener('click', init);

function init(){
  gamePlaying = true;

  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}
