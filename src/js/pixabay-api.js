import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '55683815-3d76e1aff0ba46e1ff3d0a45f';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: PER_PAGE,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return response.data;
}
