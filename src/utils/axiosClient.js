import axios from 'axios';

const axiosClient = axios.create({
   baseURL: 'https://order-drink.vercel.app',
   timeout: 10000,
   headers: {
      'Content-Type': 'application/json'
   }
});

export default axiosClient;
