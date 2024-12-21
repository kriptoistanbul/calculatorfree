// bmiCalculator.js

document.getElementById('bmi-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Retrieve form values
  const unit = document.getElementById('unit').value;
  let weight = parseFloat(document.getElementById('weight').value);
  let height = parseFloat(document.getElementById('height').value);
  const age = parseInt(document.getElementById('age').value);
  const gender = document.getElementById('gender').value;
  const includeMuscle = document.getElementById('include-muscle').checked;
  const includeWaist = document.getElementById('include-waist').checked;

  // Unit Conversion
  if (unit === 'imperial') {
      // Convert pounds to kilograms
      weight = weight * 0.453592;
      // Convert inches to centimeters
      height = height * 2.54;
  }

  // Validate inputs
  if (height === 0) {
      document.getElementById('bmi-result').innerHTML = '<span class="error">Height cannot be zero.</span>';
      return;
  }

  if (weight <= 0 || height <= 0 || age <= 0) {
      document.getElementById('bmi-result').innerHTML = '<span class="error">Please enter valid positive numbers for weight, height, and age.</span>';
      return;
  }

  // BMI Calculation
  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);

  // BMI Categories (Standard)
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

  // Adjust categories for muscle mass if included (Approximation)
  if (includeMuscle) {
      if (category === 'Overweight') {
          category = 'Muscular';
      } else if (category === 'Normal weight') {
          category = 'Fit';
      }
  }

  // Waist Circumference for additional health assessment
  let waistCircumference = 0;
  let waistRisk = '';
  if (includeWaist) {
      // Prompt user for waist circumference
      waistCircumference = parseFloat(prompt('Enter your waist circumference in cm:'));
      if (isNaN(waistCircumference) || waistCircumference <= 0) {
          waistCircumference = 0;
          document.getElementById('bmi-result').innerHTML += '<br><span class="error">Invalid waist circumference entered.</span>';
      } else {
          // Determine risk based on waist circumference
          if (gender === 'male') {
              if (waistCircumference > 102) {
                  waistRisk = 'High risk of cardiovascular diseases.';
              } else if (waistCircumference > 94) {
                  waistRisk = 'Increased risk of cardiovascular diseases.';
              } else {
                  waistRisk = 'Low risk of cardiovascular diseases.';
              }
          } else if (gender === 'female') {
              if (waistCircumference > 88) {
                  waistRisk = 'High risk of cardiovascular diseases.';
              } else if (waistCircumference > 80) {
                  waistRisk = 'Increased risk of cardiovascular diseases.';
              } else {
                  waistRisk = 'Low risk of cardiovascular diseases.';
              }
          } else {
              waistRisk = 'Waist circumference risk assessment not available for your gender.';
          }
      }
  }

  // Resting Metabolic Rate (RMR) Calculation using Mifflin-St Jeor Equation
  let rmr = 0;
  if (gender === 'male') {
      rmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else if (gender === 'female') {
      rmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  } else {
      // For 'Other' gender, using an average value
      rmr = (10 * weight) + (6.25 * height) - (5 * age) + 0;
  }

  // BMI Percentile for Children and Teens (Simplified)
  let bmiPercentile = '';
  if (age < 18) {
      // Placeholder for actual percentile calculation
      if (bmi < 14) {
          bmiPercentile = '<5th percentile (Underweight)';
      } else if (bmi < 18) {
          bmiPercentile = '5th to <85th percentile (Healthy weight)';
      } else if (bmi < 25) {
          bmiPercentile = '85th to <95th percentile (Overweight)';
      } else {
          bmiPercentile = '≥95th percentile (Obese)';
      }
  }

  // Display the result
  let resultHTML = `
      <p>Your BMI is <strong>${bmi.toFixed(2)}</strong></p>
      <p>You are classified as: <strong>${category}</strong></p>
  `;

  if (age < 18) {
      resultHTML += `<p>Your BMI percentile: <strong>${bmiPercentile}</strong></p>`;
  }

  if (includeWaist && waistCircumference > 0) {
      resultHTML += `<p>Your waist circumference is <strong>${waistCircumference} cm</strong>. ${waistRisk}</p>`;
  }

  resultHTML += `<p>Your Resting Metabolic Rate (RMR) is approximately <strong>${rmr.toFixed(2)} kcal/day</strong>.</p>`;

  resultHTML += `
      <p>BMI Categories:</p>
      <ul>
          <li>Underweight: Less than 18.5</li>
          <li>Normal weight: 18.5 – 24.9</li>
          <li>Overweight: 25 – 29.9</li>
          <li>Obese: 30 or greater</li>
      </ul>
  `;

  // Display the result
  document.getElementById('bmi-result').innerHTML = resultHTML;

  // Render chart
  renderBMICategoryChart(bmi, includeMuscle, includeWaist, gender, age);
});

// Function to render BMI Category Chart
function renderBMICategoryChart(bmi, includeMuscle, includeWaist, gender, age) {
  const ctx = document.getElementById('bmiChart').getContext('2d');
  if (window.bmiChartInstance) {
      window.bmiChartInstance.destroy();
  }

  // Define data based on BMI
  const labels = ['Underweight', 'Normal weight', 'Overweight', 'Obese'];
  const data = [18.5, 24.9, 29.9, 40]; // Upper bounds for categories
  const colors = [
      'rgba(54, 162, 235, 0.6)', // Underweight - Blue
      'rgba(75, 192, 192, 0.6)', // Normal - Green
      'rgba(255, 206, 86, 0.6)', // Overweight - Yellow
      'rgba(255, 99, 132, 0.6)'  // Obese - Red
  ];

  window.bmiChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'BMI Categories',
              data: [bmi, 25, 30, 35],
              backgroundColor: colors,
              borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: { 
                  beginAtZero: true,
                  suggestedMax: 40,
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

  document.getElementById('bmiChart').style.display = 'block';
}