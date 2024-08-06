import axios from "axios";

export const imagePath = "https://image.tmdb.org/t/p/w500";
export const imagePathOriginal = "https://image.tmdb.org/t/p/original";

const baseUrl = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_API_KEY;

// TRENDING route
export const fetchTrending = async (timeWindow = "day") => {
  const { data } = await axios.get(
    `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
  );

  return data?.results;
};

// Movies & Series - Details

export const fetchDetails = async (type, id) => {
  const res = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`);
  return res?.data;
};

// Movies & Series - Credits

export const fetchCredits = async (type, id) => {
  const res = await axios.get(
    `${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`
  );
  return res?.data;
};

// Movies & Series - Videos

export const fetchVideos = async (type, id) => {
  const res = await axios.get(
    `${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`
  );

  return res?.data;
};

// Discover

export const fetchMovies = async (page, sortBy) => {
  const res = await axios.get(
    `${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&include_adult=true&sort_by=${sortBy}`
  );
  return res?.data;
};

export const fetchTvSeries = async (page, sortBy) => {
  const res = await axios.get(
    `${baseUrl}/discover/tv?include_adult=true&api_key=${apiKey}&page=${page}&sort_by=${sortBy}`
  );
  return res?.data;
};

// Search

export const searchData = async (query, page) => {
  const res = await axios.get(
    `${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`
  );
  return res?.data;
};

// Recommended Movies

export const fetchRecommendations = async (type, id) => {
  const res = await axios.get(
    `${baseUrl}/${type}/${id}/recommendations?api_key=${apiKey}`
  );

  return res?.data;
};

// Currently in theatres
export const fetchCurrentlyInTheatres = async () => {
  const res = await axios.get(`${baseUrl}/movie/now_playing?api_key=${apiKey}`);

  return await res?.data;
};
