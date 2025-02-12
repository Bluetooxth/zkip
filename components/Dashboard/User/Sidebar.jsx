"use client";
import React, { useState, useContext } from "react";
import {
  Menu,
  X,
  Home,
  Settings,
  LinkIcon,
  ChartColumn,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { DashboardContext } from "./DashboardContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeComponent, setActiveComponent } = useContext(DashboardContext);

  const changeActiveComponent = (component) => {
    setActiveComponent(component);
    setIsOpen(false);
  };

  const sidebarItems = [
    { icon: <Home size={24} />, label: "Dashboard" },
    { icon: <LinkIcon size={24} />, label: "Links" },
    { icon: <ChartColumn size={24} />, label: "Analytics" },
    { icon: <Settings size={24} />, label: "Settings" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex">
      {/* Large Screens Sidebar (Full) */}
      <nav className="hidden lg:flex flex-col w-64 h-screen bg-zinc-800 p-4 sticky top-0">
        <Link
          href="/dashboard"
          className="text-zinc-100 text-2xl font-medium mb-6"
        >
          zkip
        </Link>
        <ul className="flex flex-col gap-4">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => changeActiveComponent(item.label.toLowerCase())}
                className="w-full flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md text-md font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-900 border border-zinc-800 transition-colors duration-300 ease-in-out"
              >
                {item.icon} {item.label}
              </button>
            </li>
          ))}
        </ul>
        <button className="w-full flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md text-md font-medium text-zinc-100 bg-gradient-to-br from-red-500 to-red-700 border-red-500 transition-colors duration-300 ease-in-out mt-auto">
          <LogOutIcon size={24} /> Logout
        </button>
      </nav>

      {/* Medium Screens Sidebar (Icons Only) */}
      <nav className="hidden md:flex lg:hidden flex-col w-20 h-screen bg-zinc-800 p-4 sticky top-0">
        <Link
          href="/dashboard"
          className="text-zinc-100 text-2xl font-medium mb-6 text-center"
        >
          Z
        </Link>
        <ul className="flex flex-col gap-4">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => changeActiveComponent(item.label.toLowerCase())}
                className="h-12 w-12 flex justify-center items-center p-2 cursor-pointer rounded-md text-md font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-900 border border-zinc-800 transition-colors duration-300 ease-in-out"
              >
                {item.icon}
              </button>
            </li>
          ))}
        </ul>
        <button className="h-12 w-12 flex justify-center items-center mt-auto p-2 cursor-pointer rounded-md text-md font-medium text-zinc-100 bg-gradient-to-br from-red-500 to-red-700 border-red-500 transition-colors duration-300 ease-in-out">
          <LogOutIcon size={24} />
        </button>
      </nav>

      {/* Mobile Sidebar (Toggle) */}
      <div className="md:hidden flex flex-col w-full bg-zinc-800 px-4 py-2 sticky top-0">
        <div className="flex justify-between items-center">
          <Link
            href="/dashboard"
            className="text-zinc-100 text-2xl font-medium"
          >
            zkip
          </Link>
          <button
            onClick={toggleSidebar}
            className="text-zinc-100 cursor-pointer"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {isOpen && (
          <div className="mt-4">
            <ul className="flex flex-col gap-4">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() =>
                      changeActiveComponent(item.label.toLowerCase())
                    }
                    className="w-full flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md text-md font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-900 border border-zinc-800 transition-colors duration-300 ease-in-out"
                  >
                    {item.icon} {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <button className="w-full flex items-center gap-2 px-3 py-2 cursor-pointer rounded-md text-md font-medium text-zinc-100 bg-gradient-to-br from-red-500 to-red-700 border-red-500 transition-colors duration-300 ease-in-out mt-4">
              <LogOutIcon size={24} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Sidebar;
