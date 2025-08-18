import React, { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';

import axios from "axios";  // ✅ Correct import

export default function Navbar() {
  const routerNavigate = useNavigate(); 
  const { isEducator, setIsEducator } = useContext(AppContext);
  const location = useLocation();
  const isCourseListPage = location.pathname.includes('/course-list');

  const { openSignIn } = useClerk();
  const { user } = useUser();

  // ✅ Save user in DB when logged in
  const handleSaveUser = async () => {
    try {
      if (!user) return;

      const userData = {
  clerkId: user?.id,  // ✅ Clerk unique ID
  username: user?.username || user?.firstName, // fallback
  email: user?.primaryEmailAddress?.emailAddress,
  imageUrl: user?.imageUrl, // ✅ Clerk profile image
};

console.log("userData:", userData);

const res = await axios.post("http://localhost:5000/api/users", userData);


     
  
    } catch (err) {
      console.error("❌ Error saving user:", err);
    }
  };

  useEffect(() => {
    if (user) {
      handleSaveUser();
    }
  }, [user]);

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? 'bg-white' : 'bg-cyan-100/80'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-1">
        <img
          onClick={() => routerNavigate('/')}
          src={assets.logoupdated}
          alt="Edunova logo"
          className="h-6 w-6 rounded-full cursor-pointer"
        />
        <span
          onClick={() => routerNavigate('/')}
          className="text-gray-900 font-bold text-xl tracking-tight cursor-pointer"
        >
          Edunova
        </span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button className="cursor-pointer" onClick={() => routerNavigate('/educator')}>
                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>
              <span>|</span>
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-5 max-sm:text-xs">
          {user && (
            <>
              <button onClick={() => routerNavigate('/educator')}>
                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={openSignIn}>
            <img src={assets.user_icon} alt="user icon" />
          </button>
        )}
      </div>
    </div>
  );
}
