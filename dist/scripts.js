const cardNumber = document.querySelector('[data-type=card-number]');
const cardName = document.querySelector('[data-type=card-name]');
const cardExpiry = document.querySelector('[data-type=card-expiry]');
const cardCvc = document.querySelector('[data-type=card-cvc]');
const form = document.querySelector('form');
const formInputs = document.querySelectorAll('.form-input');

// listen down keydown on form inputs
// find matching field for current input keydown is occurring on
// match changing value of input to corresponding card div

function replaceNonNumeric(value) {
  return value.replace(/[^0-9]/g, '');
}

function formatCardNumber(value) {
  return value.replace(/(\d{4})(?=\d)/g, '$1 '); // i.e. 0000 0000 0000 0000
}

document.getElementById('card-cvc').addEventListener('input', function(event) {
  // Get the input value
  let inputValue = event.target.value;

  // Remove non-numeric characters using a regular expression
  let numericValue = replaceNonNumeric(inputValue);

  // Update the input value with the numeric characters only
  event.target.value = numericValue;
});

document.getElementById('card-number').addEventListener('input', function(event) {
  // Get the input value
  let inputValue = event.target.value;

  // Remove non-numeric characters using a regular expression
  let numericValue = replaceNonNumeric(inputValue);

  // Split the numeric value into groups of 4 with spaces
  numericValue = formatCardNumber(numericValue);

  // Update the input value with the formatted numeric characters
  event.target.value = numericValue;
});

document.getElementById('card-expiry-month').addEventListener('input', function(event) {
  // Get the input value
  let inputValue = event.target.value;

  // Remove non-numeric characters using a regular expression
  let numericValue = replaceNonNumeric(inputValue);

  // Update the input value with the numeric characters only
  event.target.value = numericValue;
});

document.getElementById('card-expiry-year').addEventListener('input', function(event) {
  // Get the input value
  let inputValue = event.target.value;

  // Remove non-numeric characters using a regular expression
  let numericValue = replaceNonNumeric(inputValue);

  // Update the input value with the numeric characters only
  event.target.value = numericValue;
});

function handleCardUpdate(e) {
  const matchingCardElement = document.querySelector(`[data-type=${e.target.id}]`);
  if (e.target.value != '') {
    matchingCardElement.textContent = e.target.value;
  }
}

formInputs.forEach(input => addEventListener('keyup', handleCardUpdate));



function handleFormSubmit(e) {
  e.preventDefault();
  
  let errorCount = 0;

  formInputs.forEach(input => {
    const errorMessage = input.nextElementSibling;
    errorMessage.textContent = ''; // reset to blank 

    // check if any form inputs are blank, if so display error message
    if (input.value === '') {
      errorMessage.textContent = "Can't be blank";
      errorCount++;
    }

    // validate expiry month
    if (input.id === 'card-expiry-month') {
      if (Number(input.value) > 12) {
        errorMessage.textContent = 'Enter a valid month';
        errorCount++;
      }
    }

    // validate card number length
    if (input.id === 'card-number') {
      const cardNumber = input.value.replace(/\s/g, "");
      if (cardNumber.length < 16) {
        errorMessage.textContent = 'Card number is too short';
        errorCount++;
      }
    }
  });

  if (errorCount > 0) {
    return;
  }

  form.classList.add('hidden');
  document.querySelector('.form-wrapper').insertAdjacentHTML('beforeend', successMessage());
}

form.addEventListener('submit', handleFormSubmit);

function successMessage() {
  const markup = `
    <h2>Thank You!</h2>
    <p>We've added your card details</p>
    <button class="js--dismiss-success-message mt-5 bg-black hover:bg-[#333] text-white py-4 px-2 w-full rounded-lg">Continue</button>
  `;
  return markup;
}