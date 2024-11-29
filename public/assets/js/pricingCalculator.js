document.getElementById('pricing-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const costPrice = parseFloat(document.getElementById('costPrice').value);
    const desiredMargin = parseFloat(document.getElementById('desiredMargin').value);
  
    if (costPrice < 0 || desiredMargin < 0 || desiredMargin >= 100) {
      document.getElementById('pricing-result').textContent = 'Please enter valid numbers. Desired margin must be less than 100%.';
      return;
    }
  
    const sellingPrice = costPrice / (1 - desiredMargin / 100);
    const actualMargin = ((sellingPrice - costPrice) / sellingPrice) * 100;
  
    document.getElementById('pricing-result').textContent = `Selling Price: $${sellingPrice.toFixed(2)}. Profit Margin: ${actualMargin.toFixed(2)}%.`;
  });