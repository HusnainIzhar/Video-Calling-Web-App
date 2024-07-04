"use client";

import React, { FC, useEffect, useState } from "react";
import {
  CallingState,
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Mic, MicOff, Video, VideoOff } from "lucide-react";
import Link from "next/link";
import Loader from "./Loader";

type Props = {
  setupCompleted: () => void;
};

const MeetingSetup: FC<Props> = ({ setupCompleted }) => {
  const [mic, setMic] = useState(false);
  const [cam, setCam] = useState(false);
  const { useCallEndedAt } = useCallStateHooks();
  const callEndedAt = useCallEndedAt();
  const callHasEnded = !!callEndedAt;
  const call = useCall();
  const isInFuture =
    call?.state.startsAt && new Date(call.state.startsAt) > new Date();

  useEffect(() => {
    if (call) {
      if (mic) {
        call.microphone.enable();
      } else {
        call.microphone.disable();
      }
      if (cam) {
        call.camera.enable();
      } else {
        call.camera.disable();
      }
    }
  }, [mic, cam, call]);

  if (callHasEnded)
    return <MeetingEndedScreen message="This meeting has been ended" />;
  if (isInFuture)
    return <MeetingEndedScreen message="This meeting is not started yet" />;

  const handleClick = () => {
    if (call) {
      call.join();
      setupCompleted();
    } else {
      throw new Error("useCall must be called within a Stream context");
    }
  };

  if (!call) {
    return <Loader/>
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-theme-textInactive">
      <h1 className="text-2xl font-bold">Setup</h1>
      <div className="w-full max-w-screen-md h-1/2 border border-theme-3 flex justify-center items-center rounded-lg overflow-hidden">
        <VideoPreview />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-5">
          <div
            className="hover:cursor-pointer p-2 rounded-full bg-theme-4"
            onClick={() => setMic(!mic)}
          >
            {mic ? <Mic className="text-theme-textActive" /> : <MicOff />}
          </div>
          <div
            className="hover:cursor-pointer p-2 rounded-full bg-theme-4"
            onClick={() => setCam(!cam)}
          >
            {cam ? <Video className="text-theme-textActive" /> : <VideoOff />}
          </div>
          <DeviceSettings/>
        </div>
        <div className="flex justify-center items-center gap-5">
          <button
            onClick={handleClick}
            className="px-3 py-2 rounded-lg mt-3 border border-theme-3 bg-theme-4 text-theme-textInactive hover:text-theme-textActive"
          >
            Join Meeting
          </button>
          <Link
            className="px-3 py-2 rounded-lg mt-3 border border-theme-3  text-theme-textInactive hover:text-theme-textActive"
            href={"/"}
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeetingSetup;

function MeetingEndedScreen({ message }: { message: string }) {
  return (
    <div className=" h-screen  flex flex-col items-center justify-center gap-6 w-full ">
      <p className="font-bold text-theme-textInactive">{message}</p>
      <Link
        className=" text-theme-textInactive hover:text-theme-textActive bg-theme-4 p-2 rounded-lg border border-theme-3"
        href={"/"}
      >
        Go Home
      </Link>
    </div>
  );
}
