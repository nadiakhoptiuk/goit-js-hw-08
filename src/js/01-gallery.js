// Add imports above this line
import { galleryItems } from './gallery-items';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// оголошуємо змінні
const refs = {
  gallery: document.querySelector('.gallery'),
};

// створюємо розмітку галереї
const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);

// додаємо ДОМ-елементи з розмітки в дерево
refs.gallery.insertAdjacentHTML('beforeend', galleryItemsMarkup);

// створюємо екземпляр класу галереї
let galleryLightbox = new SimpleLightbox('.gallery a', {
  captionSelector: '.gallery__image',
  captionsData: 'alt',
  scrollZoom: true,
  maxZoom: 2,
  doubleTapZoom: 1.5,
  animationSpeed: 150,
  captionDelay: 250,
});

// функція, яка створює розмітку галереї у вигляді шаблонного рядка
function createGalleryItemsMarkup(array) {
  return array
    .map(
      ({ preview, original, description }) => /*html*/ `
    <a class="gallery__item" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
`
    )
    .join('');
}
