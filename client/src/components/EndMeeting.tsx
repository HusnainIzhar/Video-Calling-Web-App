import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const EndMeeting = (props: Props) => {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const meetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;
  if (!meetingOwner) return null;


  return (
    <button
      className="bg-red-500 p-2 rounded-full text-white hover:font-semibold"
      onClick={async () => {
        await call.endCall();
        router.push("/");
      }}
    >
      EndMeeting
    </button>
  );
};

export default EndMeeting;
