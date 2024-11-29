document.getElementById('loan-amortization-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
  
    if (loanAmount <= 0 || interestRate < 0 || loanTerm <= 0) {
      document.getElementById('loan-amortization-result').innerHTML = '<p class="error">Please enter valid positive numbers.</p>';
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
  
    let balance = loanAmount;
    let scheduleHTML = `
      <h3>${__('Amortization Schedule')}:</h3>
      <table border="1">
        <tr>
          <th>${__('Payment #')}</th>
          <th>${__('Principal ($)')}</th>
          <th>${__('Interest ($)')}</th>
          <th>${__('Total Payment ($)')}</th>
          <th>${__('Remaining Balance ($)')}</th>
        </tr>
    `;
  
    for (let i = 1; i <= numberOfPayments; i++) {
      const interest = balance * monthlyInterestRate;
      const principal = monthlyPayment - interest;
      balance -= principal;
  
      // Prevent negative balance in the last payment
      if (balance < 0) {
        balance = 0;
      }
  
      scheduleHTML += `
        <tr>
          <td>${i}</td>
          <td>${principal.toFixed(2)}</td>
          <td>${interest.toFixed(2)}</td>
          <td>${monthlyPayment.toFixed(2)}</td>
          <td>${balance.toFixed(2)}</td>
        </tr>
      `;
    }
  
    scheduleHTML += `</table>`;
  
    document.getElementById('loan-amortization-result').innerHTML = `
      <p>${__('Monthly Payment')}: $${monthlyPayment.toFixed(2)}</p>
      ${scheduleHTML}
    `;
  });