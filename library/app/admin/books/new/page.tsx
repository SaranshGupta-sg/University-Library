import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import BookForm from "@/components/admin/forms/BookForm";

const Page = () => {
  return (
    <>
      <Button asChild className="mb-10 w-fit border border-[#F8F8FF] bg-white text-xs font-medium text-[#3A354E] hover:bg-[#F8F8FF]">
        <Link href="/admin/books">Go Back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        {/* <BookForm /> */}
      </section>
    </>
  );
};
export default Page;