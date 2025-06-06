import GithubButton from "@/components/github-button";
import DarkModeToggle from "@/components/layout/dark-mode-toggle";
import ActiveWalletProvider from "@/components/layout/providers/active-wallet-provider";
import ReactQueryProvider from "@/components/layout/providers/react-query-provider";
import { WalletSessionProvider } from "@/components/layout/providers/wallet-session-provider";
import { ThemeProvider } from "@/components/layout/theme-provider";
import ResetButton from "@/components/reset-button";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Web3 Wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, inter.className, "antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ReactQueryProvider>
            <WalletSessionProvider>
              <ActiveWalletProvider>{children}</ActiveWalletProvider>
            </WalletSessionProvider>
          </ReactQueryProvider>
          <Toaster />
          <div className="absolute top-4 right-4 flex flex-wrap gap-3">
            <ResetButton />
            <DarkModeToggle />
            <GithubButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
