document.getElementById('mortgage-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
  
    if (loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) {
      document.getElementById('mortgage-result').textContent = 'Please enter valid positive numbers.';
      return;
    }
  
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    let monthlyPayment;
  
    if (monthlyInterestRate === 0) {
      monthlyPayment = loanAmount / numberOfPayments;
    } else {
      monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    }
  
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;
  
    document.getElementById('mortgage-result').textContent = `Monthly Payment: $${monthlyPayment.toFixed(2)}, Total Payment: $${totalPayment.toFixed(2)}, Total Interest: $${totalInterest.toFixed(2)}.`;
  });