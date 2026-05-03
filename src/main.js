import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  hideLoadMoreButton,
  hideLoader,
  showLoadMoreButton,
  showLoader,
} from './js/render-functions';

const formEl = document.querySelector('.form');
const loadMoreBtnEl = document.querySelector('.load-more-btn');
const PER_PAGE = 15;

let currentQuery = '';
let currentPage = 1;
let totalPages = 0;

formEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

function showEndOfResultsMessage() {
  iziToast.info({
    title: 'Info',
    message: "We're sorry, but you've reached the end of search results.",
    position: 'topRight',
  });
}

function showRequestError(error) {
  const message =
    error?.response?.data?.error ||
    error?.message ||
    'Something went wrong. Please try again later.';

  iziToast.error({
    title: 'Error',
    message,
    position: 'topRight',
  });
}

async function onSearchFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;

  const query = form.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    totalPages = Math.ceil(data.totalHits / PER_PAGE);
    createGallery(data.hits);

    if (currentPage < totalPages) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      showEndOfResultsMessage();
    }
  } catch (error) {
    showRequestError(error);
  } finally {
    hideLoader();
    form.reset();
  }
}

async function onLoadMoreBtnClick() {
  currentPage += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    if (currentPage >= totalPages || data.hits.length === 0) {
      hideLoadMoreButton();
      showEndOfResultsMessage();
    } else {
      showLoadMoreButton();
    }

    const firstCard = document.querySelector('.gallery-item');
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    showRequestError(error);
    showLoadMoreButton();
  } finally {
    hideLoader();
  }
}
