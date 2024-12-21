// ageCalculator.js

// Planetary Orbital Periods relative to Earth years
const planetOrbitalPeriods = {
  Mercury: 0.2408467,
  Venus: 0.61519726,
  Earth: 1,
  Mars: 1.8808158,
  Jupiter: 11.862615,
  Saturn: 29.447498,
  Uranus: 84.016846,
  Neptune: 164.79132,
  Pluto: 248.00 // Including Pluto for interest
};

// Zodiac Signs Data
const zodiacSigns = [
  { name: 'Capricorn', start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
  { name: 'Aquarius', start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
  { name: 'Pisces', start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
  { name: 'Aries', start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
  { name: 'Taurus', start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
  { name: 'Gemini', start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
  { name: 'Cancer', start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
  { name: 'Leo', start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
  { name: 'Virgo', start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
  { name: 'Libra', start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
  { name: 'Scorpio', start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
  { name: 'Sagittarius', start: { month: 11, day: 22 }, end: { month: 12, day: 21 } }
];

// Function to calculate age
function calculateAge(birthdate, specificDate = new Date()) {
  let ageYears = specificDate.getFullYear() - birthdate.getFullYear();
  let ageMonths = specificDate.getMonth() - birthdate.getMonth();
  let ageDays = specificDate.getDate() - birthdate.getDate();
  let ageHours = specificDate.getHours() - birthdate.getHours();
  let ageMinutes = specificDate.getMinutes() - birthdate.getMinutes();
  let ageSeconds = specificDate.getSeconds() - birthdate.getSeconds();

  if (ageSeconds < 0) {
      ageMinutes--;
      ageSeconds += 60;
  }

  if (ageMinutes < 0) {
      ageHours--;
      ageMinutes += 60;
  }

  if (ageHours < 0) {
      ageDays--;
      ageHours += 24;
  }

  if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(specificDate.getFullYear(), specificDate.getMonth(), 0).getDate();
  }

  if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
  }

  // Calculate age with decimals
  const totalMonths = ageYears * 12 + ageMonths + ageDays / 30.44;
  const ageDecimal = (totalMonths / 12).toFixed(2);

  return {
      years: ageYears,
      months: ageMonths,
      days: ageDays,
      hours: ageHours,
      minutes: ageMinutes,
      seconds: ageSeconds,
      decimal: ageDecimal
  };
}

// Function to calculate age difference
function calculateAgeDifference(birthdate1, birthdate2) {
  const diffMilliseconds = Math.abs(birthdate1 - birthdate2);
  const diffDate = new Date(diffMilliseconds);

  const ageDifferenceYears = diffDate.getUTCFullYear() - 1970;
  const ageDifferenceMonths = diffDate.getUTCMonth();
  const ageDifferenceDays = diffDate.getUTCDate() - 1;

  return {
      years: ageDifferenceYears,
      months: ageDifferenceMonths,
      days: ageDifferenceDays
  };
}

// Function to calculate age on a specific planet
function calculatePlanetaryAge(ageDecimal, planet) {
  const orbitalPeriod = planetOrbitalPeriods[planet];
  const planetaryAge = (ageDecimal / orbitalPeriod).toFixed(2);
  return planetaryAge;
}

// Function to estimate biological age
function estimateBiologicalAge(challenges) {
  let biologicalAge = challenges.years;
  if (!challenges.exercise) biologicalAge += 1;
  if (!challenges.smoke) biologicalAge += 1;
  if (!challenges.diet) biologicalAge += 1;
  // Additional factors can be added here
  return biologicalAge;
}

// Function to calculate age in weeks
function calculateAgeInWeeks(birthdate, specificDate = new Date()) {
  const diffTime = Math.abs(specificDate - birthdate);
  const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
  return diffWeeks;
}

// Function to calculate gestational age
function calculateGestationalAge(lmpDate, specificDate = new Date()) {
  const diffTime = specificDate - lmpDate;
  const gestationalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const gestationalWeeks = Math.floor(gestationalDays / 7);
  const remainingDays = gestationalDays % 7;
  return {
      weeks: gestationalWeeks,
      days: remainingDays
  };
}

// Function to calculate lunar age
function calculateLunarAge(birthdate, specificDate = new Date()) {
  // Lunar year is approximately 354 days
  const diffTime = specificDate - birthdate;
  const lunarAge = (diffTime / (1000 * 60 * 60 * 24 * 354)).toFixed(2);
  return lunarAge;
}

// Function to find zodiac sign
function findZodiacSign(birthdate) {
  const month = birthdate.getMonth() + 1; // Months are zero-based
  const day = birthdate.getDate();

  for (const sign of zodiacSigns) {
      if (
          (month === sign.start.month && day >= sign.start.day) ||
          (month === sign.end.month && day <= sign.end.day)
      ) {
          return sign.name;
      }
  }
  return 'Unknown';
}

// Function to render chart
function renderChart(labels, data, chartType = 'bar', chartLabel = 'Age Breakdown') {
  const ctx = document.getElementById('ageChart').getContext('2d');
  if (window.ageChartInstance) {
      window.ageChartInstance.destroy();
  }
  window.ageChartInstance = new Chart(ctx, {
      type: chartType,
      data: {
          labels: labels,
          datasets: [{
              label: chartLabel,
              data: data,
              backgroundColor: [
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)'
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: { beginAtZero: true }
          }
      }
  });
  document.getElementById('ageChart').style.display = 'block';
}

// Function to switch tabs
function switchTab(tabId) {
  // Remove active class from all buttons and contents
  document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  // Add active class to selected tab and content
  document.querySelector(`.tab-button[data-tab="${tabId}"]`).classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// Event Listeners for Tab Buttons
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');
      switchTab(tabId);
  });
});

// Event Listener for Basic Age Calculation
document.getElementById('age-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const birthdateInput = document.getElementById('birthdate').value;
  if (!birthdateInput) {
      document.getElementById('basic-age-result').innerHTML = '<span class="error">Please enter a valid birthdate.</span>';
      return;
  }

  const birthdate = new Date(birthdateInput);
  const now = new Date();

  if (isNaN(birthdate)) {
      document.getElementById('basic-age-result').innerHTML = '<span class="error">Invalid date format.</span>';
      return;
  }

  if (birthdate > now) {
      document.getElementById('basic-age-result').innerHTML = '<span class="error">Birthdate cannot be in the future.</span>';
      document.getElementById('ageChart').style.display = 'none';
      return;
  }

  const age = calculateAge(birthdate, now);

  // Display the result
  document.getElementById('basic-age-result').innerHTML = `
      <strong>Basic Age Calculation:</strong><br>
      You are ${age.years} years, ${age.months} months, ${age.days} days, 
      ${age.hours} hours, ${age.minutes} minutes, and ${age.seconds} seconds old.<br>
      Your age in decimal: ${age.decimal} years.
  `;

  // Render chart
  const labels = ['Years', 'Months', 'Days', 'Hours', 'Minutes', 'Seconds'];
  const data = [age.years, age.months, age.days, age.hours, age.minutes, age.seconds];
  renderChart(labels, data, 'bar', 'Basic Age Breakdown');
});

// Event Listener for Specific Date Age Calculation
document.getElementById('specific-date-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const birthdateInput = document.getElementById('birthdate').value;
  const specificDateInput = document.getElementById('specific-date-input').value;

  if (!birthdateInput) {
      document.getElementById('specific-date-result').innerHTML = '<span class="error">Please enter your birthdate.</span>';
      return;
  }

  const birthdate = new Date(birthdateInput);
  const specificDate = specificDateInput ? new Date(specificDateInput) : new Date();

  if (isNaN(birthdate) || (specificDateInput && isNaN(specificDate))) {
      document.getElementById('specific-date-result').innerHTML = '<span class="error">Invalid date format.</span>';
      return;
  }

  if (birthdate > specificDate) {
      document.getElementById('specific-date-result').innerHTML = '<span class="error">Birthdate cannot be after the specific date.</span>';
      document.getElementById('ageChart').style.display = 'none';
      return;
  }

  const age = calculateAge(birthdate, specificDate);

  // Display the result
  document.getElementById('specific-date-result').innerHTML = `
      <strong>Age on ${specificDate.toDateString()}:</strong><br>
      You were ${age.years} years, ${age.months} months, and ${age.days} days old.
  `;

  // Render chart
  const labels = ['Years', 'Months', 'Days'];
  const data = [age.years, age.months, age.days];
  renderChart(labels, data, 'bar', 'Age on Specific Date');
});

// Event Listener for Age Difference Calculation
document.getElementById('age-difference-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const birthdate1Input = document.getElementById('birthdate1').value;
  const birthdate2Input = document.getElementById('birthdate2').value;

  if (!birthdate1Input || !birthdate2Input) {
      document.getElementById('age-difference-result').innerHTML = '<span class="error">Please enter both birthdates.</span>';
      return;
  }

  const birthdate1 = new Date(birthdate1Input);
  const birthdate2 = new Date(birthdate2Input);

  if (isNaN(birthdate1) || isNaN(birthdate2)) {
      document.getElementById('age-difference-result').innerHTML = '<span class="error">Invalid date format.</span>';
      return;
  }

  const ageDifference = calculateAgeDifference(birthdate1, birthdate2);

  // Display the result
  document.getElementById('age-difference-result').innerHTML = `
      <strong>Age Difference:</strong><br>
      The age difference is ${ageDifference.years} years, ${ageDifference.months} months, and ${ageDifference.days} days.
  `;

  // Render chart
  const labels = ['Years', 'Months', 'Days'];
  const data = [ageDifference.years, ageDifference.months, ageDifference.days];
  renderChart(labels, data, 'bar', 'Age Difference Breakdown');
});

// Event Listener for Planetary Age Calculation
document.getElementById('planet-age-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const birthdateInput = document.getElementById('birthdate').value;
  const planet = document.getElementById('planet-select').value;

  if (!birthdateInput) {
      document.getElementById('planet-age-result').innerHTML = '<span class="error">Please enter your birthdate.</span>';
      return;
  }

  const birthdate = new Date(birthdateInput);
  const now = new Date();

  if (isNaN(birthdate)) {
      document.getElementById('planet-age-result').innerHTML = '<span class="error">Invalid date format.</span>';
      return;
  }

  if (birthdate > now) {
      document.getElementById('planet-age-result').innerHTML = '<span class="error">Birthdate cannot be in the future.</span>';
      document.getElementById('ageChart').style.display = 'none';
      return;
  }

  const age = calculateAge(birthdate, now);
  const planetaryAge = calculatePlanetaryAge(age.decimal, planet);

  // Display the result
  document.getElementById('planet-age-result').innerHTML = `
      <strong>Your Age on ${planet}:</strong><br>
      You are ${planetaryAge} years old on ${planet}.
  `;

  // Render chart
  const labels = [`${planet} Age`];
  const data = [planetaryAge];
  renderChart(labels, data, 'bar', `Age on ${planet}`);
});

// Event Listener for Biological Age Estimation
document.getElementById('biological-age-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const birthdateInput = document.getElementById('birthdate').value;
  if (!birthdateInput) {
      document.getElementById('biological-age-result').innerHTML = '<span class="error">Please enter your birthdate first.</span>';
      return;
  }

  const birthdate = new Date(birthdateInput);
  const now = new Date();

  if (isNaN(birthdate)) {
      document.getElementById('biological-age-result').innerHTML = '<span class="error">Invalid date format.</span>';
      return;
  }

  if (birthdate > now) {
      document.getElementById('biological-age-result').innerHTML = '<span class="error">Birthdate cannot be in the future.</span>';
      document.getElementById('ageChart').style.display = 'none';
      return;
  }

  const age = calculateAge(birthdate, now);

  // Get lifestyle factors
  const exercise = document.getElementById('exercise').checked;
  const smoke = document.getElementById('smoke').checked;
  const diet = document.getElementById('diet').checked;

  const biologicalAge = estimateBiologicalAge({ years: age.years, exercise, smoke, diet });

  // Display the result
  document.getElementById('biological-age-result').innerHTML = `
      <strong>Biological Age Estimation:</strong><br>
      Your estimated biological age is ${biologicalAge} years.
  `;

  // Render chart
  const labels = ['Chronological Age', 'Biological Age'];
  const data = [age.years, biologicalAge];
  renderChart(labels, data, 'bar', 'Age Comparison');
});

// Event Listener for Age in Weeks Calculation
document.getElementById('age-weeks-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const birthdateInput = document.getElementById('birthdate-weeks').value;
  if (!birthdateInput) {
      document.getElementById('age-weeks-result').innerHTML = '<span class="error">Please enter your birthdate.</span>';
      return;
  }

  const birthdate = new Date(birthdateInput);
  const now = new Date();

  if (isNaN(birthdate)) {
      document.getElementById('age-weeks-result').innerHTML = '<span class="error">Invalid date format.</span>';
      return;
  }

  if (birthdate > now) {
      document.getElementById('age-weeks-result').innerHTML = '<span class="error">Birthdate cannot be in the future.</span>';
      document.getElementById('ageChart').style.display = 'none';
      return;
  }

  const weeks = calculateAgeInWeeks(birthdate, now);

  // Display the result
  document.getElementById('age-weeks-result').innerHTML = `
      <strong>Your Age in Weeks:</strong><br>
      You are ${weeks} weeks old.
  `;

  // Render chart
  const labels = ['Weeks'];
  const data = [weeks];
  renderChart(labels, data, 'bar', 'Age in Weeks');
});

// Event Listener for Gestational Age Calculation
document.getElementById('gestational-age-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const lmpInput = document.getElementById('last-menstrual-period').value;
  if (!lmpInput) {
      document.getElementById('gestational-age-result').innerHTML = '<span class="error">Please enter the Last Menstrual Period (LMP) date.</span>';
      return;
  }

  const lmpDate = new Date(lmpInput);
  const now = new Date();

  if (isNaN(lmpDate)) {
      document.getElementById('gestational-age-result').innerHTML = '<span class="error">Invalid date format.</span>';
      return;
  }

  if (lmpDate > now) {
      document.getElementById('gestational-age-result').innerHTML = '<span class="error">LMP date cannot be in the future.</span>';
      document.getElementById('ageChart').style.display = 'none';
      return;
  }

  const gestationalAge = calculateGestationalAge(lmpDate, now);

  // Display the result
  document.getElementById('gestational-age-result').innerHTML = `
      <strong>Gestational Age:</strong><br>
      You are ${gestationalAge.weeks} weeks and ${gestationalAge.days} days pregnant.
  `;

  // Render chart
  const labels = ['Weeks', 'Days'];
  const data = [gestationalAge.weeks, gestationalAge.days];
  renderChart(labels, data, 'bar', 'Gestational Age');
});

