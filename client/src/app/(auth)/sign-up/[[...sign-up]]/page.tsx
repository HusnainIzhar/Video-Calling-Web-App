import { SignUp } from "@clerk/nextjs";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const SignUpPage = () => {
  return (
    <main className="h-screen w-full flex flex-col items-center justify-center gap-5">
     <Link
        className="flex items-center gap-2 text-theme-textInactive  hover:text-theme-textActive"
        href={"/"}
      >
        <MoveLeft />
        Go Home
      </Link>
      <SignUp />
    </main>
  );
};

export default SignUpPage;
