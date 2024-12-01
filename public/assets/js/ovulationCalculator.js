// public/assets/js/ovulationCalculator.js

document.getElementById('ovulation-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const lastMenstrualPeriodInput = document.getElementById('lastMenstrualPeriod');
    const cycleLength = parseInt(document.getElementById('cycleLength').value);
    const resultDiv = document.getElementById('ovulation-result');
  
    if (!lastMenstrualPeriodInput || isNaN(cycleLength)) {
      resultDiv.innerHTML = '<p class="error">Please enter valid data.</p>';
      return;
    }
  
    const lastMenstrualPeriod = new Date(lastMenstrualPeriodInput.value);
    if (isNaN(lastMenstrualPeriod)) {
      resultDiv.innerHTML = '<p class="error">Please enter a valid date.</p>';
      return;
    }
  
    // Ovulation typically occurs 14 days before the next period
    const ovulationDay = new Date(lastMenstrualPeriod);
    ovulationDay.setDate(ovulationDay.getDate() + cycleLength - 14);
  
    // Fertile window: ovulation day ±2 days
    const fertileStart = new Date(ovulationDay);
    fertileStart.setDate(fertileStart.getDate() - 2);
  
    const fertileEnd = new Date(ovulationDay);
    fertileEnd.setDate(fertileEnd.getDate() + 2);
  
    resultDiv.innerHTML = `
      <p>${__('Ovulation Day')}: ${ovulationDay.toLocaleDateString()}</p>
      <p>${__('Fertile Window')}: ${fertileStart.toLocaleDateString()} - ${fertileEnd.toLocaleDateString()}</p>
    `;
  });