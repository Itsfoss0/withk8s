import axios from 'axios';
const IMAGE_URL = 'https://picsum.photos/400';

const getImageFromUrl = async () => {
  const response = await axios.get(IMAGE_URL, {
    responseType: 'blob'
  });
  return response.data;
};

export default getImageFromUrl;
