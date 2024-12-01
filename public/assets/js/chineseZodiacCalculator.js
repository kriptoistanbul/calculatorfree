// public/assets/js/chineseZodiacCalculator.js

const chineseZodiac = [
    'Rat',
    'Ox',
    'Tiger',
    'Rabbit',
    'Dragon',
    'Snake',
    'Horse',
    'Goat',
    'Monkey',
    'Rooster',
    'Dog',
    'Pig'
  ];
  
  document.getElementById('chinese-zodiac-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const birthYear = parseInt(document.getElementById('birthYear').value);
    const resultDiv = document.getElementById('chinese-zodiac-result');
  
    if (isNaN(birthYear)) {
      resultDiv.innerHTML = '<p class="error">Please enter a valid birth year.</p>';
      return;
    }
  
    const index = (birthYear - 4) % 12;
    const zodiacSign = chineseZodiac[index >= 0 ? index : index + 12];
  
    resultDiv.innerHTML = `
      <p>${__('Your Chinese Zodiac Sign')}: ${zodiacSign}</p>
    `;
  });