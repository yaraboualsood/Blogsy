import React from 'react'
import Navbar from './components/Navbar'
// import Header from './components/Header';
// import LatestBlogs from './components/LatestBlogs';
import BlogDetails from './pages/BlogDetails';
import { Route, Routes } from 'react-router';
import Feed from './pages/Feed';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './pages/ErrorPage';


export default function App() {
  return (
    <>
      <Navbar />
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        {/* AUTHENTICATED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/feed/new" element={<Feed showModal />} />
          <Route path="/new" element={<Home showModal />} />
          <Route path="/blog/:id/edit" element={<BlogDetails editMode />} />
          {/* <Route path="/profile" element={<Profile />} /> */}

        </Route>
        <Route path="*" element={<ErrorPage />} />

      </Routes>
      <Footer />

      <ToastContainer />

    </>
  );
}

