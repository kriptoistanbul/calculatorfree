document.getElementById('time-zone-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const sourceTimeInput = document.getElementById('source-time').value;
    const sourceZone = document.getElementById('source-zone').value;
    const targetZone = document.getElementById('target-zone').value;
  
    if (!sourceTimeInput) {
      document.getElementById('result').textContent = 'Please enter a valid source time.';
      return;
    }
  
    const sourceTime = new Date(sourceTimeInput + ' UTC');
    const sourceOffset = getTimeZoneOffset(sourceZone, sourceTime);
    const targetOffset = getTimeZoneOffset(targetZone, sourceTime);
  
    const targetTime = new Date(sourceTime.getTime() + (targetOffset - sourceOffset) * 60000);
  
    document.getElementById('result').textContent = `Converted Time: ${targetTime.toLocaleString('en-US', { timeZone: targetZone })}`;
  });
  
  // Helper function to get time zone offset in minutes
  function getTimeZoneOffset(timeZone, date) {
    const options = { timeZone, hour12: false, year: 'numeric', month: 'numeric', day: 'numeric', 
                      hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const tzDate = new Date(date.toLocaleString('en-US', options));
    return (date - tzDate) / (1000 * 60);
  }