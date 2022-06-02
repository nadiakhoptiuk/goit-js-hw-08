import throttle from 'lodash.throttle';

const KEY_STORAGE = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

// об'єкт, в якому будемо зберігати значення, введені в поля
const dataObjectFromStorage = localStorage.getItem(KEY_STORAGE);

let formData = dataObjectFromStorage ? JSON.parse(dataObjectFromStorage) : {};

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

//при завантаженні сторінки викликаємо функцію для заповнення полів
populateInputs();

// функція, яка записує в локальне сховище введені в поля дані
function onFormInput(evt) {
  const { name, value } = evt.target;
  formData[name] = value;

  try {
    localStorage.setItem(KEY_STORAGE, JSON.stringify(formData));
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

//функція, яка запускається при відправленні форми
function onFormSubmit(evt) {
  evt.preventDefault();

  console.log(formData);
  evt.currentTarget.reset();
  localStorage.removeItem(KEY_STORAGE);
  formData = {};
}

//функція, яка перевіряє стан локального сховища та записує в поля значення з нього
function populateInputs() {
  const dataArray = Object.entries(formData);

  if (dataArray.length === 0) {
    return;
  }

  dataArray.forEach(([name, value]) => {
    refs.form.elements[name].value = value;
  });
}
