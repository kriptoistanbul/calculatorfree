// public/assets/js/waterUsageCalculator.js

function addAppliance() {
    const appliancesContainer = document.getElementById('appliances-container');
    const applianceDiv = document.createElement('div');
    applianceDiv.className = 'appliance';
    applianceDiv.innerHTML = `
      <label><%= __('Appliance Name:') %></label>
      <input type="text" name="applianceName" required>
  
      <label><%= __('Water Usage per Use (liters):') %></label>
      <input type="number" name="waterUsage" step="0.1" required>
  
      <label><%= __('Uses per Day:') %></label>
      <input type="number" name="usesPerDay" step="0.1" required>
    `;
    appliancesContainer.appendChild(applianceDiv);
  }
  
  document.getElementById('water-usage-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const appliances = document.querySelectorAll('#appliances-container .appliance');
    let totalDailyLiters = 0;
    let totalMonthlyLiters = 0;
    const resultDiv = document.getElementById('water-usage-result');
  
    appliances.forEach(appliance => {
      const waterUsage = parseFloat(appliance.querySelector('input[name="waterUsage"]').value);
      const usesPerDay = parseFloat(appliance.querySelector('input[name="usesPerDay"]').value);
  
      if (isNaN(waterUsage) || isNaN(usesPerDay)) {
        resultDiv.innerHTML = '<p class="error">Please enter valid water usage and uses per day.</p>';
        return;
      }
  
      totalDailyLiters += waterUsage * usesPerDay;
    });
  
    totalMonthlyLiters = totalDailyLiters * 30;
  
    resultDiv.innerHTML = `
      <p>${__('Total Daily Water Usage')}: ${totalDailyLiters.toFixed(2)} liters/day</p>
      <p>${__('Total Monthly Water Usage')}: ${totalMonthlyLiters.toFixed(2)} liters/month</p>
    `;
  });