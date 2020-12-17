import css from './styles.css';
import {
  startGame,
  submitScore,
  displayLeaderboard
} from './logic';

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('leaderboard-btn').addEventListener('click', displayLeaderboard);
document.getElementById('submit-btn').addEventListener('click', submitScore);
document.getElementById('close-leaderboard-btn').addEventListener('click', () => {
  document.getElementById('leaderboard-screen').classList.toggle('hidden');
});
