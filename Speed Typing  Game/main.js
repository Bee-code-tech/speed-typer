const word = document.getElementById('word');
const text = document.getElementById('text'); 
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const endgameElement = document.getElementById('end-game-container');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// Game word list 
const words = [
  'sigh','tense','airplane','ball','pies','juice','walnut','bad','north','south','east', 'west','dependent','cause','steer','silver', 'gold', 'bronze','highfalutin','superficial','quince','eight', 'feeble', 'admit', 'drag', 'loving', 'tomfadd', 'beejay', 'linux', 'nannoy', 'vitech', 'transformers','yuppy','jasmine','poignant','graphics',
  'forex', 'crypto','blockchain', 'architecture', 'surveyor', 'crocks', 'deborah','tensorflow', 'emmanuel','dart','gatsby','javascript','css','length'
  ];
  
  // Initialize random words
  let randomWord;
  
  // Initialize score
  let score = 0;
  
  // focus txt on page load
  text.focus();
  
  
  // initialize time
  let time = 10;
  
// Set default difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

difficultySelect.value =  localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

  // countdown as game begins
  const timeInterval = setInterval(updateTime, 1000);
  
  // Generate random word from array
  function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
  }
  
  // Add random words to DOM
  function addWordToDom(){
   randomWord = getRandomWord();
    word.innerHTML = randomWord;
    speakOut(randomWord);
    
  }
 
  
  
  
  
  //update the scores
  
  function updateScore(){
    score++;
    scoreElement.innerHTML = score;
  }
  // update time
  function updateTime(){
    time--;
    timeElement.innerHTML = `${time}s`
    
    if (time === 0) {
      clearInterval(timeInterval);
      
      //end game
      gameOver(); 
    }
  }
 
 // speak function
 function speakOut(message){
   const speech = new SpeechSynthesisUtterance();
   
   speech.text = message;
   speech.volume = 1;
   speech.pitch = 1;
   speech.rate = 1;
   
   window.speechSynthesis.speak(speech);
 }
  
  addWordToDom();
  
  // Event listeners
  
  // Typing
  text.addEventListener('input', (e) => {
    const typedText = e.target.value;
    if (typedText === randomWord) {
      addWordToDom();
      updateScore();
      // Clear input if word matches the randomword
      e.target.value = '';
      
      // difficulty
      if (difficulty === 'hard') {
        time += 2;
      } else if(difficulty === 'medium'){
        time += 3
      } else{
        time +=5;
      }
      
      updateTime();
    }
  });
  
  // create game over function 
  function gameOver(){
    endgameElement.innerHTML =
    `<h1> You ran out of time!</h1>
    <p> Difficulty : ${difficulty} </p>
    <p> Your total score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `;
    
    endgameElement.style.display = 'flex';
  } 
  
  // Difficulty settings
  settingsForm.addEventListener('change', (e) => {
    difficulty = e.target.value;
    
    // Acces localstorage
    localStorage.setItem('difficulty', difficulty);
  } );