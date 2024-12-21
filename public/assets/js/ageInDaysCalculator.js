document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('age-days-form').addEventListener('submit', function (e) {
      e.preventDefault();
    
      const birthdateInput = document.getElementById('birthdate').value;
      const birthdate = new Date(birthdateInput);
      const today = new Date();
    
      if (birthdate > today) {
          document.getElementById('age-days-result').textContent = 'Birthdate cannot be in the future.';
          return;
      }
    
      const diffTime = today - birthdate;
      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
      document.getElementById('age-days-result').textContent = `You are ${days} ${__('days old')}.`;
  });
});