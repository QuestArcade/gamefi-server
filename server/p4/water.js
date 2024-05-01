// Get the glass element
var glass = document.querySelector('.glass');
// Get the water sound element
var waterSound = document.getElementById('waterSound');

// Add event listeners for mouse down and mouse up events
glass.addEventListener('mousedown', function() {
  // Check if the water sound element exists
  if (waterSound) {
    // Play the water effect sound
    waterSound.loop = true; // Loop the sound
    waterSound.play();
  }
});

glass.addEventListener('mouseup', function() {
  // Check if the water sound element exists and if it's playing
  if (waterSound && !waterSound.paused) {
    // Pause the water effect sound
    waterSound.pause();
    waterSound.currentTime = 0; // Reset audio to start position
  }
});


  // Add event listener to the restart button
  document.getElementById("restart-button").addEventListener("click", function() {
    location.reload(); // Reload the page
  });