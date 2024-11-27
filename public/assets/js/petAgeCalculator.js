document.getElementById('pet-age-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const petType = document.getElementById('pet-type').value;
    const petAge = parseFloat(document.getElementById('pet-age').value);
  
    let humanAge;
  
    if (petType === 'dog') {
      // Simple formula for dog years
      if (petAge <= 2) {
        humanAge = petAge * 12.5;
      } else {
        humanAge = 25 + (petAge - 2) * 4;
      }
    } else if (petType === 'cat') {
      // Simple formula for cat years
      if (petAge <= 2) {
        humanAge = petAge * 12.5;
      } else {
        humanAge = 25 + (petAge - 2) * 4;
      }
    }
  
    document.getElementById('result').textContent = `Your ${petType} is approximately ${humanAge.toFixed(1)} human years old.`;
  });