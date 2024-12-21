// bodyFatCalculator.js

document.getElementById('body-fat-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Retrieve form values
  const weight = parseFloat(document.getElementById('weight').value);
  const waist = parseFloat(document.getElementById('waist').value);
  const neck = parseFloat(document.getElementById('neck').value);
  const hipInput = document.getElementById('hip');
  const hip = hipInput ? parseFloat(hipInput.value) : 0;
  const gender = document.getElementById('gender').value;
  const unit = document.getElementById('unit').value;
  const method = document.getElementById('method').value;
  const resultDiv = document.getElementById('body-fat-result');
  const chartCanvas = document.getElementById('bodyFatChart');

  // Unit Conversion
  let weightKg = weight;
  let waistCm = waist;
  let neckCm = neck;
  let hipCm = hip;

  if (unit === 'imperial') {
      // Convert pounds to kilograms and inches to centimeters
      weightKg = weight * 0.453592;
      waistCm = waist * 2.54;
      neckCm = neck * 2.54;
      if (gender === 'female') {
          hipCm = hip * 2.54;
      }
  }

  // Validate inputs
  if (isNaN(weightKg) || isNaN(waistCm) || isNaN(neckCm) || (gender === 'female' && isNaN(hipCm))) {
      resultDiv.innerHTML = '<p class="error">Please enter valid measurements.</p>';
      return;
  }

  let bodyFatPercentage;

  // Calculation Methods
  switch (method) {
      case 'navy':
          if (gender === 'male') {
              bodyFatPercentage = 86.010 * Math.log10(waistCm - neckCm) - 70.041 * Math.log10(weightKg) + 36.76;
          } else if (gender === 'female') {
              bodyFatPercentage = 163.205 * Math.log10(waistCm + hipCm - neckCm) - 97.684 * Math.log10(weightKg) - 78.387;
          }
          break;
      case 'mike':
          // Example: Implement another method if desired
          bodyFatPercentage = calculateMikeMethod(weightKg, waistCm, neckCm, hipCm, gender);
          break;
      case 'skinfold':
          // Skinfold method requires additional inputs (e.g., caliper measurements)
          bodyFatPercentage = calculateSkinfoldMethod();
          break;
      default:
          resultDiv.innerHTML = '<p class="error">Please select a valid calculation method.</p>';
          return;
  }

  // Ensure body fat percentage is within realistic bounds
  if (bodyFatPercentage < 0 || bodyFatPercentage > 100 || isNaN(bodyFatPercentage)) {
      resultDiv.innerHTML = '<p class="error">Calculated body fat percentage is out of realistic range. Please check your inputs.</p>';
      return;
  }

  // Display the result
  resultDiv.innerHTML = `
      <p>Your Body Fat Percentage: <strong>${bodyFatPercentage.toFixed(2)}%</strong></p>
      ${getBodyFatRangeDescription(bodyFatPercentage, gender)}
  `;

  // Render chart
  renderBodyFatChart(bodyFatPercentage, gender);
});

// Example function for another calculation method (Mike Method)
function calculateMikeMethod(weightKg, waistCm, neckCm, hipCm, gender) {
  // Placeholder for actual Mike Method calculation
  // Replace with actual formula if available
  if (gender === 'male') {
      return 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(weightKg)) - 450;
  } else {
      return 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(weightKg)) - 450;
  }
}

// Function to get body fat range description
function getBodyFatRangeDescription(bf, gender) {
  let range = '';
  if (gender === 'male') {
      if (bf < 6) {
          range = 'Essential fat';
      } else if (bf < 14) {
          range = 'Athletes';
      } else if (bf < 18) {
          range = 'Fitness';
      } else if (bf < 25) {
          range = 'Average';
      } else {
          range = 'Obese';
      }
  } else {
      if (bf < 14) {
          range = 'Essential fat';
      } else if (bf < 21) {
          range = 'Athletes';
      } else if (bf < 25) {
          range = 'Fitness';
      } else if (bf < 32) {
          range = 'Average';
      } else {
          range = 'Obese';
      }
  }

  return `<p>Your body fat falls into the <strong>${range}</strong> category.</p>`;
}

// Function to render body fat chart
function renderBodyFatChart(bf, gender) {
  const ctx = document.getElementById('bodyFatChart').getContext('2d');
  if (window.bodyFatChartInstance) {
      window.bodyFatChartInstance.destroy();
  }

  const labels = ['Your Body Fat'];
  const data = [bf];
  const backgroundColors = ['rgba(75, 192, 192, 0.6)'];

  window.bodyFatChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: labels,
          datasets: [{
              data: data,
              backgroundColor: backgroundColors,
              hoverOffset: 4
          }]
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  display: false
              },
              tooltip: {
                  callbacks: {
                      label: function(context) {
                          return `${context.label}: ${context.parsed}%`;
                      }
                  }
              }
          }
      }
  });

  document.getElementById('bodyFatChart').style.display = 'block';
}

// Placeholder for Skinfold Method Calculation (Requires additional inputs)
function calculateSkinfoldMethod() {
  // Implement skinfold method calculation if needed
  // This might require more form inputs for multiple skinfold sites
  return 0; // Placeholder
}