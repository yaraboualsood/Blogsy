import axios from 'axios';

const API_BASE_URL = 'https://blogsy-pearl.vercel.app' || 'http://localhost:3000';

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
            const response = await axios.get(`${API_BASE_URL}/posts`);
            return response.data.posts;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    },

    // GET ONE POST BY ID
    getPostById: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching post ${id}:`, error);
            throw error;
        }
    },

    // CREATE POST (!!Authenticated)
    createPost: async (formData, token) => {
        const res = await axios.post("http://localhost:3000/posts", formData, {
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
                `${API_BASE_URL}/posts/${id}`,
                postData,
                {
                    ...getAuthHeader(),
                    headers: {
                        ...getAuthHeader().headers,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            return response.data.updated; // Just return the updated post directly
        } catch (error) {
            console.error(`Error updating post ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },


    // DELETE POST (!!Authenticated)
    deletePost: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/posts/${id}`, getAuthHeader());
            return response.data;
        } catch (error) {
            console.error(`Error deleting post ${id}:`, error.response?.data || error.message);
            throw error;
        }
    },

    // GET COMMENTS OF POST
    getComments: async (postId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching comments for post ${postId}:`, error);
            throw error;
        }
    },

    // ADD COMMENT TO POST (!!Authenticated)
    addComment: async (postId, commentData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/posts/${postId}/comments`, commentData, getAuthHeader());
            return response.data;
        } catch (error) {
            console.error(`Error adding comment to post ${postId}:`, error.response?.data || error.message);
            throw error;
        }
    },

    // DELETE MY COMMENT (!!Authenticated)
    deleteComment: async (postId, commentId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/posts/${postId}/comments/${commentId}`, getAuthHeader());
            return response.data;
        } catch (error) {
            console.error(`Error deleting comment ${commentId}:`, error.response?.data || error.message);
            throw error;
        }
    },

    // UPDATE MY COMMENT (!!Authenticated)
    updateComment: async (postId, commentId, commentData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/posts/${postId}/comments/${commentId}`, commentData, getAuthHeader());
            return response.data;
        } catch (error) {
            console.error(`Error updating comment ${commentId}:`, error.response?.data || error.message);
            throw error;
        }
    }
}; 