document.getElementById('date-diff-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);
  
    if (startDate > endDate) {
      document.getElementById('result').textContent = 'Start date cannot be after end date.';
      return;
    }
  
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    document.getElementById('result').textContent = `The difference is ${diffDays} days.`;
  });