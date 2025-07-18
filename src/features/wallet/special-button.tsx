"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  title: string;
  mobileTitle?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "secondary";
  className?: string;
}

function SpecialButton({ title, mobileTitle, icon, onClick, variant = "default", className }: Props) {
  return (
    <div className="flex w-full flex-col items-center">
      <Button
        type="button"
        size="lg"
        className={cn(
          "max-xs:p-0 xs:h-11 xs:w-full xs:rounded-lg xs:[&_svg]:hidden h-14 w-14 rounded-full border",
          className
        )}
        onClick={onClick}
        variant={variant}
      >
        {icon}
        <span className="xs:mt-0 xs:block xs:text-base mt-1 hidden text-xs font-semibold">{title}</span>
      </Button>
      <span className="text-primary xs:hidden mt-1 text-xs font-semibold">{mobileTitle ?? title}</span>
    </div>
  );
}

export default SpecialButton;
