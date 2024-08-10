"use client";
import React, { useEffect, useState } from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { IoHomeSharp } from "react-icons/io5"; // Ensure this import is correct
import { UserButton, useAuth, SignInButton } from '@clerk/nextjs';
import { MdTopic } from "react-icons/md";
import { SiVirustotal } from "react-icons/si";
import { FaIndustry } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import { AiFillBuild } from "react-icons/ai";
import ResponsiveNav from "./ResponsiveNav";
import Link from "next/link";
import { SearchButton } from "./Search";

const Navbar = () => {
  const { isLoaded, userId } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

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

  return isMobile ? (
    <ResponsiveNav />
  ) : (
    <div className={`relative bg-black flex-wrap flex flex-row`}>
      <Dock magnification={60} distance={100} className="flex flex-row gap-9 text-white">
        <DockIcon>
          <Link href={"/"}>
            <IoHomeSharp size={24} />
          </Link>
        </DockIcon>
        <DockIcon>
          <Link href={"/topics"}>
            <MdTopic size={24} />
          </Link>
        </DockIcon>
        <DockIcon>
          <Link href={`/profile/${userId}`}>
            <SiVirustotal size={24} />
          </Link>
        </DockIcon>
        <DockIcon>
          <Link href={`/company`}>
            <FaIndustry size={24} />
          </Link>
        </DockIcon>
        <DockIcon>
          <Link href={`/compare`}>
            <FaCodeCompare size={24} />
          </Link>
        </DockIcon>
        <DockIcon>
          <SearchButton />
        </DockIcon>
        <DockIcon>
          <Link href={`/about`}>
            <AiFillBuild size={24} />
          </Link>
        </DockIcon>
        <DockIcon>
          {userId ? <UserButton /> : <SignInButton />}
        </DockIcon>
      </Dock>
    </div>
  );
};

export default Navbar;
