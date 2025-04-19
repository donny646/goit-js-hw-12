import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '49758649-878ce1f589e8b6bdc26fd775c';

export async function getImagesByQuery(searchText, page = 1) {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: searchText,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 15,
      page,
    },
  });

  if (!response.data.hits.length) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
  }

  return response.data;
}
