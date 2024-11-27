document.getElementById('currency-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
  
    if (isNaN(amount) || amount <= 0) {
      document.getElementById('result').textContent = 'Please enter a valid amount.';
      return;
    }
  
    // For demonstration, using static exchange rates
    const exchangeRates = {
      USD: { USD: 1, EUR: 0.85, GBP: 0.75, JPY: 110 },
      EUR: { EUR: 1, USD: 1.18, GBP: 0.88, JPY: 129 },
      GBP: { GBP: 1, USD: 1.33, EUR: 1.14, JPY: 147 },
      JPY: { JPY: 1, USD: 0.0091, EUR: 0.0078, GBP: 0.0068 },
      // Add more currencies and rates as needed
    };
  
    const rate = exchangeRates[fromCurrency][toCurrency];
  
    if (!rate) {
      document.getElementById('result').textContent = 'Exchange rate not available.';
      return;
    }
  
    const convertedAmount = amount * rate;
  
    document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
  });