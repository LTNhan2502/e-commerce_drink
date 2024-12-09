import axiosClient from './axiosClient';

const getCategory = async () => {
   const res = await axiosClient.get('/category');
   return res.data;
};

const getOneCategory = async (id) => {
   const res = await axiosClient.get(`/category/${id}`);
   return res.data;
};

export { getCategory, getOneCategory }; 
