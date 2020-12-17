const store = firebase.firestore();
const storage = firebase.storage();
let targets = [];
let timerInterval;
let time;

// Game elements -----------------
const game = document.getElementById('game-main');
const gameInfo = document.getElementById('game-info');
const startBtn = document.getElementById('start-btn');

// Game click functionality ---------------------
function drawCircle(x, y) {
  if (document.getElementById('circle')) {
    game.removeChild(document.getElementById('circle'))
  }

  const img = document.createElement('img');
  img.id = 'circle';
  img.src = './assets/circle.png';
  img.alt = 'Targeting circle';
  img.style.left = x - 15   + 'px';
  img.style.top = y - 15 + 'px';
  game.appendChild(img);
}

function getClickLocation(e) {
  const rect = e.target.getBoundingClientRect();
  const cursorX = e.clientX - rect.left;
  const cursorY = e.clientY - rect.top;

  drawCircle(cursorX + rect.left, cursorY + rect.top);

  return [cursorX, cursorY];
}

function updateTarget() {
  targets.forEach( obj => {
    if (obj.isFound) {
      const target = document.getElementById(`${obj.character}`);
      target.classList.add('found');
    }
  })
}

function checkCoords(e) {
  const [x, y] = getClickLocation(e);

  targets.forEach( obj => {
    if (obj.x < x + 15 &&
        obj.x > x - 15 &&
        obj.y < y + 15 &&
        obj.y > y - 15) {
          (obj.isFound === false) ? obj.isFound = true : '';
        }
  });

  updateTarget();
}

function checkWin() {
  if (targets.every( obj => obj.isFound === true)) {
    clearInterval(timerInterval);
    document.getElementById('score-screen').classList.toggle('hidden');

    const diffInHours = time / 3600000;
    const hours = Math.floor(diffInHours);

    const diffInMins =  (diffInHours - hours) * 60;
    const mins = Math.floor(diffInMins);
    const formattedMins = mins.toString().padStart(2, '0');

    const diffInSecs = (diffInMins - mins) * 60;
    const secs = Math.floor(diffInSecs);
    const formattedSecs = secs.toString().padStart(2, '0');

    const diffInMs = (diffInSecs - secs) * 100;
    const ms = Math.floor(diffInMs);
    const formattedMs = ms.toString().padStart(2, '0');

    document.getElementById('score').textContent =
      `${formattedMins}:${formattedSecs}:${formattedMs}`;
  }
}

function handleGameClick(e) {
  checkCoords(e);
  checkWin();
}

/* function handleMouseMove(e) {
  const dimensions = this.getBoundingClientRect();
  const [x, y] = [
    e.clientX - dimensions.left,
    e.clientY - dimensions.top
  ];
  const [percentX, percentY] = [
    Math.round(100 / (dimensions.width / x)),
    Math.round(100 / (dimensions.height / y))
  ];
  this.style.setProperty('--mouse-x', percentX);
  this.style.setProperty('--mouse-y', percentY);
}

function zoom(width, height) {
  const wrapper = document.getElementById('game-main');
  wrapper.style.width = `${width}px`;
  wrapper.style.height = `${height}px`;
  wrapper.addEventListener('mousemove', handleMouseMove, false);
} */

// Setting up game ----------------------------------
function displayCharacterTargets() {
  targets.forEach( obj => {
    const targetImg = document.createElement('img');
    targetImg.id = obj.character;
    targetImg.classList.add('target-img');
    targetImg.src = `./assets/${obj.character}.png`;
    gameInfo.appendChild(targetImg);
    requestAnimationFrame( () => {
      targetImg.classList.add('fade-in');
    });
  });
}

function getRandomCoords() {
  // 9 docs in firestore, replace eventaully with collections.size
  const numberOfCoords = 9;
  const randomCoords = [];
  while (randomCoords.length < 3) {
    const coord = Math.floor(Math.random() * numberOfCoords);
    if (randomCoords.indexOf(coord) === -1 ) randomCoords.push(coord);
  }
  return randomCoords;
}

function getCharacterLocations() {
  const randomCoords = getRandomCoords();
  store.collection('coordinates').get().then( coords => {
    coords.forEach( obj => {
      if (randomCoords.includes(obj.data().index)) {
        targets.push(obj.data());
      }
    })
  }).then(() => displayCharacterTargets());
}

