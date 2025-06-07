import React from 'react';
import { FaFacebookF, FaInstagram, FaXTwitter, FaEnvelope, FaPhone } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 mt-10">
            <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Column 1 - About */}
                <div>
                    <h2 className="text-xl font-bold text-[#5b30a6]">About Us</h2>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        We are the No.1 job hunting platform, connecting top talent with great opportunities across various industries.
                    </p>
                    <div className="mt-4 space-y-2 text-sm">
                        <p className="flex items-center text-gray-600 dark:text-gray-400 hover:text-[#5b30a6] transition-colors">
                            <FaPhone className="mr-2 text-[#5b30a6]" /> +91 98765 43210
                        </p>
                        <p className="flex items-center text-gray-600 dark:text-gray-400 hover:text-[#5b30a6] transition-colors">
                            <FaEnvelope className="mr-2 text-[#5b30a6]" /> support@jobify.com
                        </p>
                    </div>
                </div>

                {/* Column 2 - Social Media */}
                <div>
                    <h2 className="text-xl font-bold text-[#5b30a6]">Follow Us</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Stay connected through our social channels</p>
                    <div className="mt-4 flex space-x-4">
                        <a href="#" aria-label="Facebook" className="text-gray-600 dark:text-gray-300 hover:text-[#4267B2] transition-transform transform hover:scale-110 text-xl">
                            <FaFacebookF />
                        </a>
                        <a href="#" aria-label="Instagram" className="text-gray-600 dark:text-gray-300 hover:text-[#E4405F] transition-transform transform hover:scale-110 text-xl">
                            <FaInstagram />
                        </a>
                        <a href="#" aria-label="Twitter" className="text-gray-600 dark:text-gray-300 hover:text-[#1DA1F2] transition-transform transform hover:scale-110 text-xl">
                            <FaXTwitter />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-300 dark:border-gray-700 text-center py-5">
                <p className="text-sm text-gray-600 dark:text-gray-400">&copy; 2025 Jobify. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
