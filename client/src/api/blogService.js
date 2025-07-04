import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
console.log('Environment:', import.meta.env.MODE); // 'development' or 'production'
console.log('API URL from env:', import.meta.env.VITE_API_URL);
console.log('Final API URL being used:', API_BASE_URL);

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const blogService = {
    // GET ALL POSTS
    getAllPosts: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/posts`);
            return response.data.posts;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    },

    // GET ONE POST BY ID
    getPostById: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/posts/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching post ${id}:`, error);
            throw error;
        }
    },

    // CREATE POST (!!Authenticated)
    createPost: async (formData, token) => {
        const res = await axios.post(`${API_BASE_URL}/api/posts`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    },

    // UPDATE POST (!!Authenticated)
    updatePost: async (id, postData) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/api/posts/${id}`,
                postData,
                {
                    ...getAuthHeader(),
                    headers: {
                        ...getAuthHeader().headers,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            return response.data.updated;
        } catch (error) {
            console.error(`Error updating post ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    // DELETE POST (!!Authenticated)
    deletePost: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/api/posts/${id}`, getAuthHeader());
            return response.data;
        } catch (error) {
            console.error(`Error deleting post ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    // GET COMMENTS OF POST
    getComments: async (postId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/posts/${postId}/comments`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching comments for post ${postId}:`, error);
            throw error;
        }
    },

    // ADD COMMENT TO POST (!!Authenticated)
    addComment: async (postId, commentData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/posts/${postId}/comments`, commentData, getAuthHeader());
            return response.data;
        } catch (error) {
            console.error(`Error adding comment to post ${postId}:`, error.response?.data || error.message);
            throw error;
        }
    },

    // DELETE MY COMMENT (!!Authenticated)
    deleteComment: async (postId, commentId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/api/posts/${postId}/comments/${commentId}`, getAuthHeader());
            return response.data;
        } catch (error) {
            console.error(`Error deleting comment ${commentId}:`, error.response?.data || error.message);
            throw error;
        }
    },

    // UPDATE MY COMMENT (!!Authenticated)
    updateComment: async (postId, commentId, commentData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/api/posts/${postId}/comments/${commentId}`, commentData, getAuthHeader());
            return response.data;
        } catch (error) {
            console.error(`Error updating comment ${commentId}:`, error.response?.data || error.message);
            throw error;
        }
    }
}; 