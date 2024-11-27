document.getElementById('work-hours-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const regularHours = parseFloat(document.getElementById('regular-hours').value);
    const overtimeHours = parseFloat(document.getElementById('overtime-hours').value);
    const breaksPerDay = parseFloat(document.getElementById('breaks').value);
  
    if (isNaN(regularHours) || isNaN(overtimeHours) || isNaN(breaksPerDay)) {
      document.getElementById('result').textContent = 'Please enter valid numbers.';
      return;
    }
  
    const totalWeeklyHours = regularHours + overtimeHours - ((breaksPerDay / 60) * 5); // Assuming 5 workdays
    document.getElementById('result').textContent = `Total Weekly Hours Worked: ${totalWeeklyHours.toFixed(2)} hours.`;
  });