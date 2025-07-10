// Keep track of rankings for each set
const allRankings = {};

// Generate a random participant ID
const participantId = Math.random().toString(36).substring(2, 15);

// Map set numbers to chord names
const chordMap = {
  1: 'A',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'G'
};

// Pool of 10 A chord samples
const aChordSamples = [
  { src: "newsounds/AJumbo_Pick_A_Chord_Bridge.mp3", label: "Jumbo Bridge Pick (A)" },
  { src: "newsounds/Jumbo_Pick_A_Chord_Neck.mp3", label: "Jumbo Neck Pick (A)" },
  { src: "newsounds/D18_Fingers_A_Chord_Bridge.mp3", label: "D18 Bridge Fingers (A)" },
  { src: "newsounds/D18_Fingers_A_Chord_Neck.mp3", label: "D18 Neck Fingers (A)" },
  { src: "newsounds/D18_Pick_A_Chord_Bridge.mp3", label: "D18 Bridge Pick (A)" },
  { src: "newsounds/D18_Pick_A_Chord_Neck.mp3", label: "D18 Neck Pick (A)" },
  { src: "newsounds/J35_Pick_A_Chord_Bridge.mp3", label: "J35 Bridge Pick (A)" },
  { src: "newsounds/J35_Pick_A_Chord_Neck.mp3", label: "J35 Neck Pick (A)" },
  { src: "newsounds/J50_Pick_A_Chord_Bridge.mp3", label: "J50 Bridge Pick (A)" },
  { src: "newsounds/J50_Pick_A_Chord_Neck.mp3", label: "J50 Neck Pick (A)" }
];

// Pool of 8 C chord samples
const cChordSamples = [
  { src: "newsounds/AJumbo_Pick_C_Chord_Bridge.mp3", label: "Jumbo Bridge Pick (C)" },
  { src: "newsounds/AJumbo_Pick_C_Chord_Neck.mp3", label: "Jumbo Neck Pick (C)" },
  { src: "newsounds/D18_Fingers_C_Chord_Bridge.mp3", label: "D18 Bridge Fingers (C)" },
  { src: "newsounds/D18_Fingers_C_Chord_Neck.mp3", label: "D18 Neck Fingers (C)" },
  { src: "newsounds/D18_Pick_C_Chord_Bridge.mp3", label: "D18 Bridge Pick (C)" },
  { src: "newsounds/D18_Pick_C_Chord_Neck.mp3", label: "D18 Neck Pick (C)" },
  { src: "newsounds/J50_Pick_C_Chord_Bridge.mp3", label: "J50 Bridge Pick (C)" },
  { src: "newsounds/J50_Pick_C_Chord_Neck.mp3", label: "J50 Neck Pick (C)" }
];

// Pool of 10 D chord samples
const dChordSamples = [
  { src: "newsounds/AJumbo_Pick_D_Chord_Bridge.mp3", label: "Jumbo Bridge Pick (D)" },
  { src: "newsounds/AJumbo_Pick_D_Chord_Neck.mp3", label: "Jumbo Neck Pick (D)" },
  { src: "newsounds/D18_Fingers_D_Chord_Bridge.mp3", label: "D18 Bridge Fingers (D)" },
  { src: "newsounds/D18_Fingers_D_Chord_Neck.mp3", label: "D18 Neck Fingers (D)" },
  { src: "newsounds/D18_Pick_D_Chord_Bridge.mp3", label: "D18 Bridge Pick (D)" },
  { src: "newsounds/D18_Pick_D_Chord_Neck.mp3", label: "D18 Neck Pick (D)" },
  { src: "newsounds/J35_Pick_D_Chord_Bridge.mp3", label: "J35 Bridge Pick (D)" },
  { src: "newsounds/J35_Pick_D_Chord_Neck.mp3", label: "J35 Neck Pick (D)" },
  { src: "newsounds/J50_Pick_D_Chord_Bridge.mp3", label: "J50 Bridge Pick (D)" },
  { src: "newsounds/J50_Pick_D_Chord_Neck.mp3", label: "J50 Neck Pick (D)" }
];

