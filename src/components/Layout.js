import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Nav from "./Nav";
import {BsGithub} from 'react-icons/bs'

export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-gray-800 w-screen h-screen flex justify-center items-center">
        <div className="text-center flex justify-center items-center rounded-lg bg-white
        hover:scale-105 transition-all">
          <button
            onClick={() => signIn()}
            className="p-2 pr-0 px-4"
          >
            Login with Github 
          </button>
            <BsGithub className='text-[30px] mr-1'/>
        
        </div>
      </div>
    );
  }

  return (
    <div className=''>
      <Nav/>
        <div className='h-auto'>
          {children}
        </div>
      
    </div>
  );
}
