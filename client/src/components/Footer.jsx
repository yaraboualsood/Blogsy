import React from 'react';
import logo from '/logo3.png';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
          <div>
            <h4 className=" mb-3 flex items-center gap-2 text-2xl web-title">
              <img src={logo} alt="logo" className="h-8 w-8 object-contain " />
              Blogsy
            </h4>
            <div>
              <h6 className="uppercase mb-2 font-semibold text-sm">Social media</h6>
              <ul className="list-none space-y-2">
                <li>
                  <a href="#" className="flex items-center hover:text-blue-500">
                    <i className="fa-brands fa-twitter mr-2"></i> Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center hover:text-pink-600">
                    <i className="fa-brands fa-instagram mr-2"></i> Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center hover:text-blue-700">
                    <i className="fa-brands fa-facebook mr-2"></i> Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="uppercase mb-3 font-bold text-lg">Contact Information</h4>
            <address className="not-italic text-sm leading-relaxed">
              <p>
                5th Settlement,
                <br />
                1250-148 Cairo, Egypt
              </p>
              <p>+20 1234567</p>
              <p>info@blogsy.com</p>
            </address>
          </div>

          <div>
            <h4 className="uppercase mb-3 font-bold text-lg">Home</h4>
            <ul className="list-none space-y-2 text-sm">
              <li>
                <Link to="/aboutus" className="hover:underline text-gray-700">
                  About Us
                </Link>
              </li>
              <li>
                 <Link to="/signup" className="hover:underline text-gray-700">
                  Join Us
                </Link>
              </li>
              <li>
                <Link to="/home/feed" className="hover:underline text-gray-700">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-300">
          <p className="text-center text-sm text-gray-600">© 2025 Blogsy. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
