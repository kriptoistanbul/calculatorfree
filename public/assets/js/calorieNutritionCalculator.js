// public/assets/js/calorieNutritionCalculator.js

document.getElementById('calorie-nutrition-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activityLevel = parseFloat(document.getElementById('activityLevel').value);
    const resultDiv = document.getElementById('calorie-nutrition-result');
  
    if (isNaN(age) || isNaN(weight) || isNaN(height)) {
      resultDiv.innerHTML = '<p class="error">Please enter valid numbers.</p>';
      return;
    }
  
    // Basal Metabolic Rate (BMR) Calculation using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      resultDiv.innerHTML = '<p class="error">Invalid gender selection.</p>';
      return;
    }
  
    // Total Daily Energy Expenditure (TDEE)
    const tdee = bmr * activityLevel;
  
    // Macronutrient Distribution (Example: 50% carbs, 20% protein, 30% fat)
    const carbs = (tdee * 0.5) / 4; // grams
    const protein = (tdee * 0.2) / 4; // grams
    const fat = (tdee * 0.3) / 9; // grams
  
    resultDiv.innerHTML = `
      <p>${__('Basal Metabolic Rate (BMR)')}: ${bmr.toFixed(2)} kcal/day</p>
      <p>${__('Total Daily Energy Expenditure (TDEE)')}: ${tdee.toFixed(2)} kcal/day</p>
      <h3>${__('Macronutrient Breakdown')}:</h3>
      <ul>
        <li>${__('Carbohydrates')}: ${carbs.toFixed(2)} g/day</li>
        <li>${__('Protein')}: ${protein.toFixed(2)} g/day</li>
        <li>${__('Fat')}: ${fat.toFixed(2)} g/day</li>
      </ul>
    `;
  });s