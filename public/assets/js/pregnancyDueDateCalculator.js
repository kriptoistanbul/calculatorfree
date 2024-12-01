// public/assets/js/pregnancyDueDateCalculator.js

document.getElementById('pregnancy-due-date-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const lastMenstrualPeriodInput = document.getElementById('lastMenstrualPeriod');
    const resultDiv = document.getElementById('pregnancy-due-date-result');
  
    if (!lastMenstrualPeriodInput || !resultDiv) {
      console.error('Form elements are missing.');
      return;
    }
  
    const lastMenstrualPeriod = new Date(lastMenstrualPeriodInput.value);
    if (isNaN(lastMenstrualPeriod)) {
      resultDiv.innerHTML = '<p class="error">Please enter a valid date.</p>';
      return;
    }
  
    // Calculate due date (280 days from last menstrual period)
    const dueDate = new Date(lastMenstrualPeriod);
    dueDate.setDate(dueDate.getDate() + 280);
  
    resultDiv.innerHTML = `
      <p>${__('Estimated Due Date')}: ${dueDate.toLocaleDateString()}</p>
    `;
  });