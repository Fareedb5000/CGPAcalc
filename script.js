document.addEventListener('DOMContentLoaded', function() {
    const semesterForm = document.getElementById('semesterForm');
    const cgpaForm = document.getElementById('cgpaForm');
    const gpaInputsContainer = document.getElementById('gpaInputs');
    const cgpaResult = document.getElementById('cgpaResult');
    const honorsMessage = document.getElementById('honorsMessage');
    const resultContainer = document.querySelector('.result');
  
    semesterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const numSemesters = parseInt(document.getElementById('numSemesters').value);
      const semestersLeft = parseInt(document.getElementById('semestersLeft').value);
  
      // Clear any existing inputs
      gpaInputsContainer.innerHTML = '';
  
      for (let i = 1; i <= numSemesters; i++) {
        const inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group');
  
        const label = document.createElement('label');
        label.setAttribute('for', `gpa${i}`);
        label.textContent = `GPA for Semester ${i}:`;
  
        const input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('id', `gpa${i}`);
        input.setAttribute('name', `gpa${i}`);
        input.setAttribute('step', '0.01');
        input.setAttribute('min', '0');
        input.setAttribute('max', '5');
        input.required = true;
  
        inputGroup.appendChild(label);
        inputGroup.appendChild(input);
        gpaInputsContainer.appendChild(inputGroup);
      }
  
      cgpaForm.style.display = 'block';
    });
  
    cgpaForm.addEventListener('submit', function(e) {
      e.preventDefault();
  
      const gpas = Array.from(gpaInputsContainer.querySelectorAll('input')).map(input => parseFloat(input.value));
      const totalGPA = gpas.reduce((sum, gpa) => sum + gpa, 0);
      const cgpa = (totalGPA / gpas.length).toFixed(2);
      cgpaResult.textContent = cgpa;
  
      const semestersLeft = parseInt(document.getElementById('semestersLeft').value);
      const totalSemesters = gpas.length + semestersLeft;
      const targetCGPA = [4.5, 3.5, 2.5, 1.5]; // Targets for different honors
      const honors = ["First Class Honours", "Second Class Upper", "Second Class Lower", "Third Class Honours"];
      let message = "";
  
      targetCGPA.forEach((target, index) => {
        const requiredGPA = ((target * totalSemesters) - (cgpa * gpas.length)) / semestersLeft;
        if (requiredGPA > 5 || requiredGPA < 0) {
          message += `<p>At your current CGPA, it is mathematically impossible to achieve ${honors[index]}.</p>`;
        } else {
          message += `<p>To achieve ${honors[index]}, you need an average GPA of ${requiredGPA.toFixed(2)} in the remaining semesters.</p>`;
        }
      });
  
      honorsMessage.innerHTML = message;
      resultContainer.style.display = 'block';
    });
  });
  