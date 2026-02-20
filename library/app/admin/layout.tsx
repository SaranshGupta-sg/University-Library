import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  return (
    <main className="flex min-h-screen w-full flex-row text-black">
      <Sidebar session={session} />

      <div className="flex w-[calc(100%-264px)] flex-1 flex-col bg-[#F8F8FF] p-5 sm:p-10">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
};
export default Layout;