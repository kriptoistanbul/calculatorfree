// public/assets/js/investmentReturnCalculator.js

document.getElementById('investment-return-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
    const annualInterestRate = parseFloat(document.getElementById('annualInterestRate').value);
    const years = parseInt(document.getElementById('years').value);
    const resultDiv = document.getElementById('investment-return-result');
  
    if (isNaN(initialInvestment) || isNaN(monthlyContribution) || isNaN(annualInterestRate) || isNaN(years)) {
      resultDiv.innerHTML = '<p class="error">Please enter valid numbers.</p>';
      return;
    }
  
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfMonths = years * 12;
  
    // Future Value Formula
    const futureValue = initialInvestment * Math.pow(1 + monthlyInterestRate, numberOfMonths) +
                        monthlyContribution * (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1) / monthlyInterestRate;
  
    resultDiv.innerHTML = `
      <p>${__('Future Value of Investment')}: $${futureValue.toFixed(2)}</p>
    `;
  });