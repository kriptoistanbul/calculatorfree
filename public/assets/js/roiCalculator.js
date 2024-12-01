// public/assets/js/roiCalculator.js

document.getElementById('roi-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const gain = parseFloat(document.getElementById('gain').value);
    const cost = parseFloat(document.getElementById('cost').value);
    const resultDiv = document.getElementById('roi-result');
  
    if (isNaN(gain) || isNaN(cost)) {
      resultDiv.innerHTML = '<p class="error">Please enter valid numbers.</p>';
      return;
    }
  
    if (cost === 0) {
      resultDiv.innerHTML = '<p class="error">Cost of investment cannot be zero.</p>';
      return;
    }
  
    const roi = ((gain - cost) / cost) * 100;
  
    resultDiv.innerHTML = `
      <p>${__('Return on Investment (ROI)')}: ${roi.toFixed(2)}%</p>
    `;
  });