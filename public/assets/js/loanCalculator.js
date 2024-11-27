document.getElementById('loan-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value);
    const loanTerm = parseInt(document.getElementById('loan-term').value);
  
    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
      document.getElementById('result').textContent = 'Please enter positive values.';
      return;
    }
  
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
  
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow((1 + monthlyInterestRate), -numberOfPayments));
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;
  
    document.getElementById('result').innerHTML = `
      <p>Monthly Payment: $${monthlyPayment.toFixed(2)}</p>
      <p>Total Interest: $${totalInterest.toFixed(2)}</p>
      <p>Total Payment: $${totalPayment.toFixed(2)}</p>
    `;
  });