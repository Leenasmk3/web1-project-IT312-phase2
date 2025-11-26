
// Back to Top Button
window.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded - creating back to top button');
  
  // Create the button element
  const backToTopBtn = document.createElement('button');
  backToTopBtn.id = 'backToTop';
  backToTopBtn.innerHTML = '↑';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTopBtn);

  console.log('Back to top button created');

  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
      console.log('Showing back to top button');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // Scroll to top when button is clicked
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});



// Clock in Footer
function updateClock() {
  const now = new Date();
  
  // Format date
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const dateString = now.toLocaleDateString('en-US', options);
  
  // Format time
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; 
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  
  const timeString = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
  
  // Update the clock element
  const clockElement = document.getElementById('live-clock');
  if (clockElement) {
    clockElement.innerHTML = `
      <div class="clock-date">${dateString}</div>
      <div class="clock-time">${timeString}</div>
    `;
  }
}

// Create clock element in footer
window.addEventListener('DOMContentLoaded', function() {
  const footer = document.querySelector('.site-footer .container.footer-box');
  if (footer) {
    const clockDiv = document.createElement('div');
    clockDiv.id = 'live-clock';
    clockDiv.className = 'footer-clock';
    footer.appendChild(clockDiv);
   
    updateClock();
    setInterval(updateClock, 1000);
  }
});