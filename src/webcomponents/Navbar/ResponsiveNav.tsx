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
  import { FaBook } from "react-icons/fa6";
import { IoAddCircleSharp } from "react-icons/io5";

  import { Button } from "@/components/ui/button"
  import { IoHomeSharp } from "react-icons/io5";  // Ensure this import is correct
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
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    if (!isLoaded) {
      return <div>Loading...</div>;
    }
  return (
    <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button ><FaGripLines size={24} />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader className=' flex-col gap-8 items-center'>
      <Link href={"/"}>
          <IoHomeSharp size={24} />

          </Link>

          <Link href={"/topics"}>
          <MdTopic  size={24}/>
          </Link>


          <Link href={`/profile/${userId}`}>
        <SiVirustotal size={24} />
          </Link>


          <Link href={`/company`}>
        <FaIndustry size={24} />
          </Link>

          <Link href={`/compare`}>
        <FaCodeCompare size={24} />
          </Link>

          <SearchButton></SearchButton>
          <Link href={`/about`}>
        <AiFillBuild size={24} />
          </Link>


          <Link href={`/allmyquestions`}>
        <FaBook size={24} />
          </Link>


          <Link href={`/addquestion`}>
        <IoAddCircleSharp size={24} />
          </Link>



          {    userId?     <UserButton/>:<SignInButton />}



          <AlertDialogCancel>Cancel</AlertDialogCancel>
     
      </AlertDialogHeader>

    </AlertDialogContent>
  </AlertDialog>
  )
}

export default ResponsiveNav
