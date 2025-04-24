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
const params = {
  q: '',
  colors: '',
  category: '',
  per_page: 15,
  page: 1,
};
let perPage = 15;

async function handleSubmit(event) {
  event.preventDefault();

  showLoader();

  const searchText = event.currentTarget.elements['search-text'].value.trim();
  const currentColor = event.currentTarget.elements.select_colors.value;
  const currentCategoty = event.currentTarget.elements.select_category.value;
  perPage = event.currentTarget.elements.select_quantity.value;
  if (perPage === '') {
    perPage = 15;
  }

  currentQuery = searchText;
  currentPage = 1;

  params.q = currentQuery;
  params.colors = currentColor;
  params.page = currentPage;
  params.category = currentCategoty;
  params.per_page = perPage;

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
    const data = await getImagesByQuery(params);

    totalHits = data.totalHits;

    clearGallery();

    createGallery(data.hits);

    const totalLoaded = currentPage * perPage;

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
  params.page = currentPage;

  showLoader();

  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(params);

    createGallery(data.hits);

    const totalLoaded = currentPage * perPage;
    console.log(totalLoaded);

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

const toggleBtn = document.querySelector('#toggleFilters');
const filtersContainer = document.querySelector('.filters_container');

toggleBtn.addEventListener('click', () => {
  const isVisible = filtersContainer.style.display === 'block';
  filtersContainer.style.display = isVisible ? 'none' : 'block';
  toggleBtn.textContent = isVisible ? '🔽 Show Filters' : '🔼 Hide Filters';
});
