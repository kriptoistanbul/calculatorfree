document.getElementById('compatibility-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const sign1 = document.getElementById('sign1').value;
    const sign2 = document.getElementById('sign2').value;
  
    // Simple compatibility logic (for demonstration purposes)
    const compatiblePairs = {
      'Aries': ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
      'Taurus': ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
      'Gemini': ['Libra', 'Aquarius', 'Aries', 'Leo'],
      'Cancer': ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
      'Leo': ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
      'Virgo': ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
      'Libra': ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
      'Scorpio': ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
      'Sagittarius': ['Aries', 'Leo', 'Libra', 'Aquarius'],
      'Capricorn': ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
      'Aquarius': ['Gemini', 'Libra', 'Aries', 'Sagittarius'],
      'Pisces': ['Cancer', 'Scorpio', 'Taurus', 'Capricorn']
    };
  
    let compatibility = 'Low';
  
    if (compatiblePairs[sign1] && compatiblePairs[sign1].includes(sign2)) {
      compatibility = 'High';
    } else {
      compatibility = 'Low';
    }
  
    document.getElementById('result').textContent = `Compatibility between ${sign1} and ${sign2}: ${compatibility}`;
  });