// Event Listener for Lunar Age Calculation
document.getElementById('lunar-age-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const birthdateInput = document.getElementById('birthdate-lunar').value;
  if (!birthdateInput) {
      document.getElementById('lunar-age-result').innerHTML = '<span class="error">Please enter your birthdate.</span>';
      return;
  }

  const birthdate = new Date(birthdateInput);
  const now = new Date();

  if (isNaN(birthdate)) {
      document.getElementById('lunar-age-result').innerHTML = '<span class="error">Invalid date format.</span>';
      return;
  }

  if (birthdate > now) {
      document.getElementById('lunar-age-result').innerHTML = '<span class="error">Birthdate cannot be in the future.</span>';
      document.getElementById('ageChart').style.display = 'none';
      return;
  }

  const lunarAge = calculateLunarAge(birthdate, now);

  // Display the result
  document.getElementById('lunar-age-result').innerHTML = `
      <strong>Your Lunar Age:</strong><br>
      You are ${lunarAge} lunar years old.
  `;

  // Render chart
  const labels = ['Lunar Years'];
  const data = [lunarAge];
  renderChart(labels, data, 'bar', 'Lunar Age');
});

// Event Listener for Zodiac Sign Display
document.getElementById('zodiac-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const birthdateInput = document.getElementById('zodiac-birthdate').value;
  if (!birthdateInput) {
      document.getElementById('zodiac-result').innerHTML = '<span class="error">Please enter your birthdate.</span>';
      return;
  }

  const birthdate = new Date(birthdateInput);

  if (isNaN(birthdate)) {
      document.getElementById('zodiac-result').innerHTML = '<span class="error">Invalid date format.</span>';
      return;
  }

  const zodiac = findZodiacSign(birthdate);

  // Display the result
  document.getElementById('zodiac-result').innerHTML = `
      <strong>Your Zodiac Sign:</strong><br>
      You are a <span class="zodiac-sign">${zodiac}</span>.
  `;
});

// Initial Tab Setup
document.addEventListener('DOMContentLoaded', () => {
  switchTab('basic-age'); // Set default active tab
});