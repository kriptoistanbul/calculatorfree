// public/assets/js/moonSignCalculator.js

const moonSigns = [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
    'Aquarius',
    'Pisces'
  ];
  
  document.getElementById('moon-sign-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const birthDateInput = document.getElementById('birthDate').value;
    const birthTimeInput = document.getElementById('birthTime').value;
    const resultDiv = document.getElementById('moon-sign-result');
  
    if (!birthDateInput || !birthTimeInput) {
      resultDiv.innerHTML = '<p class="error">Please enter both birth date and time.</p>';
      return;
    }
  
    const birthDate = new Date(`${birthDateInput}T${birthTimeInput}:00`);
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth(); // 0-11
    const day = birthDate.getDate();
  
    // Placeholder logic: Assign Moon sign based on birth month
    // For accurate Moon sign determination, integrate an astrology library or API
    const moonSign = moonSigns[month % 12];
  
    resultDiv.innerHTML = `
      <p>${__('Your Moon Sign')}: ${moonSign}</p>
    `;
  });