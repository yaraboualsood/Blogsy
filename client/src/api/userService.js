import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
console.log('Environment:', import.meta.env.MODE); // 'development' or 'production'
console.log('API URL from env:', import.meta.env.VITE_API_URL);
console.log('Final API URL being used:', API_BASE_URL);

export const userService = {
    // SIGN UP
    signUp: async (userData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/users/register`, userData);
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
            const response = await axios.post(`${API_BASE_URL}/api/users/login`, userData);
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
            const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
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
