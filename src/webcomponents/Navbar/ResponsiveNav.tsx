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

          <SearchButton></SearchButton>


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


          {    userId?     <UserButton/>:<SignInButton />}



          <AlertDialogCancel>Cancel</AlertDialogCancel>
     
      </AlertDialogHeader>

    </AlertDialogContent>
  </AlertDialog>
  )
}

export default ResponsiveNav
