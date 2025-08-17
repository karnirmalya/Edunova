import React from "react";
import { assets } from "../../assets/assets";

function Footer() {
  return (
    <footer className="flex md:flex-row flex-col items-center justify-between w-full px-8 py-4 border-t bg-white">
      {/* Left side: Logo + Copyright */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <img
            src={assets.logoupdated}
            alt="Edunova logo"
            className="h-6 w-6 rounded-full cursor-pointer"
          />
          <span className="text-black font-semibold text-lg tracking-tight cursor-pointer">
            Edemy
          </span>
        </div>
        <p className="text-xs md:text-sm text-gray-500">
          Copyright 2025 © Edunova. All Right Reserved.
        </p>
      </div>

      {/* Right side: Social icons */}
      <div className="flex gap-4 mt-4 md:mt-0">
        <a href="#">
          <img src={assets.facebook_icon} alt="facebook_icon" className="h-5 w-5" />
        </a>
        <a href="#">
          <img src={assets.twitter_icon} alt="twitter_icon" className="h-5 w-5" />
        </a>
        <a href="#">
          <img src={assets.instagram_icon} alt="instagram_icon" className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
