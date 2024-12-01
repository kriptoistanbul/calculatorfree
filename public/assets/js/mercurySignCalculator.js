// public/assets/js/mercurySignCalculator.js

// Simplified Mercury sign determination based on birth year
// For accurate astrological calculations, consider using an astrology library.

const mercurySigns = [
    'Aquarius',
    'Pisces',
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn'
  ];
  
  document.getElementById('mercury-sign-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const birthDateInput = document.getElementById('birthDate').value;
    const birthTimeInput = document.getElementById('birthTime').value;
    const resultDiv = document.getElementById('mercury-sign-result');
  
    if (!birthDateInput || !birthTimeInput) {
      resultDiv.innerHTML = '<p class="error">Please enter both birth date and time.</p>';
      return;
    }
  
    const birthDate = new Date(`${birthDateInput}T${birthTimeInput}:00`);
    const year = birthDate.getFullYear();
    const month = birthDate.getMonth(); // 0-11
    const day = birthDate.getDate();
  
    // Placeholder logic: Assign Mercury sign based on birth month
    const mercurySign = mercurySigns[month % 12];
  
    resultDiv.innerHTML = `
      <p>${__('Your Mercury Sign')}: ${mercurySign}</p>
    `;
  });