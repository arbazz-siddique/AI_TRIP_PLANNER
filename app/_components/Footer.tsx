'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
  return (
    <footer className="bg-gray-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <Image src="/logo.svg" alt="AI Trip Planner Logo" width={50} height={50} />
          <p className="mt-4 text-gray-600">
            AI Trip Planner helps you create custom travel itineraries with AI-driven recommendations.
          </p>
        </div>
        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-orange-500">Home</a></li>
            <li><a href="/pricing" className="hover:text-orange-500">Pricing</a></li>
            <li><a href="/contact" className="hover:text-orange-500">Contact Us</a></li>
            <li><a href="/about" className="hover:text-orange-500">About</a></li>
            <li><a href="/privacy" className="hover:text-orange-500">Privacy Policy</a></li>
          </ul>
        </div>
        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Subscribe to our Newsletter</h3>
          <form className="flex flex-col sm:flex-row gap-2"
          onSubmit={async (e) => {
                    e.preventDefault();
                    const formEl = e.currentTarget;
                    const emailInput = formEl.querySelector(
                      "input[type='email']"
                    ) as HTMLInputElement;
                    const email = emailInput.value;

                    try {
                      const res = await fetch("/api/contact", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email }),
                      });

                      if (!res.ok) throw new Error("Failed to subscribe");

                      setSuccessMsg("✅ Subscribed successfully!");
                      emailInput.value = "";

                      setTimeout(() => setSuccessMsg(null), 5000);
                    } catch (err) {
                      setErrorMsg("❌ Subscription failed. Try again.");
                      setTimeout(() => setErrorMsg(null), 5000);
                    }
                  }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white rounded-lg px-6 py-2"
            >
              Subscribe
            </button>
          </form>
          {(successMsg || errorMsg) && (
                <div className="mt-2">
                  {successMsg && (
                    <div className="text-sm text-green-600">{successMsg}</div>
                  )}
                  {errorMsg && (
                    <div className="text-sm text-red-500">{errorMsg}</div>
                  )}
                </div>
              )}
        </div>
        {/* Social Media Icons */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/profile.php?id=100088561035893" className="text-gray-600 hover:text-green-500">
              <FaFacebook size={24} />
            </a>
            <a href="https://x.com/ArbazSiddi52550" className="text-gray-600 hover:text-green-500">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com/mohammadarbazz17/" className="text-gray-600 hover:text-green-500">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/arbaz-siddique-b99529244/" className="text-gray-600 hover:text-green-500">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="mt-6 border-t border-gray-300 text-center py-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} AI Trip Planner. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
