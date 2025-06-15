import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import FloatingAddButton from '../components/FloatingAddButton';
import PostModal from '../components/PostModal';
import { blogService } from '../api/blogService';
import { useNavigate, useLocation } from 'react-router';

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    const isModalOpen = location.pathname === "/feed/new";
    const isAuthenticated = !!localStorage.getItem("token");

    const closeModal = () => navigate("/feed");

    const handlePostCreated = (newPostResponse) => {
        const newPost = newPostResponse.post;
        setPosts(prev => [newPost, ...prev]);
        closeModal();
    };
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await blogService.getAllPosts();
                const latest = [...data]
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                setPosts(latest);
                setLoading(false);
            } catch (error) {
                setError(`Failed to fetch posts ${error}`);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-white p-8 flex items-center justify-center">
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white p-8 flex items-center justify-center">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <>
            <main className="pt-20">
                <h1 className='text-center text-4xl font-semibold my-8 text-gray-900'>
                    Browse All Blogs!
                </h1>
                <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
                    {posts.map((post) => (
                        <BlogCard
                            key={post._id}
                            image={post.image}
                            title={post.title}
                            content={post.content}
                            author={post.author}
                            category={post.category}
                            id={post._id}
                            onDelete={() => {
                                setPosts(posts.filter(p => p._id !== post._id));
                            }}
                            onUpdate={(updatedPost) => {
                                setPosts(prevPosts =>
                                    prevPosts.map(p => p._id === updatedPost._id ? {
                                        ...p,
                                        ...updatedPost,
                                        author: updatedPost.author || p.author 
                                    } : p)
                                );
                            }}
                        />
                    ))}
                </div>
            </main>

            {isAuthenticated && (
                <>
                    <FloatingAddButton onClick={() => navigate("/feed/new")} />
                    <PostModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        onPostCreated={handlePostCreated}
                    />
                </>
            )}
        </>
    );
}
