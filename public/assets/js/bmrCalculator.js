// bmrCalculator.js

document.getElementById('bmr-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Retrieve form values
  const gender = document.getElementById('gender').value;
  let weight = parseFloat(document.getElementById('weight').value);
  let height = parseFloat(document.getElementById('height').value);
  const age = parseInt(document.getElementById('age').value);
  const unit = document.getElementById('unit').value;
  const activityLevel = document.getElementById('activity-level').value;
  const includeBodyFat = document.getElementById('include-bodyfat').checked;

  // Unit Conversion
  if (unit === 'imperial') {
      // Convert pounds to kilograms
      weight = weight * 0.453592;
      // Convert inches to centimeters
      height = height * 2.54;
  }

  // Validate inputs
  if (!['male', 'female'].includes(gender) || weight <= 0 || height <= 0 || age <= 0) {
      document.getElementById('bmr-result').innerHTML = '<span class="error">Please enter valid inputs.</span>';
      return;
  }

  // BMR Calculation using Mifflin-St Jeor Equation
  let bmr;
  if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Adjust BMR based on Activity Level
  let tdee;
  switch (activityLevel) {
      case 'sedentary':
          tdee = bmr * 1.2;
          break;
      case 'light':
          tdee = bmr * 1.375;
          break;
      case 'moderate':
          tdee = bmr * 1.55;
          break;
      case 'active':
          tdee = bmr * 1.725;
          break;
      case 'very_active':
          tdee = bmr * 1.9;
          break;
      default:
          tdee = bmr;
  }

  // Body Fat Percentage Adjustment (Optional)
  let bodyFatResult = '';
  if (includeBodyFat) {
      const bodyFat = parseFloat(prompt('Enter your body fat percentage (%):'));
      if (!isNaN(bodyFat) && bodyFat > 0 && bodyFat < 100) {
          // Adjust BMR based on body fat
          // This is a simplified adjustment: lean mass = weight * (1 - bodyFat%)
          const leanMass = weight * (1 - bodyFat / 100);
          // Recalculate BMR using lean mass if desired, or adjust accordingly
          // For simplicity, we'll append the body fat info
          bodyFatResult = `<p>Your Body Fat Percentage is <strong>${bodyFat}%</strong>.</p>`;
      } else {
          bodyFatResult = '<span class="error">Invalid body fat percentage entered.</span>';
      }
  }

  // Display the result
  let resultHTML = `
      <p>Your Basal Metabolic Rate (BMR) is <strong>${bmr.toFixed(2)}</strong> calories/day.</p>
      <p>Your Total Daily Energy Expenditure (TDEE) is <strong>${tdee.toFixed(2)}</strong> calories/day based on your activity level.</p>
      ${bodyFatResult}
  `;

  // Display the result
  document.getElementById('bmr-result').innerHTML = resultHTML;

  // Render chart
  renderBMRChart(bmr, tdee, activityLevel);
});

// Function to render BMR and TDEE Chart
function renderBMRChart(bmr, tdee, activityLevel) {
  const ctx = document.getElementById('bmrChart').getContext('2d');
  if (window.bmrChartInstance) {
      window.bmrChartInstance.destroy();
  }

  // Define data based on BMR and TDEE
  const labels = ['BMR', 'TDEE'];
  const data = [bmr, tdee];
  const backgroundColors = [
      'rgba(54, 162, 235, 0.6)', // BMR - Blue
      'rgba(255, 206, 86, 0.6)'  // TDEE - Yellow
  ];
  const borderColors = [
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)'
  ];

  window.bmrChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Calories',
              data: data,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: { 
                  beginAtZero: true,
                  suggestedMax: Math.max(bmr, tdee) + 500,
                  ticks: {
                      color: '#333' // Ensures y-axis labels are readable
                  }
              },
              x: {
                  ticks: {
                      color: '#333' // Ensures x-axis labels are readable
                  }
              }
          },
          plugins: {
              legend: {
                  labels: {
                      color: '#333' // Ensures legend text is readable
                  }
              }
          }
      }
  });

  document.getElementById('bmrChart').style.display = 'block';
}