import axiosClient from './axiosClient';

const getMenu = async (current, pageSize) => {
   const res = await axiosClient.get('/menu', { params: { current, pageSize } });
   return res.data;
};

const getOneMenu = async (id) => {
   const res = await axiosClient.get(`/menu/${id}`);
   return res.data;
};

export { getMenu, getOneMenu }; 
