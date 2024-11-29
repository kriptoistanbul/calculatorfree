document.getElementById('electricity-usage-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const powerRating = parseFloat(document.getElementById('powerRating').value);
    const usageHours = parseFloat(document.getElementById('usageHours').value);
    const electricityRate = parseFloat(document.getElementById('electricityRate').value);
    const days = parseInt(document.getElementById('days').value);
  
    if (powerRating <= 0 || usageHours < 0 || electricityRate < 0 || days <= 0) {
      document.getElementById('electricity-usage-result').textContent = 'Please enter valid positive numbers.';
      return;
    }
  
    const totalKWh = (powerRating * usageHours * days) / 1000;
    const totalCost = totalKWh * electricityRate;
  
    document.getElementById('electricity-usage-result').textContent = `Total Electricity Consumed: ${totalKWh.toFixed(2)} kWh. Total Cost: $${totalCost.toFixed(2)}.`;
  });