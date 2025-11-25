"use client";
import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";

export default function MainNav() {
  const noLoggedInNav = [{ name: "Home", href: "/" }];
  const loggedInNav = [
    { name: "Home", href: "/" },
    { name: "Task Dashboard", href: "/dashboard" },
  ];

  const [navigation, setNavigation] = useState(noLoggedInNav);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in NavBar:", token);
    token ? setNavigation(loggedInNav) : setNavigation(noLoggedInNav);
  }, []);

  return (
    <nav className="bg-black shadow-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center mr-3">
                <svg
                  className="w-5 h-5 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="sm:text-2xl  md:text-4xl font-bold text-yellow-400">
                TodoY
              </h1>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-yellow-400 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          <MobileNav navigation={navigation} />
        </div>
      </div>
    </nav>
  );
}
