import axios from 'axios';

export let isProd = true;

export const baseURl = "http://localhost:3000";
const prodBaseURL = "https://iraqlandbackend-production.up.railway.app";

export const apiBaseURL = isProd ? prodBaseURL : baseURl;

export const postWithToken = async (url, formData, token) => {
    try {
        const response = await axios.post(
            url,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getWithToken = async (url, token) => {
    try {
        const response = await axios.get(
            url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteWithToken = async (url, token) => {
    try {
        const response = await axios.delete(
            url,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};