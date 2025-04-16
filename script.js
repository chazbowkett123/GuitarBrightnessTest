// Keep track of rankings for each set
const allRankings = {};

// Generate a random participant ID
const participantId = Math.random().toString(36).substring(2, 15);

// Map set numbers to chord names
const chordMap = {
  1: 'A',
  2: 'A Minor',
  3: 'C',
  4: 'D',
  5: 'D Minor',
  6: 'E',
  7: 'E Minor',
  8: 'G',
  9: 'Sequence'
};

function submitSet(setNumber) {
  const currentSet = document.getElementById(`set${setNumber}`);
  const sliders = currentSet.querySelectorAll('.brightness-slider');
  const rankings = Array.from(sliders).map(slider => ({
    index: parseInt(slider.dataset.index),
    brightness: parseInt(slider.value)
  }));

  // Store rankings for this set
  allRankings[setNumber] = rankings;

  // Show next set
  currentSet.classList.remove('active');
  if (setNumber < 9) {
    document.getElementById(`set${setNumber + 1}`).classList.add('active');
    document.querySelector('.progress').textContent = `Set ${setNumber + 1} of 9`;
  }
}

async function submitFinal() {
  const loadingOverlay = document.querySelector('.loading-overlay');
  loadingOverlay.style.display = 'flex';
  
  try {
    // Submit the last set's rankings
    submitSet(9);

    // Prepare and submit all rankings
    for (let setNumber = 1; setNumber <= 9; setNumber++) {
      const rankings = allRankings[setNumber] || [];
      const rankArray = rankings.map(r => r.brightness);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          participantId,
          setNumber,
          chord: chordMap[setNumber],
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
  document.querySelector('.progress').textContent = 'Set 1 of 8';
}

// Initialize drag and drop functionality
document.addEventListener('DOMContentLoaded', () => {
  // First, hide ALL content including sets and instructions
  document.querySelectorAll('.set, #instructions').forEach(element => {
    element.classList.remove('active');
  });

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
      audio.play();
      currentlyPlaying = audio;
    });
  });

  // Initialize sliders
  document.querySelectorAll('.brightness-slider').forEach(slider => {
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
