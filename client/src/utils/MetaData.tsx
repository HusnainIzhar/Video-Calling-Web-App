import React, { FC } from "react";

interface MetaProps {
  title: string;
  description: string;
}

export const MetaData: FC<MetaProps> = ({ title, description }) => {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
};