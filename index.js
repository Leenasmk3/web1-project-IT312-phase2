
window.addEventListener('DOMContentLoaded', function() {
  // Create the button 
  var backToTopBtn = document.createElement('button');
  backToTopBtn.id = 'backToTop';
  backToTopBtn.innerHTML = '↑';
  document.body.appendChild(backToTopBtn);

  // Show/hide button
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

 
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

// Clock 
function updateClock() {
  var now = new Date();
  
 
  var options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  var dateString = now.toLocaleDateString('en-US', options);
  
  // Format time
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12; 
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  
  var timeString = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
  
  // Update the clock 
  var clockElement = document.getElementById('live-clock');
  if (clockElement) {
    clockElement.innerHTML = '<div class="clock-date">' + dateString + '</div>' +
                            '<div class="clock-time">' + timeString + '</div>';
  }
}


window.addEventListener('DOMContentLoaded', function() {
  var footer = document.querySelector('.site-footer .container.footer-box');
  if (footer) {
    var clockDiv = document.createElement('div');
    clockDiv.id = 'live-clock';
    clockDiv.className = 'footer-clock';
    footer.appendChild(clockDiv);
   
    updateClock();
    setInterval(updateClock, 1000);
  }
});
