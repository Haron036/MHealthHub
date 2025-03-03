import React from "react";
import { assets } from "../assets/assets";
import { Home, Info, Phone, ShieldCheck, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <div className="md:mx-10 bg-white py-12">
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr] gap-12 my-10 text-sm">
        {/*----- Left Section -----*/}
        <div className="flex flex-col items-start">
          <img className="mb-5 w-32" src={assets.logo} alt="Logo" />
          <p className="text-gray-700 leading-6">
            Your mental health is just as important as your physical health. Take care of your mind, and the rest will follow.
          </p>
        </div>

        {/*----- Center Section -----*/}
        <div className="flex flex-col">
          <p className="text-lg font-semibold mb-4 text-black flex items-center gap-2">
            <Info size={20} /> Company
          </p>
          <ul className="flex flex-col gap-3 text-gray-700">
            <li>
              <a href="/" className="flex items-center gap-2 hover:text-black transition">
                <Home size={18} /> Home
              </a>
            </li>
            <li>
              <a href="/about" className="flex items-center gap-2 hover:text-black transition">
                <Info size={18} /> About us
              </a>
            </li>
            <li>
              <a href="/contact" className="flex items-center gap-2 hover:text-black transition">
                <Phone size={18} /> Contact us
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="flex items-center gap-2 hover:text-black transition">
                <ShieldCheck size={18} /> Privacy policy
              </a>
            </li>
          </ul>
        </div>

        {/*----- Right Section -----*/}
        <div className="flex flex-col">
          <p className="text-lg font-semibold mb-4 text-black flex items-center gap-2">
            <Phone size={20} /> Get In Touch
          </p>
          <ul className="flex flex-col gap-3 text-gray-700">
            <li className="flex items-center gap-2">
              <Phone size={18} /> +254757750349
            </li>
            <li>
              <a href="mailto:mhealth@gmail.com" className="flex items-center gap-2 hover:text-black transition">
                <Mail size={18} /> mhealth@gmail.com
              </a>
            </li>
            <li>
              <a href="https://www.google.com/maps/place/Kirinyaga+University" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-black transition">
                <MapPin size={18} /> Kirinyaga, Kenya
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/*-------- Copyright Text ------*/}
      <div className="mt-8 text-center">
        <p className="py-5 text-sm text-gray-600">
          © Copyright 2025 @ Mhealth. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
