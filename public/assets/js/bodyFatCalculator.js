document.getElementById('body-fat-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const weight = parseFloat(document.getElementById('weight').value);
    const waist = parseFloat(document.getElementById('waist').value);
    const neck = parseFloat(document.getElementById('neck').value);
    const hipInput = document.getElementById('hip');
    const hip = hipInput ? parseFloat(hipInput.value) : 0;
    const gender = document.getElementById('gender').value;
    const resultDiv = document.getElementById('body-fat-result');
  
    if (isNaN(weight) || isNaN(waist) || isNaN(neck) || (gender === 'female' && isNaN(hip))) {
      resultDiv.innerHTML = '<p class="error">Please enter valid measurements.</p>';
      return;
    }
  
    let bodyFatPercentage;
  
    if (gender === 'male') {
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(weight)) - 450;
    } else if (gender === 'female') {
      if (hip === 0) {
        resultDiv.innerHTML = '<p class="error">Please enter your hip circumference.</p>';
        return;
      }
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(weight)) - 450;
    }
  
    resultDiv.innerHTML = `
      <p>${__('Your Body Fat Percentage')}: ${bodyFatPercentage.toFixed(2)}%</p>
    `;
});document.getElementById('body-fat-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const weight = parseFloat(document.getElementById('weight').value);
  const waist = parseFloat(document.getElementById('waist').value);
  const neck = parseFloat(document.getElementById('neck').value);
  const hipInput = document.getElementById('hip');
  const hip = hipInput ? parseFloat(hipInput.value) : 0;
  const gender = document.getElementById('gender').value;
  const resultDiv = document.getElementById('body-fat-result');

  if (isNaN(weight) || isNaN(waist) || isNaN(neck) || (gender === 'female' && isNaN(hip))) {
    resultDiv.innerHTML = '<p class="error">Please enter valid measurements.</p>';
    return;
  }

  let bodyFatPercentage;

  if (gender === 'male') {
    bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(weight)) - 450;
  } else if (gender === 'female') {
    if (hip === 0) {
      resultDiv.innerHTML = '<p class="error">Please enter your hip circumference.</p>';
      return;
    }
    bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(weight)) - 450;
  }

  resultDiv.innerHTML = `
    <p>${__('Your Body Fat Percentage')}: ${bodyFatPercentage.toFixed(2)}%</p>
  `;
});