"use client";
import React, { FC } from "react";
import { sidebarData } from "@/constants";
import { useRouter } from "next/navigation";
import Link from "next/link";
type Props = {
  show: () => void;
};

const DropDown: FC<Props> = ({ show }) => {
  const router = useRouter();
  return (
    <div className="absolute top-10 z-10 bg-theme-dark p-5 border border-theme-3 rounded-lg right-[-40px]">
      {sidebarData.map((i, k) => (
        <Link
          href={i.route}
          onClick={() => {
            show();
          }}
          key={k}
          className={`flex gap-2 items-center hover:cursor-pointer hover:text-theme-textActive ${"text-theme-textInactive"}  p-3 rounded-lg`}
        >
          <div className="min-w-10"> {i.icon}</div>

          <p className=" text-nowrap">{i.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default DropDown;
