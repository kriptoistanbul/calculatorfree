document.getElementById('daily-horoscope-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const zodiacSign = document.getElementById('zodiacSign').value;
  
    if (!zodiacSign) {
      document.getElementById('daily-horoscope-result').textContent = 'Please select a zodiac sign.';
      return;
    }
  
    // Placeholder for actual horoscope fetching
    // Integration with a horoscope API is recommended for dynamic content
  
    const horoscopes = {
      aries: __('Today is a great day to take initiative and lead projects.'),
      taurus: __('Focus on your financial goals and stability today.'),
      gemini: __('Communication is key. Reach out to friends and family.'),
      cancer: __('Take time to nurture yourself and your loved ones.'),
      leo: __('Your creativity will shine. Embrace new opportunities.'),
      virgo: __('Organize your tasks to maximize productivity.'),
      libra: __('Seek balance in your relationships and work life.'),
      scorpio: __('Your determination will help you overcome challenges.'),
      sagittarius: __('Adventure awaits. Be open to new experiences.'),
      capricorn: __('Hard work will pay off. Stay disciplined.'),
      aquarius: __('Innovative ideas will lead to success today.'),
      pisces: __('Trust your intuition and follow your heart.')
    };
  
    const horoscope = horoscopes[zodiacSign] || __('No horoscope available for this sign.');
  
    document.getElementById('daily-horoscope-result').textContent = horoscope;
  });