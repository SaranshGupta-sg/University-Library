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
  <li className="flex justify-center">
    {/* card wrapper */}
    <div className="w-40 xs:w-52 flex flex-col items-center">
      <Link href={`/books/${id}`} className="flex flex-col items-center w-full">
        <BookCover coverColor={color} coverImage={cover} />

        <div className="mt-4 w-full text-center xs:max-w-40 max-w-28">
          <p className="mt-2 line-clamp-1 text-base font-semibold text-white xs:text-xl">
            {title}
          </p>
          <p className="mt-1 line-clamp-1 text-sm italic text-light-100 xs:text-base">
            {genre}
          </p>
        </div>

        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="flex items-center gap-2 max-xs:justify-center">
              <Image
                src="/icons/calendar.svg"
                alt="calendar"
                width={18}
                height={18}
              />
              <p className="text-white">11 days left to return</p>
            </div>

            <Button className="bg-black mt-3 min-h-14 w-full font-sans text-base text-[#E7C9A5] cursor-pointer">
              Download receipt
            </Button>
          </div>
        )}
      </Link>
    </div>
  </li>
);

export default BookCard;
