"use client";
import { useGetCalls } from "@/hooks/UseGetCalls";
import { Call, CallRecording, useCall } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import {
  ArrowBigLeftDash,
  CalendarMinus,
  CalendarPlus,
  Video,
  Play,
  Forward,
  Copy
} from "lucide-react";
import { toast } from "react-toastify";
import Loader from "./Loader";

type Props = {
  type: "ended" | "upcoming" | "recording";
};

const CallList: FC<Props> = ({ type }) => {
  const call = useCall();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    if (type === "ended") {
      return endedCalls;
    }
    if (type === "recording") {
      return recordings;
    }
    if (type === "upcoming") {
      return upcomingCalls;
    } else {
      return [];
    }
  };

  const getNoCalls = () => {
    if (type === "ended") {
      return "No Previous Calls";
    }
    if (type === "recording") {
      return "No Recordings";
    }
    if (type === "upcoming") {
      return "No Upcoming Calls";
    } else {
      return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
    };

    if (type === "recording") {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  console.log("recording is ", recordings);
  const calls = getCalls();
  const noCalls = getNoCalls();
  if (isLoading) return <Loader/>;
  return (
    <div className="flex gap-5 flex-wrap justify-center pb-24">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === "ended" ? (
                <CalendarMinus />
              ) : type === "upcoming" ? (
                <CalendarPlus />
              ) : (
                <Video />
              )
            }
            title={
              type === "recording"
                ? (meeting as CallRecording).filename?.substring(0, 20)
                : (meeting as Call).state?.custom?.description ||
                  "No Description"
            }
            time={
              type === "recording"
                ? (meeting as CallRecording).start_time
                : (meeting as Call).state.startsAt?.toLocaleString()
            }
            previous={type === "ended"}
            button1Text={
              type === "recording"
                ? "Play"
                : type === "upcoming"
                ? "Start"
                : undefined
            }
            handleButton1={
              type === "recording"
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
            btn1Icon={type === "recording" ? <Play /> : undefined}
            button2Text={
              type === "recording"
                ? "Share"
                : type === "upcoming"
                ? "Copy"
                : undefined
            }
            handleButton2={
              type === "recording"
                ? () => {
                    navigator.clipboard.writeText(
                      (meeting as CallRecording).url
                    );
                    toast.success("Link Copied to be Shared");
                  }
                : () => {
                    navigator.clipboard.writeText(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                        (meeting as Call).id
                      }`
                    );
                    toast.success("Link Copied");
                  }
            }
            btn2Icon={
              type === "recording" ? (
                <Forward />
              ) : type === "upcoming" ? (
                <Copy />
              ) : undefined
            }
          />
        ))
      ) : (
        <h1 className="text-theme-textInactive">{noCalls}</h1>
      )}
    </div>
  );
};

export default CallList;
