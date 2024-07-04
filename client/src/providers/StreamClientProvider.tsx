"use client";
import { tokenProvider } from "@/actions/Stream.action";
import { useUser } from "@clerk/nextjs";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { FC, ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY;

type Props = {
  children: ReactNode;
};
const MyApp: FC<Props> = ({ children }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!apiKey) throw new Error("Api key from Stream is missing");
    let streamUser: User;

    if (user && user.id) {
      streamUser = {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      };
    } else {
      const id = crypto.randomUUID();
      streamUser = {
        id: id,
        type: "guest",
        name: `Guest ${id}`,
      };
    }

    const client = new StreamVideoClient({
      apiKey,
      user: streamUser,
      tokenProvider: user && user.id ? tokenProvider : undefined,
    });
    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="mx-auto animate-spin text-theme-3" />
      </div>
    );
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default MyApp;
