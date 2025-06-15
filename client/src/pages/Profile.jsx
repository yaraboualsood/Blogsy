// // import React, { useState } from "react";

// // export default function Profile() {
// //   const [activeTab, setActiveTab] = useState("blogs");

// //   return (
// //     <main className="min-h-screen bg-gray-100 px-4 py-32">

// //       {/* Main Content */}
// //       <section className="mx-auto max-w-7xl bg-white rounded-lg shadow p-6">


// //         {/* HEADER */}
// //         <div className="flex flex-col md:flex-row items-center md:items-start mb-6 gap-6">
// //           <img

// //             src="/avatar.png"
// //             alt="Profile Avatar"
// //             className="rounded-full w-24 h-24 md:mr-6"
// //           />
// //           <div className="text-center md:text-left">
// //   {/* TODO:DYNAMIC */}
// //             <h1 className="text-2xl font-bold mb-1" id="user-name">
// //               John Doe
// //             </h1>
// //             <p id="user-email" className="mb-1 text-gray-700 flex items-center justify-center md:justify-start gap-2">
// //               <i className="fa-solid fa-envelope"></i> john.doe@example.com
// //             </p>

// //           </div>
// //         </div>

// //         {/* TABS */}
// //         <div className="tabs tabs-boxed border-b border-gray-300 mb-4">
// //           <button
// //             className={`tab tab-lg font-medium ${activeTab === "blogs" ? "tab-active" : ""}`}
// //             onClick={() => setActiveTab("blogs")}
// //           >
// //             My blogs
// //           </button>
// //           <button
// //             className={`tab tab-lg font-medium ${activeTab === "settings" ? "tab-active" : ""}`}
// //             onClick={() => setActiveTab("settings")}
// //           >
// //             Settings
// //           </button>
// //         </div>

// //         {/* TAB CONTENT */}
// //         {activeTab === "blogs" && (
// //           <div id="blogs-tab-pane" className="mt-4">
// //             <div id="blogs-container" className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //               {/* blog history cards go here */}
// //               <div className="p-4 border rounded shadow-sm">
// //                 <h3 className="font-semibold mb-2">blog #12345</h3>
// //                 <p>Date: 2025-06-13</p>
// //                 <p>Status: Confirmed</p>
// //               </div>
// //               {/* Add more blog cards as needed */}
// //             </div>
// //           </div>
// //         )}

// //         {activeTab === "settings" && (
// //           <div id="settings-tab-pane" className="mt-4">
// //             <form className="max-w-xl space-y-6" onSubmit={(e) => e.preventDefault()}>
// //               <div>
// //                 <label htmlFor="firstName" className="block mb-1 font-semibold">
// //                   First Name
// //                 </label>
// //                 <input
// //                   id="firstName"
// //                   type="text"
// //                   className="input input-bordered w-full focus:outline-none"
// //                   defaultValue="First Name"
// //                 />
// //               </div>

// //               <div>
// //                 <label htmlFor="lastName" className="block mb-1 font-semibold">
// //                   Last Name
// //                 </label>
// //                 <input
// //                   id="lastName"
// //                   type="text"
// //                   className="input input-bordered w-full focus:outline-none"
// //                   defaultValue="Last Name"
// //                 />
// //               </div>

// //               <div>
// //                 <label htmlFor="email" className="block mb-1 font-semibold">
// //                   Email Address
// //                 </label>
// //                 <input
// //                   id="email"
// //                   type="email"
// //                   className="input input-bordered w-full focus:outline-none"
// //                   defaultValue="email@example.com"
// //                 />
// //               </div>


// //               <div>
// //                 <label htmlFor="password" className="block mb-1 font-semibold">
// //                   Password
// //                 </label>
// //                 <input
// //                   id="password"
// //                   type="password"
// //                   className="input input-bordered w-full focus:outline-none"
// //                   placeholder="Leave blank if you don't want to change it"
// //                 />
// //                 <p className="text-sm text-gray-500 mt-1">
// //                   Leave blank if you don't want to change it.
// //                 </p>
// //               </div>

// //               <button type="submit" className="btn btn-main rounded-2xl">
// //                 Save Changes
// //               </button>
// //             </form>
// //           </div>
// //         )}
// //       </section>
// //     </main>
// //   );
// // }

// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/authContext";
// import axios from "axios";
// import { Link } from "react-router";

// export default function Profile() {
//   const [activeTab, setActiveTab] = useState("blogs");
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();

