"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const menuOptions = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Contact us",
    path: "/contact-us",
  },
];

const Header = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center p-4">
      {/* log */}
      <div className="flex gap-3 items-center">
        <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
        <h2 className="font-bold text-xl text-primary">AI Trip Planner</h2>
      </div>
      {/* menu options */}

      <div className="flex gap-8 items-center">
        {menuOptions.map((menu, index) => (
          <Link
            key={index}
            href={menu.path}
            className="text-lg hover:scale-105 transition-all hover:text-primary"
          >
            <h2>{menu.name}</h2>
          </Link>
        ))}
      </div>

      {/* Get started Button */}
      {!user ? (
        <SignInButton mode="modal">
          <Button>Get Started</Button>
        </SignInButton>
      ) : (
        <Link href={'/create-trip'}>
        <Button>Create New Trip</Button>
        </Link>
        
      )}
    </div>
  );
};

export default Header;
