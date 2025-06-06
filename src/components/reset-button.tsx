"use client";
import { removeOnboardingCookies } from "@/utils/onboarding";
import { RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";

function ResetButton() {
  function handleClick() {
    removeOnboardingCookies();
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
