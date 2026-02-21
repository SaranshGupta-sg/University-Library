import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookForm from "@/components/admin/forms/BookForm";
import { ArrowLeft } from "lucide-react";


const Page = () => {
  return (
    <>
      <Button
  asChild
  className="mb-8 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900"
>
  <Link href="/admin/books">
    <ArrowLeft size={16} />
    Go Back
  </Link>
</Button>

      <section className="w-full max-w-2xl">
        <BookForm />
      </section>
    </>
  );
};
export default Page;