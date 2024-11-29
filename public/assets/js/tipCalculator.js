document.getElementById('tip-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const tipPercentage = parseFloat(document.getElementById('tipPercentage').value);
  
    if (billAmount < 0 || tipPercentage < 0) {
      document.getElementById('tip-result').textContent = 'Please enter valid positive numbers.';
      return;
    }
  
    const tipAmount = (billAmount * tipPercentage) / 100;
    const totalBill = billAmount + tipAmount;
  
    document.getElementById('tip-result').textContent = `Tip Amount: $${tipAmount.toFixed(2)}. Total Bill: $${totalBill.toFixed(2)}.`;
  });