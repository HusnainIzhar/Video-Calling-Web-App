import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
type Props = {};

const JoinMeeting = (props: Props) => {
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  return (
    <div className="w-96 mt-3">
      <p className=" text-theme-textInactive">Paste meeting link below</p>
      <input
        type="text"
        className=" mt-3 w-full rounded-lg border border-theme-3 bg-theme-2 p-2 outline-none text-theme-textInactive"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <br />
      <button
  onClick={() => router.replace(inputValue)}
  disabled={inputValue === ""}
  className={`px-3 py-2 rounded-lg mt-3 border border-theme-3 bg-theme-dark text-theme-textInactive  ${inputValue === "" ? ' bg-theme-2 cursor-not-allowed' : 'hover:text-theme-textActive'}`}
>
  Join meeting
</button>

    </div>
  );
};

export default JoinMeeting;
