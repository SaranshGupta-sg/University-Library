import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";

const Page = () => {
  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-10"
      >
        <Button className="bg-[#E7C9A5] text-[#16191E] hover:bg-[#E7C9A5] inline-flex min-h-14 items-center justify-center rounded-md px-6 py-2 font-bold text-base cursor-pointer">Logout</Button>
      </form>

      <BookList title="Borrowed Books" books={sampleBooks} />
    </>
  );
};
export default Page;