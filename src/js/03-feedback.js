import throttle from "lodash.throttle";
const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

function saveFormData() {
  const formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };

  localStorage.setItem(localStorageKey, JSON.stringify(formData));
}

function loadFormData() {
  const savedFormData = JSON.parse(localStorage.getItem(localStorageKey));

  if (savedFormData) {
    form.elements.email.value = savedFormData.email;
    form.elements.message.value = savedFormData.message;
  }
}

function clearFormData() {
  localStorage.removeItem(localStorageKey);
  form.elements.email.value = '';
  form.elements.message.value = '';
}

function handleSubmit(event) {
  event.preventDefault();

  const formData = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };

  console.log(formData);

  clearFormData();
}


const updateFormDataThrottled = throttle(saveFormData, 500);

window.addEventListener('load', loadFormData);
form.addEventListener('submit', handleSubmit);
form.addEventListener('input', updateFormDataThrottled);

