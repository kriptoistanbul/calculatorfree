document.getElementById('ibw-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const gender = document.getElementById('gender').value;
    const heightCm = parseFloat(document.getElementById('height').value);
  
    if (!['male', 'female'].includes(gender) || heightCm <= 0) {
      document.getElementById('ibw-result').textContent = 'Please enter valid inputs.';
      return;
    }
  
    // Devine Formula
    let ibw;
    if (gender === 'male') {
      ibw = 50 + 2.3 * ((heightCm - 152.4) / 2.54);
    } else {
      ibw = 45.5 + 2.3 * ((heightCm - 152.4) / 2.54);
    }
  
    document.getElementById('ibw-result').textContent = `Your Ideal Body Weight is ${ibw.toFixed(2)} kg.`;
  });