document.getElementById('hydrogen-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const hydrogenLevel = parseFloat(document.getElementById('hydrogen-level').value);
  
    if (isNaN(hydrogenLevel)) {
      document.getElementById('result').textContent = 'Please enter a valid number.';
      return;
    }
  
    // Example calculation
    const healthImpact = hydrogenLevel > 1.5 ? 'High' : hydrogenLevel > 0.5 ? 'Moderate' : 'Low';
  
    document.getElementById('result').textContent = `Hydrogen Level: ${hydrogenLevel} mg/L - Health Impact: ${healthImpact}`;
  });