// calorieDeficitCalculator.js

document.getElementById('calorie-deficit-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Retrieve form values
  const unit = document.getElementById('unit').value;
  const gender = document.getElementById('gender').value;
  const age = parseInt(document.getElementById('age').value);
  const height = parseFloat(document.getElementById('height').value);
  const activityLevel = document.getElementById('activityLevel').value;
  const currentWeight = parseFloat(document.getElementById('currentWeight').value);
  const currentCalories = parseFloat(document.getElementById('currentCalories').value);
  const goalCalories = parseFloat(document.getElementById('goalCalories').value);
  const weightToLose = parseFloat(document.getElementById('weightToLose').value);
  const weeks = parseInt(document.getElementById('weeks').value);
  const resultDiv = document.getElementById('calorie-deficit-result');
  const chartCanvas = document.getElementById('calorieDeficitChart');

  // Unit Conversion
  let weightKg = currentWeight;
  let heightCm = height;

  if (unit === 'imperial') {
      // Convert pounds to kilograms and inches to centimeters
      weightKg = currentWeight * 0.453592;
      heightCm = height * 2.54;
  }

  // Validate inputs
  if (
      isNaN(currentCalories) || currentCalories <= 0 ||
      isNaN(goalCalories) || goalCalories <= 0 ||
      isNaN(weightToLose) || weightToLose <= 0 ||
      isNaN(weeks) || weeks <= 0 ||
      isNaN(age) || age <= 0 ||
      isNaN(heightCm) || heightCm <= 0 ||
      isNaN(weightKg) || weightKg <= 0 ||
      !gender ||
      !activityLevel
  ) {
      resultDiv.innerHTML = '<p class="error">Please enter valid positive numbers for all fields.</p>';
      chartCanvas.style.display = 'none';
      return;
  }

  if (goalCalories >= currentCalories) {
      resultDiv.innerHTML = '<p class="error">Goal calories must be less than current calories.</p>';
      chartCanvas.style.display = 'none';
      return;
  }

  // BMR Calculation using Mifflin-St Jeor Equation
  let bmr;
  if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else if (gender === 'female') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  // TDEE Calculation based on Activity Level
  const activityMultipliers = {
      'sedentary': 1.2,
      'light': 1.375,
      'moderate': 1.55,
      'active': 1.725,
      'veryActive': 1.9
  };
  const tdee = bmr * activityMultipliers[activityLevel];

  // Calorie Deficit Calculations
  const caloriesPerKg = 7700; // Approximate calories per kg of fat
  const totalDeficit = weightToLose * caloriesPerKg;
  const dailyDeficit = totalDeficit / (weeks * 7);
  const adjustedTDEE = tdee - dailyDeficit;

  // Ensure adjusted TDEE is not below BMR
  if (adjustedTDEE < bmr) {
      resultDiv.innerHTML = '<p class="error">The calculated goal calories are too low and below your Basal Metabolic Rate (BMR). Please adjust your goals.</p>';
      chartCanvas.style.display = 'none';
      return;
  }

  // Macronutrient Suggestions (Assuming 40% Carbs, 30% Protein, 30% Fats)
  const carbs = Math.round((adjustedTDEE * 0.4) / 4); // grams
  const protein = Math.round((adjustedTDEE * 0.3) / 4); // grams
  const fats = Math.round((adjustedTDEE * 0.3) / 9); // grams

  // Display the result
  resultDiv.innerHTML = `
      <h3>Calorie Deficit Results</h3>
      <p><strong>Basal Metabolic Rate (BMR):</strong> ${Math.round(bmr)} calories/day</p>
      <p><strong>Total Daily Energy Expenditure (TDEE):</strong> ${Math.round(tdee)} calories/day</p>
      <p><strong>Daily Calorie Deficit Needed:</strong> ${Math.round(dailyDeficit)} calories/day</p>
      <p><strong>Adjusted TDEE (Goal Caloric Intake):</strong> ${Math.round(adjustedTDEE)} calories/day</p>
      <p><strong>Total Calorie Deficit:</strong> ${Math.round(totalDeficit)} calories</p>
      <p><strong>Estimated Weight Loss:</strong> ${weightToLose.toFixed(2)} kg</p>
      <h4>Recommended Daily Macronutrients:</h4>
      <ul>
          <li>Carbohydrates: ${carbs} grams/day</li>
          <li>Protein: ${protein} grams/day</li>
          <li>Fats: ${fats} grams/day</li>
      </ul>
  `;

  // Render chart
  renderCalorieDeficitChart(currentCalories, adjustedTDEE);
});

// Function to render calorie deficit chart using Chart.js
function renderCalorieDeficitChart(currentCalories, adjustedTDEE) {
  const ctx = document.getElementById('calorieDeficitChart').getContext('2d');
  if (window.calorieDeficitChartInstance) {
      window.calorieDeficitChartInstance.destroy();
  }

  const data = {
      labels: ['Current Intake', 'Goal Intake'],
      datasets: [{
          label: 'Calories',
          data: [currentCalories, adjustedTDEE],
          backgroundColor: [
              'rgba(54, 162, 235, 0.6)', // Current Intake - Blue
              'rgba(255, 99, 132, 0.6)'  // Goal Intake - Red
          ],
          borderColor: [
              'rgba(54, 162, 235, 1)', // Current Intake - Blue
              'rgba(255, 99, 132, 1)'  // Goal Intake - Red
          ],
          borderWidth: 1
      }]
  };

  window.calorieDeficitChartInstance = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  title: {
                      display: true,
                      text: 'Calories per Day'
                  }
              },
              x: {
                  title: {
                      display: true,
                      text: 'Caloric Intake'
                  }
              }
          },
          plugins: {
              legend: {
                  display: false
              },
              tooltip: {
                  callbacks: {
                      label: function(context) {
                          return `${context.label}: ${context.parsed.y} calories`;
                      }
                  }
              }
          }
      }
  });

  document.getElementById('calorieDeficitChart').style.display = 'block';
}