document.getElementById('percentage-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const value = parseFloat(document.getElementById('value').value);
    const percentage = parseFloat(document.getElementById('percentage').value);
  
    if (isNaN(value) || isNaN(percentage)) {
      document.getElementById('result').textContent = 'Please enter valid numbers.';
      return;
    }
  
    const result = (value * percentage) / 100;
  
    document.getElementById('result').textContent = `${percentage}% of ${value} is ${result}`;
  });