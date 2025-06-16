import axios from 'axios';

const API_BASE_URL = 'https://blogsy-pearl.vercel.app' || 'http://localhost:3000';

export const userService = {
    // SIGN UP
    signUp: async (userData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error("Signup failed:", error.response?.data || error.message);
            throw error;
        }
    },

    //LOGIN
    login: async (userData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/login`, userData);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            throw error;
        }
    },


    //GET PROFILE
    getProfile: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/users/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Failed to get profile:", error.response?.data || error.message);
            throw error;
        }


    }
}
