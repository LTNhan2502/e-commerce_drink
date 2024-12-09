import axiosClient from './axiosClient';

const getTopping = async () => {
   const res = await axiosClient.get('/topping');
   return res.data;
};

const getOneTopping = async (id) => {
   const res = await axiosClient.get(`/topping/${id}`);
   return res.data;
};

export { getTopping, getOneTopping }; 
