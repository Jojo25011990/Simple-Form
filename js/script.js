'use strict';
gsap.registerPlugin(TextPlugin);

// *** Select Elements ***
const form = document.getElementById('form');
const textarea = document.getElementById('textarea');
const email = document.getElementById('email');
const fullname = document.getElementById('fullname');
const popup = document.getElementById('popup');
const popupBtn = document.getElementById('popup-btn');

const btnPrimary = document.getElementById('btn-primary');
const headingSecondary = document.getElementById('heading-secondary');
const envelope = document.getElementById('envelope');

const headingPrimarySpans = document.querySelectorAll('.heading__primary-span');

// *** Gsap Animation ***
gsap.from(headingPrimarySpans, {
  autoAlpha: 0,
  y: 300,
  duration: 0.75,
  stagger: 0.25,
  ease: 'back.out(1.7)',
});
// *** End of Gsap Animation ***

// *** FORM event listener ***
form.addEventListener('submit', e => {
  e.preventDefault();

  resetAllErrors([fullname, email, textarea]);

  const isInputsValid = checkRequiredValues([fullname, email, textarea]);
  const isInputValid = checkLength(fullname, 7, 15);
  const emailIsValid = validateEmail(email);

  if (emailIsValid && isInputValid && isInputsValid) {
    form.classList.add('hidden');
    popup.classList.remove('hidden');
  }
});
// *** End of FORM event listener ***

// *** Popup Button Event Listener***
popupBtn.addEventListener('click', () => {
  backToForm([fullname, email, textarea]);
});
// *** End of Popup Button Event Listener***

// *** Back to form ***
function backToForm(inputArr) {
  form.classList.remove('hidden');
  popup.classList.add('hidden');

  inputArr.forEach(input => {
    input.value = '';

    const inputEl = input.parentElement;
    inputEl.classList.remove('focus');
  });
}
// *** End of Back to form ***

// *** Add Focus Class For Animation ***
addfocusClass([fullname, email, textarea]);

function addfocusClass(inputArr) {
  inputArr.forEach(input => {
    input.addEventListener('focus', () => {
      const inputEl = input.parentElement;
      inputEl.classList.add('focus');
    });
  });
}
// *** End of Add Focus Class For Animation ***

// *** Button to switch to from envelope to form ***
btnPrimary.addEventListener('click', () => {
  envelope.classList.add('hidden');
  headingSecondary.classList.add('show');

  form.classList.remove('hidden');
});
// *** End of Button switch envelope for form ***

// *** Validate all inputs ***
function checkRequiredValues(inputArr) {
  let isInputValid = true;

  inputArr.forEach(input => {
    const inputEl = input.value.trim().toLowerCase();

    if (inputEl === '') {
      errorMessage(input, `${input.id} is required!`);
      isInputValid = false;
    } else {
      removeErrorMessage(input);
    }
  });

  return isInputValid;
}
// *** End of Validate all inputs ***

// *** Reset All Errors ***
function resetAllErrors(inputArr) {
  inputArr.forEach(input => removeErrorMessage(input));
}
// *** End of Reset All Errors ***

// *** Validate Email ***
function validateEmail(input) {
  const inputEl = input.value.trim().toLowerCase();

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;

  if (!emailRegex.test(inputEl)) {
    errorMessage(input, `${input.id} is not valid.`);
    return false;
  } else {
    removeErrorMessage(input);
    return true;
  }
}
// *** End of Validate Email ***

// *** Check length ***
function checkLength(input, min, max) {
  const inputEl = input.value.trim().toLowerCase();

  if (inputEl.length < min) {
    errorMessage(input, `${input.id} must be at least  ${min} characters.`);
    return false;
  } else if (inputEl.length > max) {
    errorMessage(input, `${input.id} must be less than ${max} characters.`);
    return false;
  } else {
    removeErrorMessage(input);
    return true;
  }
}
// *** End of Check length ***

// *** Add and Remove Error Messages/Borders ***
function errorMessage(input, message) {
  const controlFormInputs = input.parentElement;
  controlFormInputs.classList.add('error');

  const errorMessage = controlFormInputs.querySelector(
    '.control-form__message'
  );
  errorMessage.textContent = message;
}

function removeErrorMessage(input) {
  const controlFormInputs = input.parentElement;
  controlFormInputs.classList.remove('error');
}
// *** End of Add and Remove Error Messages/Borders ***
