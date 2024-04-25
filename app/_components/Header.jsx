"use client"

"use client"

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover"
import { useRouter } from 'next/navigation';


function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    setIsLogin(userData ? true : false);
  }, []); 

  const onSignOut = () => {
    sessionStorage.clear();
    setIsLogin(false); 
    router.push('/sign-in');
  };

  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Explore",
      path: "/explorePage",
    },
    {
      id: 3,
      name: "Contact Us",
      path: "/contact",
    },
  ];

  return (
    <div className="flex items-center justify-between ml-4 mr-4 mt-1">
      <div className="flex items-center gap-20 right-4">
        <Link href="/">
          <Image src="/logo3.png" alt="logo" width={100} height={100} />
        </Link>

        <ul className="md:flex gap-8 hidden">
          {Menu.map((item, index) => (
            <Link key={index} href={item.path}>
              <li
                className="hover:text-green-700 cursor-pointer hover:scale-105 transition-all ease-in-out"
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {!isLogin ? (
  <Link href={"/sign-in"}>
    <Button>Get Started</Button>
  </Link>
) : (
  <Popover asChild>
    <PopoverTrigger>
      <CircleUserRound className="p-2 text-green-800 h-12 w-12" />
    </PopoverTrigger>
    <PopoverContent className="w-44">
      <ul className="flex flex-col gap-2">
        <Link href={"/profile"} className="cursor-pointer p-2 hover:bg-slate-100 rounded-md">Profile</Link>
        <Link href={"/my-booking"} className="cursor-pointer p-2 hover:bg-slate-100 rounded-md">My Booking</Link>
        <li onClick={() => onSignOut()} className="cursor-pointer p-2 hover:bg-slate-100 rounded-md">Logout</li>
      </ul>
    </PopoverContent>
  </Popover>
)}

    </div>
  );
}

export default Header;




