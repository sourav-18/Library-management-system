
  const loadingComponent = document.getElementById('loadingOverlay');
  loadingComponent.style.display = 'none';
const form = document.getElementById('bookForm');
// Function to handle field validation on input change
const handleInputChange = function(event) {
  const input = event.target;
  const errorMessage = input.nextElementSibling;

  if (!input.value.trim()) {
    errorMessage.style.display = 'block';
  } else {
    errorMessage.style.display = 'none';
  }
};


// Attach event listeners to input fields for input change
const inputs = form.querySelectorAll('input[required]');
inputs.forEach(input => {
        input.addEventListener('input', handleInputChange);
});

// Add form submit event listener for final validation
form.addEventListener('submit', function(event) {
  const inputs = form.querySelectorAll('input[required]');
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('invalid');
      input.nextElementSibling.style.display = 'block';
      event.preventDefault();
    } else {
      input.classList.remove('invalid');
      input.nextElementSibling.style.display = 'none';
    }
  });
  loadingComponent.style.display = 'flex';
});