// Pool of 10 E chord samples
const eChordSamples = [
  { src: "newsounds/AJumbo_Pick_E_Chord_Bridge.mp3", label: "Jumbo Bridge Pick (E)" },
  { src: "newsounds/AJumbo_Pick_E_Chord_Neck.mp3", label: "Jumbo Neck Pick (E)" },
  { src: "newsounds/D18_Fingers_E_Chord_Bridge.mp3", label: "D18 Bridge Fingers (E)" },
  { src: "newsounds/D18_Fingers_E_Chord_Neck.mp3", label: "D18 Neck Fingers (E)" },
  { src: "newsounds/D18_Pick_E_Chord_Bridge.mp3", label: "D18 Bridge Pick (E)" },
  { src: "newsounds/D18_Pick_E_Chord_Neck.mp3", label: "D18 Neck Pick (E)" },
  { src: "newsounds/J35_Pick_E_Chord_Bridge.mp3", label: "J35 Bridge Pick (E)" },
  { src: "newsounds/J35_Pick_E_Chord_Neck.mp3", label: "J35 Neck Pick (E)" },
  { src: "newsounds/J50_Pick_E_Chord_Bridge.mp3", label: "J50 Bridge Pick (E)" },
  { src: "newsounds/J50_Pick_E_Chord_Neck.mp3", label: "J50 Neck Pick (E)" }
];

// Pool of 10 G chord samples
const gChordSamples = [
  { src: "newsounds//AJumbo_Pick_G_Chord_Bridge.mp3", label: "Jumbo Bridge Pick (G)" },
  { src: "newsounds/AJumbo_Pick_G_Chord_Neck.mp3", label: "Jumbo Neck Pick (G)" },
  { src: "newsounds/D18_Fingers_G_Chord_Bridge.mp3", label: "D18 Bridge Fingers (G)" },
  { src: "newsounds/D18_Fingers_G_Neck.mp3", label: "D18 Neck Fingers (G)" },
  { src: "newsounds/D18_Pick_G_Chord_Bridge.mp3", label: "D18 Bridge Pick (G)" },
  { src: "newsounds/D18_Pick_G_Chord_Neck.mp3", label: "D18 Neck Pick (G)" },
  { src: "newsounds/J35_Pick_G_Chord_Bridge.mp3", label: "J35 Bridge Pick (G)" },
  { src: "newsounds/J35_Pick_G_Chord_Neck.mp3", label: "J35 Neck Pick (G)" },
  { src: "newsounds/J50_Pick_G_Chord_Bridge.mp3", label: "J50 Bridge Pick (G)" },
  { src: "newsounds/J50_Pick_G_Chord_Neck.mp3", label: "J50 Neck Pick (G)" }
];

function stopAllAudio() {
  document.querySelectorAll('audio').forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}

function submitSet(setNumber) {
  stopAllAudio();
  const currentSet = document.getElementById(`set${setNumber}`);
  const sliders = currentSet.querySelectorAll('.brightness-slider');
  const rankings = Array.from(sliders).map(slider => ({
    index: parseInt(slider.dataset.index), // This index stays correct because data-index is not changed by shuffling
    brightness: parseInt(slider.value)
  }));

  // Store rankings for this set
  allRankings[setNumber] = rankings;

  // Show next set
  currentSet.classList.remove('active');
  if (setNumber < 5) {
    document.getElementById(`set${setNumber + 1}`).classList.add('active');
    document.querySelector('.progress').textContent = `Set ${setNumber + 1} of 5`;
  }
}

