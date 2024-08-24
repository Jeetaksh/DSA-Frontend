
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { Input } from "@/components/ui/input"
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"  
  import { IoAddCircleSharp } from "react-icons/io5";
  import { FaBook } from "react-icons/fa6";
  import { Button } from "@/components/ui/button"
  import { IoHomeSharp } from "react-icons/io5"; 
  import { UserButton ,useAuth} from '@clerk/nextjs';
  import { MdTopic } from "react-icons/md";
  import { SiVirustotal } from "react-icons/si";
  import { FaIndustry } from "react-icons/fa";
  import { FaCodeCompare } from "react-icons/fa6";
  import { SiCreatereactapp } from "react-icons/si";
  import { AiFillBuild } from "react-icons/ai";
  import { FaGripLines } from "react-icons/fa";
  import {
    SignInButton,
  } from '@clerk/nextjs';
  import Link from "next/link";
  import { SearchButton } from "./Search";
const ResponsiveNav = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    if (!isLoaded) {
      return <div>Loading...</div>;
    }
  return (
    <div className='flex justify-between flex-wrap '>

    <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button ><FaGripLines size={24} />
      </Button>
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader className=' flex-col gap-1 items-center'>
      <Link href={"/"}>
      <AlertDialogCancel>     <IoHomeSharp size={24} /></AlertDialogCancel>

          </Link>

          <Link href={"/topics"}>
          <AlertDialogCancel>  <MdTopic  size={24}/></AlertDialogCancel>
          </Link>


          <Link href={`/profile/${userId}`}>
          <AlertDialogCancel>  <SiVirustotal size={24} /></AlertDialogCancel>
          </Link>


          <Link href={`/company`}>
               <AlertDialogCancel> <FaIndustry size={24} /> </AlertDialogCancel>
          </Link>
          <Link href={`/compare`}>
        <AlertDialogCancel> <FaCodeCompare size={24} />   </AlertDialogCancel>
          </Link>


  <Popover>
      <PopoverTrigger asChild>
        <Button>
          <FaSearch size={24}></FaSearch>
        </Button>
      </PopoverTrigger>
      <PopoverContent  className="w-80 flex flex-col justify-center align-middle items-center text-center gap-4 bg-black text-white">
        <Input 
          type="text" 
          placeholder="Search" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
       <Link 
       href = {`/Search/${searchTerm}`}
        >
       <AlertDialogCancel>
       <FaSearch  color='black' size={24}>
       </FaSearch>
       </AlertDialogCancel> 
       </Link>

      </PopoverContent>
      </Popover>

<Link href={`/about`}>
                 <AlertDialogCancel>  <AiFillBuild size={24} />          </AlertDialogCancel>
</Link>

          <Link href={`/allmyquestions`}>
          <AlertDialogCancel>
        <FaBook size={24} />
        </AlertDialogCancel>
          </Link>
          <Link href={`/addquestion`}>
          <AlertDialogCancel>
        <IoAddCircleSharp size={24} />
          </AlertDialogCancel>
          </Link>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
  <div className=' text-white'>
        {userId?  <UserButton/>:<SignInButton />}
  </div>
  </div>
  )
}
export default ResponsiveNav
