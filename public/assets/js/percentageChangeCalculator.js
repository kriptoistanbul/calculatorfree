document.getElementById('percentage-change-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const originalValue = parseFloat(document.getElementById('originalValue').value);
    const newValue = parseFloat(document.getElementById('newValue').value);
  
    if (originalValue === 0) {
      document.getElementById('percentage-change-result').textContent = 'Original value cannot be zero.';
      return;
    }
  
    const change = ((newValue - originalValue) / originalValue) * 100;
    let changeType = '';
  
    if (change > 0) {
      changeType = 'Increase';
    } else if (change < 0) {
      changeType = 'Decrease';
    } else {
      changeType = 'No Change';
    }
  
    document.getElementById('percentage-change-result').textContent = `Percentage Change: ${change.toFixed(2)}% (${__('changeType')})`;
  });