document.getElementById('profit-margin-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const costPrice = parseFloat(document.getElementById('cost-price').value);
  const sellingPrice = parseFloat(document.getElementById('selling-price').value);

  if (sellingPrice === 0) {
    document.getElementById('result').textContent = 'Selling price cannot be zero.';
    return;
  }

  const profitMargin = ((sellingPrice - costPrice) / sellingPrice) * 100;
  document.getElementById('result').textContent = `Profit Margin: ${profitMargin.toFixed(2)}%`;
});