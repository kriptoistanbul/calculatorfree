document.getElementById('bmr-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const gender = document.getElementById('gender').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const height = parseFloat(document.getElementById('height').value);
  const age = parseInt(document.getElementById('age').value);

  if (!['male', 'female'].includes(gender) || weight <= 0 || height <= 0 || age <= 0) {
    document.getElementById('bmr-result').textContent = 'Please enter valid inputs.';
    return;
  }

  let bmr;
  if (gender === 'male') {
    bmr = Math.round(10 * weight + 6.25 * height - 5 * age + 5);
  } else {
    bmr = Math.round(10 * weight + 6.25 * height - 5 * age - 161);
  }

  document.getElementById('bmr-result').textContent = `Your BMR is ${bmr} ${__('calories/day')}.`;
});