import axios from './axiosInstance';

export const fetchAPOD = () => axios.get('/apod');
export const searchMedia = (query) => axios.get(`/media/search?q=${encodeURIComponent(query)}`);
export const getSpaceWeather = () => axios.get('/donki/alerts');
export const getTechByCategory = (category = 'space') => axios.get(`/tech?category=${encodeURIComponent(category)}`);
export const getTechStats = () => axios.get('/tech/stats');
