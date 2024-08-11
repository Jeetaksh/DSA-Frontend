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
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
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
        
          className={isActive('/') ? 'text-yellow-500' : ''}
        >
          <Link href={"/"} >
          <div   onMouseEnter={() => setHoveredIcon('Home')}
          onMouseLeave={() => setHoveredIcon(null)}>

          <IoHomeSharp size={24} />

          </div>
          </Link>
          {hoveredIcon === 'Home' && (
            <div className="absolute bg-gray-700 text-white p-1 rounded-md text-xs top-full mt-1 left-1/2 transform -translate-x-1/2">
              Home
            </div>
          )}
        </DockIcon>
        <DockIcon
     
          className={isActive('/topics') ? 'text-yellow-500' : ''}
        >
          <Link href={"/topics"}>
          <div      onMouseEnter={() => setHoveredIcon('100days')}
          onMouseLeave={() => setHoveredIcon(null)}>
             <MdTopic size={24} />
          </div>
           
          </Link>
          {hoveredIcon === '100days' && (
            <div className="absolute bg-gray-700 text-white p-1 rounded-md text-xs top-full mt-1 left-1/2 transform -translate-x-1/2">
              100days
            </div>
          )}
        </DockIcon>
        <DockIcon
        
          className={isActive(`/profile/${userId}`) ? 'text-yellow-500' : ''}
        >
          <Link href={`/profile/${userId}`}>
          <div   onMouseEnter={() => setHoveredIcon('Profile')}
          onMouseLeave={() => setHoveredIcon(null)}>
          <SiVirustotal size={24} />

          </div>
          </Link>
          {hoveredIcon === 'Profile' && (
            <div className="absolute bg-gray-700 text-white p-1 rounded-md text-xs top-full mt-1 left-1/2 transform -translate-x-1/2">
              Profile
            </div>
          )}
        </DockIcon>
        <DockIcon
        
          className={isActive('/company') ? 'text-yellow-500' : ''}
        >
          <Link href={`/company`}>
          <div   onMouseEnter={() => setHoveredIcon('Company')}
          onMouseLeave={() => setHoveredIcon(null)}>
          <FaIndustry size={24} />

          </div>
          </Link>
          {hoveredIcon === 'Company' && (
            <div className="absolute bg-gray-700 text-white p-1 rounded-md text-xs top-full mt-1 left-1/2 transform -translate-x-1/2">
              Company
            </div>
          )}
        </DockIcon>
        <DockIcon
         
          className={isActive('/compare') ? 'text-yellow-500' : ''}
        >
          <Link href={`/compare`}>
          <div  onMouseEnter={() => setHoveredIcon('Compare')}
          onMouseLeave={() => setHoveredIcon(null)}>
            <FaCodeCompare size={24} />

          </div>
          </Link>
          {hoveredIcon === 'Compare' && (
            <div className="absolute bg-gray-700 text-white p-1 rounded-md text-xs top-full mt-1 left-1/2 transform -translate-x-1/2">
              Compare
            </div>
          )}
        </DockIcon>
        <DockIcon
          
          className={isActive('/about') ? 'text-yellow-500' : ''}
        >
          <Link href={`/about`}>
          <div onMouseEnter={() => setHoveredIcon('About')}
          onMouseLeave={() => setHoveredIcon(null)}>
            <AiFillBuild size={24} />

          </div>
          </Link>
          {hoveredIcon === 'About' && (
            <div className="absolute bg-gray-700 text-white p-1 rounded-md text-xs top-full mt-1 left-1/2 transform -translate-x-1/2">
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
