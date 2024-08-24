import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
export function SearchButton() {
  const [searchTerm, setSearchTerm] = useState('');


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <FaSearch size={24}></FaSearch>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 flex flex-col justify-center align-middle items-center text-center gap-4 bg-black text-white">
        <Input 
          type="text" 
          placeholder="Search" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
       <Link href={`/Search/${searchTerm}`}><FaSearch size={24}></FaSearch>

       </Link>
      </PopoverContent>
    </Popover>
  )
}
