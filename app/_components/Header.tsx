"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Menu, X , MoreVertical } from "lucide-react"; // Icons for mobile menu toggle

const menuOptions = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact Us", path: "/contact-us" },
  {name: "About Us", path:"/about"}
];

const Header = () => {
  const { user } = useUser();
  const path = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
      <header className="w-full px-4 md:px-6 py-2 md:py-4 bg-white dark:bg-neutral-900 shadow-md fixed top-0 z-50">
      <div className="flex justify-between items-center">

        {/* Left: Logo + Mobile Button */}
        <div className="flex items-center gap-2">
          <Link href={"/"}>
            <div className="flex gap-2 items-center cursor-pointer">
              <Image src={"/logo.svg"} alt="logo" width={28} height={28} />
              <h2 className="font-bold text-lg md:text-xl text-primary">AI Trip Planner</h2>
            </div>
          </Link>

          {/* Mobile Button for Create New Trip / Get Started */}
          <div className="md:hidden flex items-center ml-2">
            {!user ? (
              <SignInButton mode="modal">
                <Button size="sm">Get Started</Button>
              </SignInButton>
            ) : path === "/create-new-trip" ? (
              <Link href={"/my-trips"}>
                <Button size="sm">My Trip</Button>
              </Link>
            ) : (
              <Link href={"/create-new-trip"}>
                <Button size="sm">Create New Trip</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {menuOptions.map((menu, index) => (
            <Link
              key={index}
              href={menu.path}
              className="text-base md:text-lg hover:scale-105 transition-all hover:text-primary"
            >
              {menu.name}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-5 items-center">
          {!user ? (
            <SignInButton mode="modal">
              <Button size="sm">Get Started</Button>
            </SignInButton>
          ) : path === "/create-new-trip" ? (
            <Link href={"/my-trips"}>
              <Button size="sm">My Trip</Button>
            </Link>
          ) : (
            <Link href={"/create-new-trip"}>
              <Button size="sm">Create New Trip</Button>
            </Link>
          )}
          <UserButton />
        </div>

        {/* Mobile 3-dot Menu */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-800 transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MoreVertical className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Navigation links + User profile) */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-3 bg-white dark:bg-neutral-900 p-4 rounded-lg shadow-lg animate-slide-down">
          {/* Navigation Links */}
          {menuOptions.map((menu, index) => (
            <Link
              key={index}
              href={menu.path}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium hover:text-primary transition"
            >
              {menu.name}
            </Link>
          ))}

          <hr className="border-gray-200 dark:border-neutral-700 my-2" />

          {/* User Profile */}
          <div className="flex items-center justify-start">
            <UserButton />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
