"use client";
import React from 'react';

export default function SkeletonHero() {
  return (
    <div className="relative h-[85vh] w-full">
      <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      <div className="relative h-full flex flex-col justify-end px-6 pb-24 md:px-12 lg:px-24">
        <div className="max-w-2xl space-y-4">
          <div className="h-12 w-64 bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-48 bg-gray-700 rounded animate-pulse" />
          <div className="h-6 w-96 bg-gray-700 rounded animate-pulse" />
          <div className="flex gap-4 pt-4">
            <div className="h-12 w-32 bg-gray-700 rounded animate-pulse" />
            <div className="h-12 w-32 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}