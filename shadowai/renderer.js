const trainBtn = document.getElementById('train');
const stopTrainBtn = document.getElementById('stopTrain');
const playBtn = document.getElementById('play');
const stopPlayBtn = document.getElementById('stopPlay');
const mimicBtn = document.getElementById('mimic');
const stopMimicBtn = document.getElementById('stopMimic');

trainBtn.addEventListener('click', () => {
  window.shadow.startTraining();
});

stopTrainBtn.addEventListener('click', () => {
  window.shadow.stopTraining();
});

playBtn.addEventListener('click', () => {
  window.shadow.startReplay();
});

stopPlayBtn.addEventListener('click', () => {
  window.shadow.stopReplay();
});

mimicBtn.addEventListener('click', () => {
  window.shadow.startMimic();
});

stopMimicBtn.addEventListener('click', () => {
  window.shadow.stopMimic();
});
