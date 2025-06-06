"use client";
import { removeOnboardingCookie } from "@/utils/onboarding";
import { RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";

function ResetButton() {
  function handleClick() {
    removeOnboardingCookie();
    localStorage.clear();
    window.location.reload();
  }

  return (
    <Button className="aspect-square p-0" title="Reset" onClick={handleClick}>
      <RefreshCcw />
    </Button>
  );
}

export default ResetButton;
