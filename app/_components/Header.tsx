"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const path = usePathname();
  
  return (
    <div className="flex justify-between items-center p-4">
      {/* log */}
      <Link href={'/'}>
      <div className="flex gap-3 items-center cursor-pointer">
        <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
        <h2 className="font-bold text-xl text-primary">AI Trip Planner</h2>
      </div>
      </Link>
      
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
      <div className="flex gap-5 items-center">
      {!user ? (
        <SignInButton mode="modal">
          <Button>Get Started</Button>
        </SignInButton>
      ) : (
        path == "/create-new-trip" ? 
        <Link href={'/my-trips'}>
        <Button>My Trip</Button>
        </Link>
        :<Link href={'/create-new-trip'}>
        <Button>Create New Trip</Button>
        </Link>
        
      )}
      <UserButton/>
         </div>
    </div>
  );
};

export default Header;