//   useEffect(() => {
//     if (activeTab === "blogs" && user) {
//       const fetchUserBlogs = async () => {
//         try {
//           const response = await axios.get(`/api/blogs/user/${user._id}`);
//           setBlogs(response.data.blogs);
//         } catch (error) {
//           console.error("Failed to fetch blogs:", error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchUserBlogs();
//     }
//   }, [activeTab, user]);

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Please login to view your profile</h2>
//           <Link to="/login" className="btn btn-main">
//             Login
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gray-100 px-4 py-32">
//       {/* Main Content */}
//       <section className="mx-auto max-w-7xl bg-white rounded-lg shadow p-6">
//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row items-center md:items-start mb-6 gap-6">
//           <img
//             src={user.image || "/avatar.png"}
//             alt="Profile Avatar"
//             className="rounded-full w-24 h-24 md:mr-6 object-cover"
//           />
//           <div className="text-center md:text-left">
//             <h1 className="text-2xl font-bold mb-1">
//               {user.firstName} {user.lastName}
//             </h1>
//             <p className="mb-1 text-gray-700 flex items-center justify-center md:justify-start gap-2">
//               <i className="fa-solid fa-envelope"></i> {user.email}
//             </p>
//           </div>
//         </div>

//         {/* TABS */}
//         <div className="tabs tabs-boxed border-b border-gray-300 mb-4">
//           <button
//             className={`tab tab-lg font-medium ${activeTab === "blogs" ? "tab-active" : ""}`}
//             onClick={() => setActiveTab("blogs")}
//           >
//             My blogs
//           </button>
//           <button
//             className={`tab tab-lg font-medium ${activeTab === "settings" ? "tab-active" : ""}`}
//             onClick={() => setActiveTab("settings")}
//           >
//             Settings
//           </button>
//         </div>

//         {/* TAB CONTENT */}
//         {activeTab === "blogs" && (
//           <div id="blogs-tab-pane" className="mt-4">
//             {loading ? (
//               <div className="flex justify-center">
//                 <span className="loading loading-spinner loading-lg"></span>
//               </div>
//             ) : blogs.length > 0 ? (
//               <div id="blogs-container" className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {blogs.map((blog) => (
//                   <div key={blog._id} className="p-4 border rounded shadow-sm">
//                     <h3 className="font-semibold mb-2">{blog.title}</h3>
//                     <p>{blog.content.substring(0, 100)}...</p>
//                     <div className="flex justify-between mt-2">
//                       <span className="text-sm text-gray-500">
//                         {new Date(blog.createdAt).toLocaleDateString()}
//                       </span>
//                       <div className="space-x-2">
//                         <button className="text-blue-500 hover:text-blue-700 text-sm">
//                           Edit
//                         </button>
//                         <button className="text-red-500 hover:text-red-700 text-sm">
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <p className="text-gray-500">You haven't written any blogs yet.</p>
//                 <Link to="/create-blog" className="btn btn-main mt-4">
//                   Write Your First Blog
//                 </Link>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === "settings" && (
//           <div id="settings-tab-pane" className="mt-4">
//             <form className="max-w-xl space-y-6" onSubmit={(e) => e.preventDefault()}>
//               <div>
//                 <label htmlFor="firstName" className="block mb-1 font-semibold">
//                   First Name
//                 </label>
//                 <input
//                   id="firstName"
//                   type="text"
//                   className="input input-bordered w-full focus:outline-none"
//                   defaultValue={user.firstName}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="lastName" className="block mb-1 font-semibold">
//                   Last Name
//                 </label>
//                 <input
//                   id="lastName"
//                   type="text"
//                   className="input input-bordered w-full focus:outline-none"
//                   defaultValue={user.lastName}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="block mb-1 font-semibold">
//                   Email Address
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   className="input input-bordered w-full focus:outline-none"
//                   defaultValue={user.email}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="password" className="block mb-1 font-semibold">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   type="password"
//                   className="input input-bordered w-full focus:outline-none"
//                   placeholder="Leave blank if you don't want to change it"
//                 />
//                 <p className="text-sm text-gray-500 mt-1">
//                   Leave blank if you don't want to change it.
//                 </p>
//               </div>

//               <button type="submit" className="btn btn-main rounded-2xl">
//                 Save Changes
//               </button>
//             </form>
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }

import React from 'react'

function Profile() {
    return (
        <div className='mt-20 min-h-screen'>             
            <p>haven't finished this yet sorry😬</p>
        </div>
    )
}

export default Profile