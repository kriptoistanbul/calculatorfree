document.getElementById('loan-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const annualInterestRate = parseFloat(document.getElementById('interest-rate').value);
    const loanTermYears = parseInt(document.getElementById('loan-term').value);
    const desiredMonthlyPayment = parseFloat(document.getElementById('monthly-payment').value);
  
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12;
  
    if (!isNaN(desiredMonthlyPayment) && desiredMonthlyPayment > 0) {
      // Calculate loan term based on desired monthly payment
      const numerator = Math.log(desiredMonthlyPayment / (desiredMonthlyPayment - loanAmount * monthlyInterestRate));
      const denominator = Math.log(1 + monthlyInterestRate);
      const calculatedTermMonths = numerator / denominator;
      const totalPayment = desiredMonthlyPayment * calculatedTermMonths;
      const totalInterest = totalPayment - loanAmount;
  
      document.getElementById('result').innerHTML = `
        <p>Loan Term: ${calculatedTermMonths.toFixed(0)} months (${(calculatedTermMonths / 12).toFixed(1)} years)</p>
        <p>Total Payment: $${totalPayment.toFixed(2)}</p>
        <p>Total Interest: $${totalInterest.toFixed(2)}</p>
      `;
    } else {
      // Calculate monthly payment based on loan term
      const monthlyPaymentCalculated = (loanAmount * monthlyInterestRate) / (1 - Math.pow((1 + monthlyInterestRate), -numberOfPayments));
      const totalPayment = monthlyPaymentCalculated * numberOfPayments;
      const totalInterest = totalPayment - loanAmount;
  
      document.getElementById('result').innerHTML = `
        <p>Monthly Payment: $${monthlyPaymentCalculated.toFixed(2)}</p>
        <p>Total Payment: $${totalPayment.toFixed(2)}</p>
        <p>Total Interest: $${totalInterest.toFixed(2)}</p>
      `;
    }
  });