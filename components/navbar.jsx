import Link from "next/link";
import React, { useState } from "react";
import { BiHome, BiKey, BiMenu, BiMessage, BiSearch } from "react-icons/bi";

const navLinks = [
  {
    icon: <BiHome />,
    name: "Home",
    url: "/",
    iconBg: "text-red-500",
  },
  {
    icon: <BiSearch />,
    name: "Search",
    url: "/search",
    iconBg: "text-black",
  },
  {
    icon: <BiMessage />,
    name: "Buy Property",
    url: "/search?purpose=for-sale",
    iconBg: "text-blue-500",
  },
  {
    icon: <BiKey />,
    name: "Rent Property",
    url: "/search?purpose=for-rent",
    iconBg: "text-black",
  },
];

export function Navbar() {
  const [openNav, setOpenNav] = useState(false);

  const toggleNav = () => {
    setOpenNav((prev) => !prev);
  };

  return (
    <nav className="py-2 px-3 border-b-2">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-blue-500 font-bold text-[20px] md:text-[27px] cursor-pointer">
            Realtor
          </h1>
        </Link>
        <div className="ml-auto relative" onClick={toggleNav}>
          <button
            className={`text-[25px] w-[30px] h-[30px] flex justify-center items-center border-2 rounded-md text-gray-600 ${
              openNav && "border-blue-500"
            }`}
          >
            <BiMenu />
          </button>
          {/* nav menu */}
          {openNav && (
            <ul className="absolute z-20 top-[40px] right-0 min-w-[200px] rounded-md border-2 bg-white navbar">
              {navLinks.map((navLink, index) => (
                <Link key={index} href={navLink.url}>
                  <li className="text-[15px] flex justify-start items-center p-2 gap-2 cursor-pointer">
                    <i className={`font-bold ${navLink.iconBg}`}>
                      {navLink.icon}
                    </i>
                    <p>{navLink.name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
