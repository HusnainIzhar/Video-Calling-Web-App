"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY;
const apiSecret = process.env.NEXT_PUBLIC_STREAM_SECRET;

export const tokenProvider = async () => {
  const user = await currentUser();
  if (!apiKey) throw new Error("Stream Api is missing");
  if (!apiSecret) throw new Error("Stream Secret key is missing");

  const client = new StreamClient(apiKey, apiSecret);
  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issued = Math.floor(Date.now() / 1000) - 60;
  if (user) {
    const token = client.createToken(user?.id, exp, issued);
    return token;
  }
  throw new Error("Unable to generate token");
};
