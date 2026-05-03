import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.load-more-btn');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createGalleryMarkup(images) {
  return images
    .map(
      image => `
			<li class="gallery-item">
				<a class="gallery-link" href="${image.largeImageURL}">
					<img
						class="gallery-image"
						src="${image.webformatURL}"
						alt="${image.tags}"
						loading="lazy"
					/>
				</a>
				<div class="gallery-meta">
					<p><span>Likes</span>${image.likes}</p>
					<p><span>Views</span>${image.views}</p>
					<p><span>Comments</span>${image.comments}</p>
					<p><span>Downloads</span>${image.downloads}</p>
				</div>
			</li>`
    )
    .join('');
}

export function createGallery(images) {
  const markup = createGalleryMarkup(images);
  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('is-hidden');
}

export function hideLoader() {
  loaderEl.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtnEl.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtnEl.classList.add('is-hidden');
}
