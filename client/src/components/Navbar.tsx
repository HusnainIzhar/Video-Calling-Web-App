"use client";
import { Menu, Video } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import DropDown from "./DropDown";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  const [show, setShow] = useState(false);
  const { isSignedIn } = useUser();
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-16 text-theme-textActive bg-theme-2 border-b border-theme-3 px-16 flex items-center justify-between">
      <Link  href={"/"} className="text-xl font-semibold flex items-center gap-2">
        <Video />
        Chime
      </Link>
      <div className="2xl:block hidden">
        {!isSignedIn ? <SignInButton /> : <UserButton />}
      </div>
      <div className="2xl:hidden relative hover:cursor-pointer" ref={menuRef}>
        {isSignedIn ? (
          <div className="flex gap-5">
            <UserButton />
            <Menu onClick={() => setShow(!show)} />
          </div>
        ) : (
          <SignInButton />
        )}

        {show && isSignedIn && <DropDown show={() => setShow(false)} />}
      </div>
    </div>
  );
};

export default Navbar;
