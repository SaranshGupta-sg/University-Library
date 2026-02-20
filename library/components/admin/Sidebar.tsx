"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminSideBarLinks } from "@/constants";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { Menu, X } from "lucide-react";

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-start bg-white px-4 py-3 shadow-sm md:hidden">
        <button onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed z-50 top-0 left-0 h-screen w-60 bg-white px-5 py-8 shadow-lg transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0 md:static md:shadow-md"
        )}
      >
        {/* Close Button (Mobile Only) */}
        <div className="flex justify-end md:hidden mb-6">
          <button onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Desktop Logo */}
        <div className="hidden md:flex items-center gap-3 mb-10">
          <Image
            src="/icons/admin/logo.svg"
            alt="logo"
            height={35}
            width={35}
          />
          <h1 className="text-xl font-bold text-blue-700">
            BookWise
          </h1>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link
                href={link.route}
                key={link.route}
                onClick={() => setOpen(false)}
              >
                <div
                  className={cn(
                    "relative flex items-center gap-3 rounded-md px-4 py-2 transition-all duration-200 cursor-pointer",
                    isSelected
                      ? "bg-blue-50"
                      : "hover:bg-gray-100"
                  )}
                >
                  {/* Thin Active Line */}
                  {isSelected && (
                    <span className="absolute left-0 top-0 h-full w-0.75 bg-blue-700 rounded-r-sm" />
                  )}

                  <div className="relative h-5 w-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <p
                    className={cn(
                      "text-sm font-medium",
                      isSelected ? "text-blue-700" : "text-gray-700"
                    )}
                  >
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* User Section */}
        <div className="absolute bottom-6 left-5 right-5 flex items-center gap-3 border-t pt-4">
          <Avatar>
            <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
              {getInitials(session?.user?.name || "IN")}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <p className="text-sm font-semibold text-gray-800">
              {session?.user?.name}
            </p>
            <p className="text-xs text-gray-500">
              {session?.user?.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;