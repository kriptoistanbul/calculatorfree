document.getElementById('retirement-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const currentAge = parseInt(document.getElementById('currentAge').value);
    const retirementAge = parseInt(document.getElementById('retirementAge').value);
    const currentSavings = parseFloat(document.getElementById('currentSavings').value);
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
    const annualReturnRate = parseFloat(document.getElementById('annualReturnRate').value);
  
    if (currentAge < 0 || retirementAge <= currentAge || currentSavings < 0 || monthlyContribution < 0 || annualReturnRate < 0) {
      document.getElementById('retirement-result').textContent = 'Please enter valid numbers. Retirement age must be greater than current age.';
      return;
    }
  
    const years = retirementAge - currentAge;
    const monthlyRate = annualReturnRate / 100 / 12;
    const totalMonths = years * 12;
    let futureSavings = currentSavings;
    let totalContributions = currentSavings;
    let totalInterest = 0;
  
    for (let i = 0; i < totalMonths; i++) {
      const interest = futureSavings * monthlyRate;
      futureSavings += monthlyContribution + interest;
      totalContributions += monthlyContribution;
      totalInterest += interest;
    }
  
    document.getElementById('retirement-result').textContent = `Estimated Retirement Savings: $${futureSavings.toFixed(2)}, Total Contributions: $${totalContributions.toFixed(2)}, Total Interest Earned: $${totalInterest.toFixed(2)}.`;
  });