import clsx from "clsx";
import React, { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
  className?: string;
}

const Page = ({ children, className }: PageProps) => {
  return <div className={clsx("max-w-[1920px] relative mx-auto px-8 md:px-16 lg:px-[10%]", className)}>{children}</div>;
};

export default Page;
