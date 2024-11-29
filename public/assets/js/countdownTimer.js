document.getElementById('countdown-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const eventName = document.getElementById('eventName').value.trim();
    const eventDateTimeInput = document.getElementById('eventDateTime').value;
    
    if (!eventName) {
      document.getElementById('countdown-result').textContent = 'Please enter an event name.';
      return;
    }
  
    const eventDateTime = new Date(eventDateTimeInput);
    const now = new Date();
  
    if (eventDateTime <= now) {
      document.getElementById('countdown-result').textContent = 'Event date and time must be in the future.';
      return;
    }
  
    const countdownInterval = setInterval(function () {
      const currentTime = new Date();
      const diff = eventDateTime - currentTime;
  
      if (diff <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown-result').textContent = `The event "${eventName}" has started!`;
        return;
      }
  
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
  
      document.getElementById('countdown-result').textContent = `Countdown to "${eventName}": ${days} ${__('days')}, ${hours} ${__('hours')}, ${minutes} ${__('minutes')}, ${seconds} ${__('seconds')}.`;
    }, 1000);
  });