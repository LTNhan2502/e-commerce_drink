import axiosClient from "./axiosClient";

const addOrder = async (data) => {
    const res = await axiosClient.post('/order', data)
    return res.data
}

export { addOrder };