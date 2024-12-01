// public/assets/js/gradeGpaCalculator.js

function addCourse() {
    const coursesContainer = document.getElementById('courses-container');
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course';
    courseDiv.innerHTML = `
      <label><%= __('Course Name:') %></label>
      <input type="text" name="courseName" required>
  
      <label><%= __('Grade (A-F):') %></label>
      <select name="grade" required>
        <option value="4.0">A</option>
        <option value="3.0">B</option>
        <option value="2.0">C</option>
        <option value="1.0">D</option>
        <option value="0.0">F</option>
      </select>
  
      <label><%= __('Credit Hours:') %></label>
      <input type="number" name="creditHours" min="1" required>
    `;
    coursesContainer.appendChild(courseDiv);
  }
  
  document.getElementById('grade-gpa-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const courses = document.querySelectorAll('#courses-container .course');
    let totalPoints = 0;
    let totalCredits = 0;
    const resultDiv = document.getElementById('grade-gpa-result');
  
    courses.forEach(course => {
      const grade = parseFloat(course.querySelector('select[name="grade"]').value);
      const creditHours = parseFloat(course.querySelector('input[name="creditHours"]').value);
  
      if (isNaN(grade) || isNaN(creditHours)) {
        resultDiv.innerHTML = '<p class="error">Please enter valid grades and credit hours.</p>';
        return;
      }
  
      totalPoints += grade * creditHours;
      totalCredits += creditHours;
    });
  
    if (totalCredits === 0) {
      resultDiv.innerHTML = '<p class="error">Total credit hours cannot be zero.</p>';
      return;
    }
  
    const gpa = totalPoints / totalCredits;
  
    resultDiv.innerHTML = `
      <p>${__('Total Credits')}: ${totalCredits}</p>
      <p>${__('Total Grade Points')}: ${totalPoints.toFixed(2)}</p>
      <p>${__('GPA')}: ${gpa.toFixed(2)}</p>
    `;
  });