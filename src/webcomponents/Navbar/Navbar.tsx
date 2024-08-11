"use client";
import React, { useEffect, useState } from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { IoHomeSharp } from "react-icons/io5"; 
import { UserButton, useAuth, SignInButton } from '@clerk/nextjs';
import { MdTopic } from "react-icons/md";
import { SiVirustotal } from "react-icons/si";
import { FaIndustry } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import { AiFillBuild } from "react-icons/ai";
import ResponsiveNav from "./ResponsiveNav";
import Link from "next/link";
import { SearchButton } from "./Search";
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const { isLoaded, userId } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Helper function to determine if the current path matches
  const isActive = (path: string) => pathname === path;

  return isMobile ? (
    <ResponsiveNav />
  ) : (
    <div className={`relative bg-black flex-wrap flex flex-row`}>
      <Dock magnification={60} distance={100} className="flex flex-row gap-9 text-white">
        
        <DockIcon
          className={`${isActive('/') ? 'text-yellow-500' : ''} relative`}
          onMouseEnter={() => setHovered('home')}
          onMouseLeave={() => setHovered(null)}
        >
          <Link href={"/"} >
            <IoHomeSharp size={24} />
          </Link>
          {hovered === 'home' && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-sm px-2 py-1 rounded">
              Home
            </div>
          )}
        </DockIcon>

        <DockIcon
          className={`${isActive('/topics') ? 'text-yellow-500' : ''} relative`}
          onMouseEnter={() => setHovered('100days')}
          onMouseLeave={() => setHovered(null)}
        >
          <Link href={"/topics"}>
            <MdTopic size={24} />
          </Link>
          {hovered === '100days' && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-sm px-2 py-1 rounded">
              100days
            </div>
          )}
        </DockIcon>

        <DockIcon
          className={`${isActive(`/profile/${userId}`) ? 'text-yellow-500' : ''} relative`}
          onMouseEnter={() => setHovered('profile')}
          onMouseLeave={() => setHovered(null)}
        >
          <Link href={`/profile/${userId}`}>
            <SiVirustotal size={24} />
          </Link>
          {hovered === 'profile' && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-sm px-2 py-1 rounded">
              Profile
            </div>
          )}
        </DockIcon>

        <DockIcon
          className={`${isActive('/company') ? 'text-yellow-500' : ''} relative`}
          onMouseEnter={() => setHovered('company')}
          onMouseLeave={() => setHovered(null)}
        >
          <Link href={`/company`}>
            <FaIndustry size={24} />
          </Link>
          {hovered === 'company' && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-sm px-2 py-1 rounded">
              Company
            </div>
          )}
        </DockIcon>

        <DockIcon
          className={`${isActive('/compare') ? 'text-yellow-500' : ''} relative`}
          onMouseEnter={() => setHovered('compare')}
          onMouseLeave={() => setHovered(null)}
        >
          <Link href={`/compare`}>
            <FaCodeCompare size={24} />
          </Link>
          {hovered === 'compare' && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-sm px-2 py-1 rounded">
              Compare
            </div>
          )}
        </DockIcon>

        <DockIcon
          className={`${isActive('/about') ? 'text-yellow-500' : ''} relative`}
          onMouseEnter={() => setHovered('about')}
          onMouseLeave={() => setHovered(null)}
        >
          <Link href={`/about`}>
            <AiFillBuild size={24} />
          </Link>
          {hovered === 'about' && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black text-white text-sm px-2 py-1 rounded">
              About
            </div>
          )}
        </DockIcon>

        <DockIcon>
          <SearchButton />
        </DockIcon>
        
        <DockIcon>
          {userId ? <UserButton /> : <SignInButton />}
        </DockIcon>
      </Dock>
    </div>
  );
};

export default Navbar;
