import axios from "axios";

export const SEARCH_API_URL = `https://api.unsplash.com/search/photos?client_id=W5R_xL3DvFvEfEY2PmyR3uTzhaRMT3xZv_53VS9OF4I&page=1&per_page=30`;

export const searchImages = async (url) => {
  const response = await axios.get(SEARCH_API_URL);
  // console.log(response.data);
  return response.data;
};
