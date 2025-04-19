import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMore = document.querySelector('.btn-load-more');

var lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}">
    <img
      class="gallery-image"
      src="${webformatURL}"
      alt="${tags}"
    />
   </a>
    <ul class="info">
      <li class="info-item">
        <h3 class="info-title">Likes</h3>
        <p class="info-text">${likes}</p>
      </li>
      <li class="info-item"><h3 class="info-title">Views</h3> <p class="info-text">${views}</p></li>
      <li class="info-item"><h3 class="info-title">Comments</h3> <p class="info-text">${comments}</p></li>
      <li class="info-item"><h3 class="info-title">Downloads</h3> <p class="info-text">${downloads}</p></li>
    </ul>
    </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hiden');
}

export function hideLoader() {
  loader.classList.add('hiden');
}

export function showLoadMoreButton() {
  loadMore.classList.remove('hiden');
}

export function hideLoadMoreButton() {
  loadMore.classList.add('hiden');
}
