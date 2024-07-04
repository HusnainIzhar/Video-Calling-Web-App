"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useGetCallById } from "@/hooks/UseGetCallById";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className=" text-theme-textInactive xl:min-w-32">{title}:</h1>
      <h1 className="truncate text-semibold text-theme-textActive max-sm:max-w-[320px]">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [clicked, setClicked] = useState(false);

  const meetingId = user?.id;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;
    setClicked(true);
    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className="flex size-full flex-col gap-10 text-white p-5">
      <h1 className="text-xl font-semibold text-theme-textInactive">
        Personal Meeting Room
      </h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <button
          className="flex items-center gap-1 marker:hover:text-theme-textActive bg-theme-4 text-theme-textInactive py-2 px-4 border border-theme-3 rounded-lg"
          onClick={startRoom}
        >
          {clicked && <Loader2 size={15} className="animate-spin" />}
          Start Meeting
        </button>
        <button
          disabled={clicked}
          className="  bg-theme-dark text-theme-textInactive hover:text-theme-textActive py-2 px-4 border border-theme-3 rounded-lg flex gap-2"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link Copied");
          }}
        >
          Copy Invitation
        </button>
      </div>
    </section>
  );
};

export default PersonalRoom;
