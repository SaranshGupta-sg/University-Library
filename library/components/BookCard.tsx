import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import BookCover from "@/components/BookCover";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const BookCard = ({
  id,
  title,
  genre,
  color,
  cover,
  isLoanedBook = false,
}: Book) => (
  <li className={cn(isLoanedBook && "sm:w-52 w-full")}>
    <Link
      href={`/books/${id}`}
      className={cn(isLoanedBook && "w-full flex flex-col items-center")}
    >
      <BookCover coverColor={color} coverImage={cover} />

      <div className={cn("mt-4", !isLoanedBook && "sm:max-w-40 max-w-28")}>
        <p className="mt-2 line-clamp-1 text-base font-semibold text-white sm:text-xl">
          {title}
        </p>
        <p className="mt-1 line-clamp-1 text-sm italic text-light-100 sm:text-base">
          {genre}
        </p>
      </div>

      {isLoanedBook && (
        <div className="mt-3 w-full">
          <div className="flex items-center gap-2 max-sm:justify-center">
            <Image
              src="/icons/calendar.svg"
              alt="calendar"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-white">11 days left to return</p>
          </div>

          <Button className="bg-black mt-3 min-h-14 w-full font-sans text-base text-[#E7C9A5] cursor-pointer">
            Download receipt
          </Button>
        </div>
      )}
    </Link>
  </li>
);

export default BookCard;