async function submitFinal() {
  stopAllAudio();
  const loadingOverlay = document.querySelector('.loading-overlay');
  loadingOverlay.style.display = 'flex';

  try {
    // Ensure the last set is submitted
    submitSet(5);

    // Define sample pools per chord
    const samplePools = {
      A: aChordSamples,
      C: cChordSamples,
      D: dChordSamples,
      E: eChordSamples,
      G: gChordSamples
    };

    // Submit all 5 sets
    for (let setNumber = 1; setNumber <= 5; setNumber++) {
      const chord = chordMap[setNumber];
      const fullPool = samplePools[chord];
      const poolLength = fullPool.length;

      const rankings = allRankings[setNumber] || [];

      // Create an array of size 10 (or fullPool.length), initialized with empty strings
      const rankArray = Array(poolLength).fill("");

      // Fill brightness values into correct positions based on data-index
      rankings.forEach(r => {
        if (r.index >= 0 && r.index < poolLength) {
          rankArray[r.index] = r.brightness;
        }
      });

      // Submit the result
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participantId,
          setNumber,
          chord,
          rankings: rankArray
        })
      });

      if (!response.ok && response.status !== 0) {
        throw new Error('Network response was not ok');
      }
    }

    loadingOverlay.style.display = 'none';
    alert('Thank you! Your responses have been recorded.');
    window.location.href = 'thank-you.html';
  } catch (error) {
    loadingOverlay.style.display = 'none';
    console.error('Error saving results:', error);
    alert('There was an error saving your results. Please try again.');
  }
}


function startTest() {
  const progress = document.querySelector('.progress');
  if (progress) {
    progress.style.display = 'block';
  }
  document.getElementById('instructions').classList.remove('active');
  document.getElementById('set1').classList.add('active');
  document.querySelector('.progress').textContent = 'Set 1 of 5';
}

// Fisher-Yates shuffle for DOM elements inside .samples-container
function shuffleSamplesInSet(setElement) {
  const container = setElement.querySelector('.samples-container');
  if (!container) return;
  const samples = Array.from(container.querySelectorAll('.sample'));
  // Shuffle samples array
  for (let i = samples.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [samples[i], samples[j]] = [samples[j], samples[i]];
  }
  // Remove all samples and re-append in shuffled order
  samples.forEach(sample => container.appendChild(sample));
}

// Utility to get N random elements from an array
function getRandomSamples(arr, n) {
  const shuffled = arr.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, n);
}

function insertRandomASamples() {
  const samples = getRandomSamples(aChordSamples, 4);
  const container = document.getElementById('a-samples');
  container.innerHTML = '';
  samples.forEach(sample => {
    const trueIndex = aChordSamples.indexOf(sample);
    container.innerHTML += `
      <div class="sample">
        <button class="play-button">Play</button>
        <audio src="${sample.src}"></audio>
        <div class="brightness-control">
          <div class="slider-container">
            <input type="range" min="0" max="100" value="50"
              class="brightness-slider"
              data-index="${trueIndex}">
            <span class="brightness-value">50</span>
          </div>
          <div class="slider-labels">
            <span>Less Bright</span>
            <span>Brighter</span>
          </div>
        </div>
      </div>
    `;
  });
}

function insertRandomCSamples() {
  const samples = getRandomSamples(cChordSamples, 4);
  const container = document.getElementById('c-samples');
  container.innerHTML = '';
  samples.forEach(sample => {
    const trueIndex = cChordSamples.indexOf(sample);
    container.innerHTML += `
      <div class="sample">
        <button class="play-button">Play</button>
        <audio src="${sample.src}"></audio>
        <div class="brightness-control">
          <div class="slider-container">
            <input type="range" min="0" max="100" value="50"
              class="brightness-slider"
              data-index="${trueIndex}">
            <span class="brightness-value">50</span>
          </div>
          <div class="slider-labels">
            <span>Less Bright</span>
            <span>Brighter</span>
          </div>
        </div>
      </div>
    `;
  });
}

function insertRandomDSamples() {
  const samples = getRandomSamples(dChordSamples, 4);
  const container = document.getElementById('d-samples');
  container.innerHTML = '';
  samples.forEach(sample => {
    const trueIndex = dChordSamples.indexOf(sample);
    container.innerHTML += `
      <div class="sample">
        <button class="play-button">Play</button>
        <audio src="${sample.src}"></audio>
        <div class="brightness-control">
          <div class="slider-container">
            <input type="range" min="0" max="100" value="50"
              class="brightness-slider"
              data-index="${trueIndex}">
            <span class="brightness-value">50</span>
          </div>
          <div class="slider-labels">
            <span>Less Bright</span>
            <span>Brighter</span>
          </div>
        </div>
      </div>
    `;
  });
}

