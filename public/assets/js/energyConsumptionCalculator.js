// public/assets/js/energyConsumptionCalculator.js

function addAppliance() {
    const appliancesContainer = document.getElementById('appliances-container');
    const applianceDiv = document.createElement('div');
    applianceDiv.className = 'appliance';
    applianceDiv.innerHTML = `
      <label><%= __('Appliance Name:') %></label>
      <input type="text" name="applianceName" required>
  
      <label><%= __('Power Rating (Watts):') %></label>
      <input type="number" name="powerRating" step="0.1" required>
  
      <label><%= __('Usage Hours per Day:') %></label>
      <input type="number" name="usageHours" step="0.1" required>
    `;
    appliancesContainer.appendChild(applianceDiv);
  }
  
  document.getElementById('energy-consumption-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const appliances = document.querySelectorAll('#appliances-container .appliance');
    let totalEnergyKWh = 0;
    const resultDiv = document.getElementById('energy-consumption-result');
  
    appliances.forEach(appliance => {
      const powerRating = parseFloat(appliance.querySelector('input[name="powerRating"]').value);
      const usageHours = parseFloat(appliance.querySelector('input[name="usageHours"]').value);
  
      if (isNaN(powerRating) || isNaN(usageHours)) {
        resultDiv.innerHTML = '<p class="error">Please enter valid power ratings and usage hours.</p>';
        return;
      }
  
      // Energy (kWh) = Power (Watts) * Time (hours) / 1000
      totalEnergyKWh += (powerRating * usageHours) / 1000;
    });
  
    resultDiv.innerHTML = `
      <p>${__('Total Energy Consumption')}: ${totalEnergyKWh.toFixed(2)} kWh/day</p>
      <p>${__('Monthly Energy Consumption')}: ${(totalEnergyKWh * 30).toFixed(2)} kWh/month</p>
    `;
  });