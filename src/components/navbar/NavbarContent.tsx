"use client"

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import SearchInput from "../input/SearchInput";
import Link from "next/link";

const NavbarContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white px-4 md:px-6">
      <div className="flex justify-between items-center py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-[180px] md:w-[220px] h-[60px] md:h-[80px]">
            <img
              src="https://bachlongmobile.com/assets/images/logo/logo-website-1.png"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-x-8">
          <Link href="/product" className="hover:text-yellow-500 transition font-medium">
            PRODUCT
          </Link>
          <Link href="/blog" className="hover:text-yellow-500 transition font-medium">
            BLOGS
          </Link>
          <Link href="/support" className="hover:text-yellow-500 transition font-medium">
            SUPPORT
          </Link>
          <SearchInput />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-end"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} className="cursor-pointer" /> : <FiMenu size={28} className="cursor-pointer"/>}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden w-full flex flex-col items-end justify-center space-y-4 py-4 bg-white">
          <Link href="/product" className="hover:text-yellow-500 transition font-medium">
            PRODUCT
          </Link>
          <Link href="/blog" className="hover:text-yellow-500 transition font-medium">
            BLOGS
          </Link>
          <Link href="/support" className="hover:text-yellow-500 transition font-medium">
            SUPPORT
          </Link>
          <SearchInput />
        </div>
      )}
    </nav>
  );
};

export default NavbarContent;
