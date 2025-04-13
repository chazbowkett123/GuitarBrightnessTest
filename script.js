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
  8: 'G'
};

function submitSet(setNumber) {
  const currentSet = document.getElementById(`set${setNumber}`);
  const samples = currentSet.querySelectorAll('.sample');
  const rankings = Array.from(samples).map(sample => ({
    index: parseInt(sample.dataset.index),
    rank: parseInt(sample.querySelector('.rank-number').textContent)
  }));

  // Store rankings for this set
  allRankings[setNumber] = rankings;

  // Hide current set and show next set
  currentSet.classList.remove('active');
  if (setNumber < 8) {
    document.getElementById(`set${setNumber + 1}`).classList.add('active');
    document.querySelector('.progress').textContent = `Set ${setNumber + 1} of 8`;
  }
}

async function submitFinal() {
  alert("You will be redirected to a thank you page after pressing OK. Please wait 10-15 seconds while your results are being submitted"); 
  try {
    // Submit the last set's rankings
    submitSet(8);

    // Prepare and submit all rankings
    for (let setNumber = 1; setNumber <= 8; setNumber++) {
      const rankings = allRankings[setNumber] || [];
      const rankArray = rankings.map(r => r.rank);

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

    alert('Thank you! Your responses have been recorded.');
    window.location.href = 'thank-you.html';
  } catch (error) {
    console.error('Error saving results:', error);
    alert('There was an error saving your results. Please try again.');
  }
}

// Initialize drag and drop functionality
document.addEventListener('DOMContentLoaded', () => {
  const samples = document.querySelectorAll('.sample');
  samples.forEach(sample => {
    sample.addEventListener('dragstart', handleDragStart);
    sample.addEventListener('dragover', handleDragOver);
    sample.addEventListener('drop', handleDrop);
  });
});

let draggedItem = null;

function handleDragStart(e) {
  draggedItem = e.target;
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
  e.preventDefault();
  const dropTarget = e.target.closest('.sample');
  if (dropTarget && draggedItem !== dropTarget) {
    const allItems = [...dropTarget.parentNode.children];
    const draggedIndex = allItems.indexOf(draggedItem);
    const droppedIndex = allItems.indexOf(dropTarget);

    if (draggedIndex < droppedIndex) {
      dropTarget.parentNode.insertBefore(draggedItem, dropTarget.nextSibling);
    } else {
      dropTarget.parentNode.insertBefore(draggedItem, dropTarget);
    }

    // Update rank numbers
    allItems.forEach((item, index) => {
      item.querySelector('.rank-number').textContent = index + 1;
    });
  }
}
