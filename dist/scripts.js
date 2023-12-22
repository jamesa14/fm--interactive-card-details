const cardNumber = document.querySelector('[data-type=card-number]');
const cardName = document.querySelector('[data-type=card-name]');
const cardExpiryMonth = document.querySelector('[data-type=card-expiry-month]');
const cardExpiryYear = document.querySelector('[data-type=card-expiry-year]');
const cardCvc = document.querySelector('[data-type=card-cvc]');
const form = document.querySelector('form');
const formInputs = document.querySelectorAll('.form-input');
const cardNumberInput = document.querySelector('#card-number');
const cardCvcInput = document.querySelector('#card-cvc');
const cardExpiryInput = document.querySelector('#card-expiry');

function replaceNonNumeric(value) {
  return value.replace(/[^0-9]/g, ''); // replaces any non-numeric characters
}

function formatCardNumber(value) {
  return value.replace(/(\d{4})(?=\d)/g, '$1 '); // i.e. 0000 0000 0000 0000
}

function validateFields(e) {
  const inputId = e.target.id;

  if (inputId === 'card-number') {
    let inputValue = e.target.value;
    let numericValue = replaceNonNumeric(inputValue);
    numericValue = formatCardNumber(numericValue);
    e.target.value = numericValue;
    return;
  }

  if (
    inputId === 'card-expiry-month' || 
    inputId === 'card-expiry-year' ||
    inputId === 'card-cvc') {
      let inputValue = e.target.value;
      let numericValue = replaceNonNumeric(inputValue);
      e.target.value = numericValue;
      return;
  }

  return;
}

formInputs.forEach(input => addEventListener('input', validateFields));

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

function resetCard() {
  cardNumber.textContent = '0000 0000 0000 0000';
  cardName.textContent = 'John Smith';
  cardExpiryMonth.textContent = '00';
  cardExpiryYear.textContent = '00';
  cardCvc.textContent = '000';
};

// success message
function successMessage() {
  const markup = `
    <div id="form-success" class="min-w-96 w-full flex flex-col items-center">
      <img src="/dist/images/icon-complete.svg" alt="Tick icon" class="mb-5">
      <h2 class="uppercase tracking-widest text-3xl mb-4">Thank You!</h2>
      <p class="mb-5">We've added your card details</p>
      <button class="js--dismiss-success-message mt-5 bg-black hover:bg-[#333] text-white py-4 px-2 w-full rounded-lg">Continue</button>
    </div>
  `;
  return markup;
}

function closeSuccess() {
  form.classList.remove('hidden');
  document.querySelector('#form-success').remove(); // remove the success element from the DOM
  form.reset();
  resetCard();
}

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('js--dismiss-success-message')) {
    closeSuccess();
  }
});