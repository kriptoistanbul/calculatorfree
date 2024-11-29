document.getElementById('clv-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const averagePurchaseValue = parseFloat(document.getElementById('averagePurchaseValue').value);
    const purchaseFrequency = parseFloat(document.getElementById('purchaseFrequency').value);
    const customerLifespan = parseFloat(document.getElementById('customerLifespan').value);
  
    if (averagePurchaseValue < 0 || purchaseFrequency < 0 || customerLifespan < 0) {
      document.getElementById('clv-result').textContent = 'Please enter valid positive numbers.';
      return;
    }
  
    const clv = averagePurchaseValue * purchaseFrequency * customerLifespan;
  
    document.getElementById('clv-result').textContent = `Customer Lifetime Value (CLV): $${clv.toFixed(2)}.`;
  });