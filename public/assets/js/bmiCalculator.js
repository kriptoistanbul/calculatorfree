document.getElementById('bmi-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const weight = parseFloat(document.getElementById('weight').value);
  const heightCm = parseFloat(document.getElementById('height').value);

  if (heightCm === 0) {
    document.getElementById('result').textContent = 'Height cannot be zero.';
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);

  let category = '';

  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi < 25) {
    category = 'Normal weight';
  } else if (bmi < 30) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }

  document.getElementById('result').innerHTML = `
    <p>Your BMI is ${bmi.toFixed(2)}</p>
    <p>You are classified as: <strong>${category}</strong></p>
    <p>BMI Categories:</p>
    <ul>
      <li>Underweight: Less than 18.5</li>
      <li>Normal weight: 18.5 – 24.9</li>
      <li>Overweight: 25 – 29.9</li>
      <li>Obese: 30 or greater</li>
    </ul>
  `;
});