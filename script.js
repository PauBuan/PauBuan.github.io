function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    var logo = document.getElementById('logo');
    logo.classList.add('visible');
});

function playSurprise() {
  // Change button text
  var surpriseButton = document.querySelector('.btn.btn-color-3');
  surpriseButton.innerText = "Now you're trapped!";

  // Disable the button
  surpriseButton.disabled = true;

  // Show the surprise container
  var surpriseContainer = document.getElementById('surpriseContainer');
  surpriseContainer.style.display = 'flex';

  // Play the audio in a loop without controls
  var surpriseAudio = document.getElementById('surpriseAudio');
  surpriseAudio.loop = true;
  surpriseAudio.play();

  // Hide controls once audio starts playing
  surpriseAudio.addEventListener('play', function () {
      surpriseAudio.removeAttribute('controls');
  });

  // Set loop to false when audio ends to allow controls in subsequent loops
  surpriseAudio.addEventListener('ended', function () {
      surpriseAudio.loop = false;
  });

  // Create flying gifs
  for (var i = 0; i < 10; i++) {
      createFlyingGif();
  }
}

function createFlyingGif() {
  var gif = document.createElement('img');
  gif.src = './assets/surprise.gif';
  gif.alt = 'Surprise Gif';
  gif.style.position = 'absolute';
  gif.style.opacity = Math.random(); // Random opacity

  var centerX = window.innerWidth / 2;
  var centerY = window.innerHeight / 2;
  var radius = Math.min(window.innerWidth, window.innerHeight) / 3;

  // Initial positioning on the circle
  var angle = Math.random() * Math.PI * 2;
  var x = centerX + radius * Math.cos(angle);
  var y = centerY + radius * Math.sin(angle);

  gif.style.left = x + 'px';
  gif.style.top = y + 'px';

  document.body.appendChild(gif);

  // Animate the gif in a circular pattern
  function animateGif() {
      angle += 0.02; // Adjust the speed of rotation

      x = centerX + radius * Math.cos(angle);
      y = centerY + radius * Math.sin(angle);

      anime({
          targets: gif,
          left: x,
          top: y,
          duration: 50, // Adjust the duration of each step
          easing: 'linear',
          complete: animateGif
      });
  }

  // Start the initial animation
  animateGif();
}