import React from "react";
import { assets } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Navbar() {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3">
      <Link to="/">
        <div className="flex items-center gap-1">
          <img
            src={assets.logoupdated}
            alt="Edunova logo"
            className="h-6 w-6 rounded-full cursor-pointer"
          />
          <span className="text-gray-900 font-bold text-xl tracking-tight cursor-pointer">
            Edunova
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-5 text-gray-500 relative">
        <p>Hi {user ? user.fullName || "Nirmalya" : "Developer"}</p>
        {user ? (
          <UserButton />
        ) : (
          <img
            src={assets.profile_img}
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
