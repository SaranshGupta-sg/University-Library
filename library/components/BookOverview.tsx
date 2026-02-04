import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BookCover from "@/components/BookCover";

interface Props extends Book {
  userId: string;
}

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  id,
  userId,
}: Props) => {
  return (
    <section className="flex flex-col-reverse items-center gap-12 sm:gap-32 xl:flex-row xl:gap-8">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>

        <div className="mt-7 flex flex-row flex-wrap gap-4 text-xl text-light-100">
          <p>
            By <span className="font-semibold text-blue-600">{author}</span>
          </p>

          <p>
            Category{" "}
            <span className="font-semibold text-blue-400">{genre}</span>
          </p>

          <div className="flex flex-row gap-1"> 
            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-4 mt-1">
          <p>
            Total Books <span>{totalCopies}</span>
          </p>

          <p>
            Available Books <span>{availableCopies}</span>
          </p>
        </div>

        <p className="mt-2 text-justify text-xl text-light-100">{description}</p>

        <Button className="mt-4 min-h-14 w-fit bg-[#e7c9a5] text-dark-100 hover:bg-[#e7c9a5]/80 max-md:w-full">
        <Image src="/icons/book.svg" alt="book" width={20} height={20}/>
        <p className="font-bold text-xl">Borrow Book</p>
        </Button>
      </div>

      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />

          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
