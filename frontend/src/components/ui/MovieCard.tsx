"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    posterUrl: string;
    releaseDate: string;
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="relative aspect-[2/3] rounded-lg overflow-hidden group cursor-pointer"
    >
      <Link href={`/movies/${movie.id}`} passHref>
        <Image
          src={movie.posterUrl}
          alt={`Poster for the movie "${movie.title}"`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold truncate">{movie.title}</h3>
            <p className="text-gray-200 text-sm">{movie.releaseDate}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}