function startTimer() {
  const timerElement = document.createElement('div');
  timerElement.id = 'timer';
  timerElement.classList.add('timer');
  gameInfo.appendChild(timerElement);
  requestAnimationFrame( () => {
    timerElement.classList.add('fade-in');
  });

  const timerBegin = performance.now();

  timerInterval = setInterval( () => {
    const timerNow = performance.now();
    const difference = timerNow - timerBegin;

    const diffInHours = difference / 3600000;
    const hours = Math.floor(diffInHours);

    const diffInMins =  (diffInHours - hours) * 60;
    const mins = Math.floor(diffInMins);
    const formattedMins = mins.toString().padStart(2, '0');

    const diffInSecs = (diffInMins - mins) * 60;
    const secs = Math.floor(diffInSecs);
    const formattedSecs = secs.toString().padStart(2, '0');

    const diffInMs = (diffInSecs - secs) * 100;
    const ms = Math.floor(diffInMs);
    const formattedMs = ms.toString().padStart(2, '0');

    timerElement.textContent =
      `${formattedMins}:${formattedSecs}:${formattedMs}`;

    time = difference;
  }, 10);
}

function fetchGameScene() {
  const gsRef = storage.refFromURL('gs://wheres-that-pokemon-77670.appspot.com/pokemon-scene.png');

  const img = document.createElement('img');
  img.id = 'game-canvas';
  img.classList.add('game-canvas');
  img.alt = 'An image of many different pokemon';

  gsRef.getDownloadURL().then( url => {
    img.src = url;
  }).catch( error => {
    console.log('Failed to fetch scene.', error);
  })

  img.addEventListener('click', handleGameClick, false);
  game.appendChild(img);

  img.onload = () => {
    startTimer();
    requestAnimationFrame( () => {
      img.classList.add('fade-in');
    });
  }
}

function startGame() {
  targets = [];
  time = '';
  game.removeChild(startBtn);
  gameInfo.innerHTML = '';
  getCharacterLocations();
  fetchGameScene();
  //zoom(700, 700);
}

// Game end functionality -------------------
function submitScore(e) {
  e.preventDefault();
  const score = time;
  const name = document.getElementById('name-input').value;

  store.collection('scores').add({
    name: name,
    score: score,
    date: new Date(),
  }).then( () => {
    document.getElementById('score-screen').classList.toggle('hidden');
  }).catch( error => {
    console.log('Error writing document', error);
  });
}

// Leaderboard funtionality -----------------------------
function displayLeaderboard() {
  const leaderboard = document.getElementById('leaderboard-screen');
  const leaderboardDiv = document.getElementById('leaderboard-div');
  leaderboardDiv.innerHTML = '';

  store.collection('scores')
  .orderBy('score', 'asc')
  .get().then( scores => {
    scores.forEach( obj => {
      const score = obj.data();

      const leaderDiv = document.createElement('div');
      leaderDiv.classList.add('leaderboard-score');
      const nameDiv = document.createElement('div');
      const timeDiv = document.createElement('div');

      nameDiv.textContent = score.name;

      const diffInHours = score.score / 3600000;
      const hours = Math.floor(diffInHours);

      const diffInMins =  (diffInHours - hours) * 60;
      const mins = Math.floor(diffInMins);
      const formattedMins = mins.toString().padStart(2, '0');

      const diffInSecs = (diffInMins - mins) * 60;
      const secs = Math.floor(diffInSecs);
      const formattedSecs = secs.toString().padStart(2, '0');

      const diffInMs = (diffInSecs - secs) * 100;
      const ms = Math.floor(diffInMs);
      const formattedMs = ms.toString().padStart(2, '0');

      timeDiv.textContent =
        `${formattedMins}:${formattedSecs}:${formattedMs}`;

      leaderDiv.appendChild(nameDiv);
      leaderDiv.appendChild(timeDiv);

      leaderboardDiv.appendChild(leaderDiv);
      leaderboardDiv.appendChild(document.createElement('hr'));
    });

    leaderboard.classList.toggle('hidden');
  }).catch( error => {
    console.log('Error getting scores', error);
  })
}

export { startGame, submitScore, displayLeaderboard };
