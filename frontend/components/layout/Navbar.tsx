'use client';

import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { UserIcon } from '@/assets/GlobalIcons';
import { AuthContext } from "@/pages/_app";

export default function Navbar() {
  const router = useRouter();

  interface UserInfo {
    name: string;
    email: string;
  }

  const contextData = useContext(AuthContext);
const { userInfo } = contextData as { userInfo: UserInfo };

  function redirectToLoginPage(): void {
    console.log("Redirecting to login page");
    Cookies.remove("user");
  }

  const handleLogOut = (): void => {
    console.log("Logging out");
    router.push("/login");
    redirectToLoginPage();
  };

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 mb-4">
      <nav className="max-w-[95rem] w-full mx-6 px-1 flex flex-wrap basis-full items-center justify-between">
      <div className="sm:order-1 flex-none text-2xl font-bold focus:outline-none focus:opacity-80">
          Work<span className="text-blue-700">flow!</span>
        </div>
        {/* <div className="sm:order-1 flex-none text-2xl font-bold focus:outline-none focus:opacity-80">
          Good Morning {userInfo?.name}
        </div> */}
        <div className="sm:order-4 flex items-center gap-x-4">
          <HoverButtonWithTooltip userInfo={userInfo}/>
          <button
            type="button"
            onClick={handleLogOut}
            className="py-2 px-8 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

function HoverButtonWithTooltip({userInfo}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="py-2 p-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
      >
        <UserIcon />
      </button>
      {showTooltip && (
        <div className="absolute right-full mx-2 top-0 w-65 px-4 py-2 text-sm font-sm rounded-lg border border-gray-200 bg-white text-gray-800" style={{whiteSpace:'nowrap'}}>
          {userInfo?.name}
        </div>
      )}
    </div>
  );
}