function insertRandomESamples() {
  const samples = getRandomSamples(eChordSamples, 4);
  const container = document.getElementById('e-samples');
  container.innerHTML = '';
  samples.forEach(sample => {
    const trueIndex = eChordSamples.indexOf(sample);
    container.innerHTML += `
      <div class="sample">
        <button class="play-button">Play</button>
        <audio src="${sample.src}"></audio>
        <div class="brightness-control">
          <div class="slider-container">
            <input type="range" min="0" max="100" value="50"
              class="brightness-slider"
              data-index="${trueIndex}">
            <span class="brightness-value">50</span>
          </div>
          <div class="slider-labels">
            <span>Less Bright</span>
            <span>Brighter</span>
          </div>
        </div>
      </div>
    `;
  });
}

function insertRandomGSamples() {
  const samples = getRandomSamples(gChordSamples, 4);
  const container = document.getElementById('g-samples');
  container.innerHTML = '';
  samples.forEach(sample => {
    const trueIndex = gChordSamples.indexOf(sample);
    container.innerHTML += `
      <div class="sample">
        <button class="play-button">Play</button>
        <audio src="${sample.src}"></audio>
        <div class="brightness-control">
          <div class="slider-container">
            <input type="range" min="0" max="100" value="50"
              class="brightness-slider"
              data-index="${trueIndex}">
            <span class="brightness-value">50</span>
          </div>
          <div class="slider-labels">
            <span>Less Bright</span>
            <span>Brighter</span>
          </div>
        </div>
      </div>
    `;
  });
}





// Initialize drag and drop functionality
document.addEventListener('DOMContentLoaded', () => {
  // First, hide ALL content including sets and instructions
  document.querySelectorAll('.set, #instructions').forEach(element => {
    element.classList.remove('active');
  });

  // Insert random A, C, D, E, and G chord samples before shuffling
  insertRandomASamples();
  insertRandomCSamples();
  insertRandomDSamples();
  insertRandomESamples();
  insertRandomGSamples();

  // Shuffle samples in each set before anything is shown
  for (let setNumber = 1; setNumber <= 5; setNumber++) {
    const setEl = document.getElementById(`set${setNumber}`);
    if (setEl) shuffleSamplesInSet(setEl);
  }

  // Then explicitly show instructions
  const instructions = document.getElementById('instructions');
  if (instructions) {
    instructions.classList.add('active');
  }

  // Hide progress indicator initially
  const progress = document.querySelector('.progress');
  if (progress) {
    progress.style.display = 'none';
  }

  // Initialize drag and drop
  const samples = document.querySelectorAll('.sample');
  samples.forEach(sample => {
    sample.addEventListener('dragstart', handleDragStart);
  });

  document.querySelectorAll('.sample-slot').forEach(slot => {
    slot.addEventListener('dragover', handleDragOver);
    slot.addEventListener('drop', handleDrop);
  });

  // Add play button functionality
  document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', function() {
      const audio = this.nextElementSibling;
      stopCurrentAudio();
      audio.loop = true; // Enable looping
      audio.play();
      currentlyPlaying = audio;
    });
  });

  // Initialize sliders
  document.querySelectorAll('.brightness-slider').forEach(slider => {
    slider.setAttribute('step', '5'); // Ensure step is 5
    slider.addEventListener('input', function() {
      this.nextElementSibling.textContent = this.value;
    });
  });
});

let draggedItem = null;
let currentlyPlaying = null;

function stopCurrentAudio() {
  if (currentlyPlaying) {
    currentlyPlaying.pause();
    currentlyPlaying.currentTime = 0;
    currentlyPlaying.loop = false; // Disable looping when stopped
  }
}

function handleDragStart(e) {
  draggedItem = e.target.closest('.sample');
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
  e.preventDefault();
  const slot = e.target.closest('.sample-slot');
  if (slot) {
    e.dataTransfer.dropEffect = 'move';
  }
}

function handleDrop(e) {
  e.preventDefault();
  const dropSlot = e.target.closest('.sample-slot');
  if (dropSlot && draggedItem) {
    const oldSlot = draggedItem.parentNode;
    const oldSample = dropSlot.querySelector('.sample');
    if (oldSample) {
      oldSlot.appendChild(oldSample);
    }
    dropSlot.appendChild(draggedItem);
  }
}
    
    dropSlot.appendChild(draggedItem);


