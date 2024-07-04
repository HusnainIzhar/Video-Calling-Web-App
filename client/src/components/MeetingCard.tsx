import React, { FC } from "react";

type Props = {
  icon?: React.ReactNode;
  title?: string;
  time?: string;
  button1Text?: string;
  button2Text?: string;
  handleButton1?: () => void;
  handleButton2?: () => void;
  previous?: boolean;
  btn1Icon?:React.ReactNode;
  btn2Icon?:React.ReactNode;
};

const MeetingCard: FC<Props> = ({
  icon,
  title,
  time,
  button1Text,
  button2Text,
  handleButton1,
  handleButton2,
  previous,
  btn1Icon,
  btn2Icon
}) => {
  return (
    <div className=" bg-theme-2 border border-theme-3 p-5 w-full md:w-[400px] h-[220px]  rounded-lg flex flex-col gap-5 justify-center">
      <div className=" text-theme-textActive">{icon}</div>
      <h2 className="text-theme-textActive text-lg font-semibold">{title}</h2>
      <p className=" text-theme-textInactive ">{time}</p>
      {!previous && button1Text && button2Text && (
        <div className="w-full flex justify-end gap-5">
          <button
            className="flex gap-2 bg-theme-4 text-theme-textInactive hover:text-theme-textActive py-2 px-4 border border-theme-3 rounded-lg"
            onClick={handleButton1}
          >
            {btn1Icon}{button1Text}
          </button>
          <button
            className=" bg-theme-dark text-theme-textInactive hover:text-theme-textActive py-2 px-4 border border-theme-3 rounded-lg flex gap-2"
            onClick={handleButton2}
          >
            {btn2Icon}{button2Text}
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetingCard;
