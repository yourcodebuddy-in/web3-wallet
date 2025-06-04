import Link from "next/link";
import IconGithub from "./icons/github";
import { Button } from "./ui/button";

function GithubButton() {
  return (
    <Button variant="outline" asChild>
      <Link href="https://github.com/yourcodebuddy-in/web3-wallet" target="_blank">
        <IconGithub className="dark:invert" /> View on GitHub
      </Link>
    </Button>
  );
}

export default GithubButton;
