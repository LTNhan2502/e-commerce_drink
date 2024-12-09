import axiosClient from './axiosClient';

const getEvaluate = async (current, pageSize) => {
   const res = await axiosClient.get('/evaluate', { params: { current, pageSize } });
   return res.data;
};

const postEvaluate = async (name, phone, content, star) => {
   const { name, phone, content, star } = data;
   const res = await axiosClient.post('/evaluate', data);
   return res.data;
};

const getOneEvaluate = async (id) => {
   const res = await axiosClient.get(`/evaluate/${id}`);
   return res.data;
};

export { getEvaluate, postEvaluate, getOneEvaluate }; 
