import { Home } from "@/components/home";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies();
  const hasOnboarded = cookieStore.get("hasOnboarded")?.value === "true";

  return (
    <main className="bg-secondary">
      <div className="container">
        <Home hasOnboarded={hasOnboarded} />
      </div>
    </main>
  );
}
