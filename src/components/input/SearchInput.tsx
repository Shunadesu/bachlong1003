'use client'

import { useState } from "react";
import icons from "@/ulities/icons";

const SearchInput = () => {
  const { CiSearch } = icons;
  const [isShow, setIsShow] = useState(false);

  return (
    <div
      className={`flex items-center  border-gray-300 rounded-2xl overflow-hidden transition-all duration-300 ease ${isShow ? "border **:w-full max-w-[200px]" : "max-w-[50px]"}`}
    >
      <input
        type="text"
        placeholder="Search..."
        className={`py-2 outline-none text-gray-700 transition-all duration-300 ease ${isShow ? "px-4 w-full opacity-100" : "w-0 opacity-0"}`}
      />
      <div
        onClick={() => setIsShow(!isShow)}
        className="px-4 py-2 w-full max-w-[50px] cursor-pointer transition-all duration-300 ease hover:text-[]"
      >
        <CiSearch className="text-[16px]" />
      </div>
    </div>
  );
};

export default SearchInput;