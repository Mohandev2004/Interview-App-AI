"use client";

import Link from "next/link";
import ProfileInfoCard from "@/components/shared/profile-info-card";

export default function Navbar() {
  return (
    <>
      <div className="h-16 bg-white/30 border-b border-gray-200/50 backdrop-blur-md py-2.5 px-4 md:px-0 sticky top-0 z-30">
        <div className="container mx-auto flex items-center justify-between gap-5">
          <Link href="/dashboard">
            <h2 className="text-lg md:text-xl font-medium text-black leading-5 px-6">
              Interview Prep AI
            </h2>
          </Link>
          <ProfileInfoCard />
        </div>
      </div>
    </>
  );
}
