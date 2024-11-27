document.getElementById('project-cost-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const items = parseInt(document.getElementById('items').value);
    const costPerItem = parseFloat(document.getElementById('cost-per-item').value);
    const additionalCosts = parseFloat(document.getElementById('additional-costs').value);
  
    if (isNaN(items) || isNaN(costPerItem) || isNaN(additionalCosts)) {
      document.getElementById('result').textContent = 'Please enter valid numbers.';
      return;
    }
  
    const totalCost = (items * costPerItem) + additionalCosts;
    document.getElementById('result').textContent = `Total Project Cost: $${totalCost.toFixed(2)}`;
  });