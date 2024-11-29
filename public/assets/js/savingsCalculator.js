document.getElementById('savings-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const currentSavings = parseFloat(document.getElementById('currentSavings').value);
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
    const annualInterestRate = parseFloat(document.getElementById('annualInterestRate').value);
    const years = parseInt(document.getElementById('years').value);
  
    if (currentSavings < 0 || monthlyContribution < 0 || annualInterestRate < 0 || years <= 0) {
      document.getElementById('savings-result').textContent = 'Please enter valid non-negative numbers.';
      return;
    }
  
    const monthlyRate = annualInterestRate / 100 / 12;
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
  
    document.getElementById('savings-result').textContent = `Future Savings: $${futureSavings.toFixed(2)}, Total Contributions: $${totalContributions.toFixed(2)}, Total Interest Earned: $${totalInterest.toFixed(2)}.`;
  });