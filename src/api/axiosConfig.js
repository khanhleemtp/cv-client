// First we need to import axios.js
import axios from 'axios';
// Next we make an 'axiosInstance' of it
const axiosInstance = axios.create({
  // .. where we make our configurations
  baseURL: process.env.REACT_APP_URL,
});

// Where you would set stuff like your 'Authorization' header, etc ...
// axiosInstance.defaults.headers.common['Authorization'] = 'Bearer';

// Also add/ configure interceptors && all the other cool stuff

axiosInstance.interceptors.request.use(
  (request) => {
    // console.log(request);
    // Edit request config

    if (!request.headers.Authorization) {
      const token = localStorage.getItem('ldtoken');
      console.log(token);
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
    }

    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log(response);
    // Edit response config
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    return Promise.reject(error.response.data);
  }
);

export default axiosInstance;
