"use client"
import React from 'react'
import ShineBorder from "@/components/magicui/shine-border";
import WordPullUp from "@/components/magicui/word-pull-up";
import Link from 'next/link';
const TopicInd = ({name,id,day}:any) => {
   
  return (
  <Link href={`/topics/${id}`}>  <ShineBorder className='bg-black text-white flex flex-row flex-wrap justify-evenly items-center'
    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
  >


<div>
  {
    name
  }
</div>


<div>


{day}
</div>


  </ShineBorder></Link>
  )
}

export default TopicInd
