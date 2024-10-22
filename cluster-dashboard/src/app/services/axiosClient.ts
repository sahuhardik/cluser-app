import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: process.env.API_TIMEOUT ? parseInt(process.env.API_TIMEOUT, 10) : 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Note: We can implement a global error handler here if we want to display a common error toast or similar notifications.
// Note: We can also implement a schema validator to ensure the response format is validated.
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
