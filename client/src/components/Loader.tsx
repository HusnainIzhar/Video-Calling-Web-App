import { Loader2, LoaderCircle } from "lucide-react";
import React from "react";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="h-screen w-full bg-theme-dark flex items-center justify-center text-theme-textInactive">
      <LoaderCircle color="#848d97" strokeWidth={1} className="animate-spin" />
    </div>
  );
};

export default Loader;
