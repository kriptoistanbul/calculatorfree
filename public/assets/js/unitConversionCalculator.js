// public/assets/js/unitConversionCalculator.js

const conversionRates = {
    meters: {
      meters: 1,
      kilometers: 0.001,
      miles: 0.000621371,
      feet: 3.28084
      // Add more units as needed
    },
    kilometers: {
      meters: 1000,
      kilometers: 1,
      miles: 0.621371,
      feet: 3280.84
      // Add more units as needed
    },
    miles: {
      meters: 1609.34,
      kilometers: 1.60934,
      miles: 1,
      feet: 5280
      // Add more units as needed
    },
    feet: {
      meters: 0.3048,
      kilometers: 0.0003048,
      miles: 0.000189394,
      feet: 1
      // Add more units as needed
    }
    // Add more base units as needed
  };
  
  document.getElementById('unit-conversion-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const value = parseFloat(document.getElementById('value').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const resultDiv = document.getElementById('unit-conversion-result');
  
    if (isNaN(value)) {
      resultDiv.innerHTML = '<p class="error">Please enter a valid number.</p>';
      return;
    }
  
    if (!conversionRates[fromUnit] || !conversionRates[fromUnit][toUnit]) {
      resultDiv.innerHTML = '<p class="error">Conversion not supported.</p>';
      return;
    }
  
    const convertedValue = value * conversionRates[fromUnit][toUnit];
    resultDiv.innerHTML = `
      <p>${__('Converted Value')}: ${convertedValue.toFixed(2)} ${toUnit}</p>
    `;
  });