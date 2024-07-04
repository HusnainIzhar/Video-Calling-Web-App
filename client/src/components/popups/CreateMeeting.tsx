"use client";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Copy, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {};

const CreateMeeting: React.FC<Props> = () => {
  const [checked, setChecked] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const client = useStreamVideoClient();
  const [isNotInstant, setIsNotInstant] = useState(false);
  const [link, setLink] = useState("");
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, router]);

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValues({ ...values, description: e.target.value });
  };

  const handleNewMeeting = async () => {
    if (!client || !user) return;
    try {
      setClicked(true);
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      const startDate =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";
      if (!call) throw new Error("Failed to create call!");
      await call.getOrCreate({
        data: {
          starts_at: startDate,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
        toast.success("Meeting Created");
      } else {
        setLink(`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`);
        setIsNotInstant(true);
        toast.success("Meeting Created");
      }
    } catch (e) {
      console.log(e);
      toast.error("Failed to create meeting");
    }
  };

  if (!user) return null;

  return !isNotInstant ? (
    <div className="w-96 mt-3">
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
          name="description"
          id="description"
          className="w-full mt-3 rounded-lg border border-theme-3 bg-theme-2 text-theme-textInactive p-2 outline-none"
          onChange={handleDescriptionChange}
        ></textarea>
      )}
      <br />
      <button
        onClick={handleNewMeeting}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg mt-3 border border-theme-3 bg-theme-dark text-theme-textInactive hover:text-theme-textActive`}
        disabled={clicked}
      >
        {clicked && <Loader2 className="animate-spin" />} Create meeting
      </button>
    </div>
  ) : (
    <div className="w-96 mt-3">
      <input
        type="text"
        className=" mt-3 w-full rounded-lg border border-theme-3 bg-theme-2 p-2 outline-none text-theme-textInactive"
     value={link}
     />
      <br />
      <div  className="flex items-center gap-5">
      <Link href={link} className="px-3 py-2 rounded-lg mt-3 border border-theme-3 bg-theme-dark text-theme-textInactive hover:text-theme-textActive">
        Join meeting
      </Link>
      <button onClick={()=> {navigator.clipboard.writeText(link);toast.success("Link Copied")
      }} className=" flex items-center gap-1 px-3 py-2 rounded-lg mt-3 border border-theme-3 text-theme-textInactive hover:text-theme-textActive"><Copy size={15}/> Copy link</button>
      </div></div>
  );
};

export default CreateMeeting;
