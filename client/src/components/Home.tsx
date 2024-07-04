"use client";
import { CassetteTape, Plus, UserRoundPlus, Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { DateTimeFormatOptions } from "intl";
import { useUser } from "@clerk/nextjs";
import CreateMeeting from "./popups/CreateMeeting";
import JoinMeeting from "./popups/JoinMeeting";
import ScheduleMeeting from "./popups/ScheduleMeeting";

type Props = {};

const Home = (props: Props) => {
  const today = new Date();
  const [alert, setAlert] = useState(false);
  const dateOptions: DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const timeOptions: DateTimeFormatOptions = {
    hour: "numeric", // 12-hour format
    minute: "numeric", // Minutes
    hour12: true, // Use 12-hour format (AM/PM)
    timeZone: "Asia/Karachi", // Time zone for Pakistan
  };

  const currentDate = today.toLocaleDateString("en-PK", dateOptions);
  const currentTime = today
    .toLocaleDateString("en-PK", timeOptions)
    .split(",")[1]
    .trim();

  const { isSignedIn } = useUser();
  return (
    <div className="flex-1 flex h-full px-5 mb-36">
      <section className="flex-1 flex flex-col items-center gap-5">
        <div className="w-full h-[303px] border border-theme-3 rounded-lg mt-5 bg-theme-2 flex">
          <div className="flex w-full sm:w-1/2 text-white  p-5 flex-col justify-center gap-5 h-full">
            <h2 className="text-3xl lg:text-5xl font-extralight  text-theme-textActive">
              Experience seamless video meetings with Chime.
            </h2>
            <p className="font-extralight text-theme-textActive">
              {" "}
              Connect, collaborate, and create without limits.
            </p>
          </div>
          <div className="hidden sm:flex w-1/2 text-theme-textActive  flex-col justify-center gap-5 items-center">
            <h3 className="text-5xl font-extralight">{currentTime}</h3>
            <h4 className="font-extralight">{currentDate}</h4>
          </div>
        </div>
        <div className="flex gap-5 flex-wrap justify-start w-full">
          {isSignedIn && (
            <Card
              icon={<Plus size={30} />}
              title="New Meeting"
              subtitle="Setup a new meeting"
              modalChild={<CreateMeeting />}
              modalHeading="Create Meeting"
            />
          )}
          <Card
            icon={<UserRoundPlus size={30} />}
            title="Join Meeting"
            subtitle="via invitation link"
            modalChild={<JoinMeeting />}
            modalHeading="Join Meeting"
          />
          {isSignedIn && (
            <>
              <Card
                icon={<Calendar size={30} />}
                title="Schedule Meeting"
                subtitle="Plan your meeting"
                modalChild={<ScheduleMeeting />}
                modalHeading="Schedule Meeting"
              />
              <Card
                icon={<CassetteTape size={30} />}
                title="View Recordings"
                subtitle="Meeting Recordings"
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
