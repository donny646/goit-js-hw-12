import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadmoreBtn = document.querySelector('.btn-load-more');

form.addEventListener('submit', handleSubmit);
loadmoreBtn.addEventListener('click', handleLoadMore);

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

async function handleSubmit(event) {
  event.preventDefault();

  showLoader();

  const searchText = event.currentTarget.elements['search-text'].value.trim();

  currentQuery = searchText;
  currentPage = 1;

  if (searchText === '') {
    iziToast.info({
      title: 'Caution',
      message: 'You forgot important data',
      position: 'topLeft',
    });
    hideLoader();
    return;
  }

  try {
    const data = await getImagesByQuery(currentQuery);

    totalHits = data.totalHits;

    clearGallery();

    createGallery(data.hits);

    const totalLoaded = currentPage * data.hits.length;
    if (totalLoaded < totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: 'Caution',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topLeft',
      });
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `${error.message}`,
    });
    hideLoadMoreButton();
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  currentPage++;

  showLoader();

  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);

    const totalLoaded = currentPage * data.hits.length;
    if (totalLoaded < totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: 'Caution',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topLeft',
      });
    }

    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: `${error.message}`,
    });
    hideLoadMoreButton();
  } finally {
    hideLoader();
  }
}
