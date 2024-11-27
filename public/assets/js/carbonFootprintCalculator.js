document.getElementById('carbon-footprint-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const carMiles = parseFloat(document.getElementById('car-miles').value);
    const electricity = parseFloat(document.getElementById('electricity').value);
    const gas = parseFloat(document.getElementById('gas').value);
  
    if (isNaN(carMiles) || isNaN(electricity) || isNaN(gas)) {
      document.getElementById('result').textContent = 'Please enter valid numbers.';
      return;
    }
  
    // Emissions factors (example values)
    const carEmissions = carMiles * 0.411; // kg CO2 per mile
    const electricityEmissions = electricity * 0.475; // kg CO2 per kWh
    const gasEmissions = gas * 5.3; // kg CO2 per therm
  
    const totalEmissions = carEmissions + electricityEmissions + gasEmissions;
  
    document.getElementById('result').textContent = `Your annual carbon footprint is ${totalEmissions.toFixed(2)} kg CO2.`;
  });