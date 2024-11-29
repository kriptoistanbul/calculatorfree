document.getElementById('calorie-deficit-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const currentCalories = parseFloat(document.getElementById('currentCalories').value);
    const goalCalories = parseFloat(document.getElementById('goalCalories').value);
    const weightToLose = parseFloat(document.getElementById('weightToLose').value);
    const weeks = parseInt(document.getElementById('weeks').value);
  
    if (currentCalories <= 0 || goalCalories <= 0 || weightToLose <= 0 || weeks <= 0) {
      document.getElementById('calorie-deficit-result').textContent = 'Please enter valid positive numbers.';
      return;
    }
  
    if (goalCalories >= currentCalories) {
      document.getElementById('calorie-deficit-result').textContent = 'Goal calories must be less than current calories.';
      return;
    }
  
    const caloriesPerKg = 7700; // Approximate calories per kg of fat
    const totalDeficit = weightToLose * caloriesPerKg;
    const dailyDeficit = totalDeficit / (weeks * 7);
  
    document.getElementById('calorie-deficit-result').textContent = `Daily Calorie Deficit Needed: ${Math.round(dailyDeficit)} calories. Total Calorie Deficit: ${Math.round(totalDeficit)} calories. Total Weight Loss: ${weightToLose.toFixed(2)} kg.`;
  });