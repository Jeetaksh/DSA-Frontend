"use client";
import React from 'react';
import ShineBorder from "@/components/magicui/shine-border";
import WordPullUp from "@/components/magicui/word-pull-up";
import Link from 'next/link';

const CompanyInd = ({ name, id }: any) => {
  return (
   <Link href={`/company/${id}`} passHref>   
   
   <ShineBorder 
      className='bg-black text-white p-4 rounded-lg shadow-lg transform transition-transform hover:scale-105 items-center'
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
    >
    

         {
          name
         }

      
    </ShineBorder>
    
    </Link>
  );
}

export default CompanyInd;
