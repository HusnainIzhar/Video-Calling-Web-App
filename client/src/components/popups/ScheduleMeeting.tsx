import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { CheckCheck, Copy, Router } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

type Props = {};

const ScheduleMeeting = (props: Props) => {
  const [checked, setChecked] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
  const [description, setDescription] = useState("");
  const { user, isLoaded } = useUser();
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call>();
  const [link, setLink] = useState("");
  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    // Set Pakistan time (UTC+5)
    now.setHours(now.getHours() + 5);
    setCurrentDateTime(now);
  }, []);

  if (!user || !isLoaded || !client) {
    return <div>Loading...</div>;
  }

  const scheduleMeeting = async () => {
    if (user) {
      try {
        const id = crypto.randomUUID();
        const call = client.call("default", id);
        if (currentDateTime === null) return;
        if (currentDateTime !== null) {
          await call.getOrCreate({
            data: {
              starts_at: currentDateTime.toISOString(),
              custom: { description: description },
            },
          });
        }
        setCall(call);
        setLink(`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`);
      } catch (e) {
        toast.error("Something went wrong");
        console.log(e);
      }
    }
  };

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleDateChange = (date: Date | null) => {
    setCurrentDateTime(date);
  };

  const handleCopy = () => {
    if (link !== "") {
      navigator.clipboard.writeText(link);
      toast.success("Link Copied");
      router.push("/");
    }
  };
  return (
    <div className="w-96 mt-3">
      {link !== "" && (
        <div className="flex flex-col items-center gap-2">
          <p className=" text-theme-textInactive text-lg">Meeting Scheduled</p>
          <CheckCheck className=" text-theme-textActive" size={30} />
          <button
            onClick={handleCopy}
            className=" bg-theme-4 text-theme-textInactive py-2 px-3 border border-theme-3 rounded-lg hover:text-theme-textActive flex gap-2 justify-center items-center"
          >
            <Copy size={15}/>
            Copy link
          </button>
        </div>
      )}
      {link === "" && (
        <>
          <input
            type="checkbox"
            name="description"
            id="description"
            onChange={handleCheck}
          />
          <label htmlFor="description" className="text-theme-textInactive ml-5">
            Add description
          </label>
          <br />
          {checked && (
            <textarea
              name=""
              id=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-3 rounded-lg border border-theme-3 bg-theme-2 text-theme-textInactive p-2 outline-none"
            ></textarea>
          )}
          <br />
          <label htmlFor="start-time" className="text-theme-textInactive">
            Start time
          </label>

          <DatePicker
            selected={currentDateTime}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            className="ml-5 max-w-[200px] mt-2 rounded-lg border border-theme-3 bg-theme-2 text-theme-textInactive p-2 outline-none"
          />
          <br />
          <button
            onClick={scheduleMeeting}
            className="px-3 py-2 rounded-lg mt-3 border border-theme-3 bg-theme-dark text-theme-textInactive hover:text-theme-textActive"
          >
            Schedule meeting
          </button>
        </>
      )}
    </div>
  );
};

export default ScheduleMeeting;
