import throttle from 'lodash.throttle';

const KEY_STORAGE = 'feedback-form-state';

// об'єкт, в якому будемо зберігати значення, введені в поля
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('input'),
  messageInput: document.querySelector('textarea'),
};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

//при завантаженні сторінки викликаємо функцію для заповнення полів
populateInputs();

// функція, яка записує в локальне сховище введені в поля дані
function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;

  localStorage.setItem(KEY_STORAGE, JSON.stringify(formData));
}

//функція, яка запускається при відправленні форми
function onFormSubmit(evt) {
  evt.preventDefault();

  console.log(formData);
  evt.currentTarget.reset();
  localStorage.removeItem(KEY_STORAGE);
}

//функція, яка перевіряє стан локального сховища та записує в поля значення з нього
function populateInputs() {
  const savedValues = JSON.parse(localStorage.getItem(KEY_STORAGE));

  if (savedValues) {
    refs.emailInput.value = savedValues.email;
    refs.messageInput.value = savedValues.message;
  }
}
