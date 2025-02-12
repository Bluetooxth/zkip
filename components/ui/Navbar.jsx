"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <header className="w-full bg-zinc-800 py-2 font-[family-name:var(--font-roboto)] absolute top-0 left-0 z-50">
      <nav className="container mx-auto flex justify-between items-center px-4 lg:px-8">
        <Link href="/" className="text-2xl font-medium text-zinc-200 font-[family-name:var(--font-instrument-serif)]">
          Zkip
        </Link>
        <ul className="hidden lg:flex items-center space-x-6">
          {["Home", "Contact", "About"].map((item) => (
            <li key={item}>
              <Link href="/" className="text-zinc-200 hover:text-green-500">
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex">
          <Link
            href="/login"
            className="px-4 py-2 hover:opacity-90 bg-gradient-to-br from-green-500 to-green-700 text-zinc-100 rounded-full border border-green-500 transition"
          >
            Login
          </Link>
        </div>

        <button onClick={toggleMenu} className="lg:hidden focus:outline-none">
          <Menu size={28} className="text-zinc-200" />
        </button>
      </nav>

      {showMenu && (
        <div className="fixed inset-0 bg-zinc-800 bg-opacity-95 flex flex-col justify-center items-center z-50">
          <button
            onClick={toggleMenu}
            className="absolute top-2 right-4 text-zinc-200 focus:outline-none"
          >
            <X size={32} />
          </button>
          <ul className="space-y-6 text-center">
            {["Home", "Contact", "About"].map((item) => (
              <li key={item}>
                <Link
                  href="/"
                  className="text-zinc-200 text-lg hover:text-green-500"
                  onClick={toggleMenu}
                >
                  {item}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/login"
                className="px-5 py-2 hover:opacity-90 bg-gradient-to-br from-green-500 to-green-700 text-zinc-100 rounded-full border border-green-500 transition"
                onClick={toggleMenu}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
