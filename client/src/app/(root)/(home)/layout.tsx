import React, { ReactNode } from "react";
import { MetaData } from "@/utils/MetaData";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { Poppins } from "next/font/google";

type Props = {};
const poppin = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

<MetaData title="chime" description="app" />;

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main className={`${poppin.className} relative h-screen overflow-hidden`}>
      <Navbar />
      <div className="flex h-full">
        <SideBar />
        <section className="flex flex-1 h-full overflow-auto">
          {children}
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
