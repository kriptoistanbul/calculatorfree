// public/assets/js/scientificCalculator.js

function appendToDisplay(value) {
    const display = document.getElementById('calc-display');
    display.value += value;
  }
  
  function clearDisplay() {
    document.getElementById('calc-display').value = '';
  }
  
  function deleteLast() {
    const display = document.getElementById('calc-display');
    display.value = display.value.slice(0, -1);
  }
  
  function calculate() {
    const display = document.getElementById('calc-display');
    try {
      const result = eval(display.value);
      display.value = result;
    } catch (error) {
      display.value = '<p class="error">Error</p>';
    }
  }