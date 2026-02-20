import React from "react";

const page = () => {
  return (
    <main className="flex min-h-screen flex-1 flex-col bg-[url('/images/pattern.webp')] bg-cover bg-top px-5 sm:px-10 md:px-16 bg-[#16191E] items-center justify-center">
      <h1 className="font-sans text-5xl font-bold text-[#D6E0FF]">
        Whoa,Slow Down There, Speedy
      </h1>

      <p className="mt-3 max-w-xl text-center text-[#EDF1F1]">
        Looks like you&apos;ve been a little too eager. We&apos;ve put a
        temporary pause on your excitement. 🚦 Chill for a bit, and try again
        shortly
      </p>
    </main>
  );
};

export default page;
