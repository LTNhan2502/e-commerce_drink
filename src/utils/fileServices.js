import axiosClient from './axiosClient';

const uploadFile = async (file) => {
   const res = await axiosClient.post('/upload', file);
   return res.data;
};

const getFile = async (url) => {
   const res = await axiosClient.get(`/upload/${url}`);
   return res.data;
};

const getFiles = async () => {
   const res = await axiosClient.get('/upload');
   return res.data;
};

export { uploadFile, getFile, getFiles }; 
