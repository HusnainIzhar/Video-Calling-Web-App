import { X } from "lucide-react";
import React, { FC, ReactNode } from "react";

interface AlertProps {
  component?: ReactNode;
  closeAlert?: () => void;
  heading?: string;
}

const Alert: FC<AlertProps> = ({ component, closeAlert, heading }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const wrapper = document.querySelector(".wrapper");
    if (wrapper) {
      wrapper.classList.add("modal-open");
    }

    return () => {
      if (wrapper) {
        wrapper.classList.remove("modal-open");
      }
    };
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 480);
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      className= "p-5 transition-all duration-500 fixed z-50 top-0 left-0 w-full h-full bg-black/30  flex items-center justify-center overflow-hidden scroll-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeAlert && closeAlert();
        }
      }}
    >
      <div
        className={`animate-in fade-in ... bg-theme-2 border border-theme-3 p-5 font-OpenSans flex flex-col rounded-xl ${isMobile && " w-full"
          } `}
      >
        <div
          className={`flex items-center justify-between ${heading && " py-2"
            }`}
        >
          <p className="text-xl text-theme-textActive">{heading}</p>
          <X
            className=" text-theme-textInactive text-[24px] place-self-end hover:cursor-pointer hover:text-theme-textActive"
            onClick={closeAlert}
          />
        </div>
        <div className="overflow-auto flex justify-center h-full items-center">
          {component}
        </div>
      </div>
    </div>
  );
};

export default Alert;