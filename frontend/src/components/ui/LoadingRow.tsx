"use client";

export default function LoadingRow() {
    return (
        <div className="px-6 md:px-12 lg:px-24 space-y-4">
        <div className="h-6 w-48 bg-gray-800 rounded animate-pulse" />
        <div className="flex gap-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex-none w-[200px] md:w-[240px] h-[360px] bg-gray-800 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }