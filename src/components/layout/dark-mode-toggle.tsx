"use client";
import { Button } from "@/components/ui/button";
import { useIsClient } from "@uidotdev/usehooks";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

function DarkModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <Button
      className="aspect-square p-0"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}

export default DarkModeToggle;
