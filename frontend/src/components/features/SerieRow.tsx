'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import SerieCard from '../ui/SerieCard';

interface SerieRowProps {
  title: string;
  series: any[];
}

export default function SerieRow({ title, series }: SerieRowProps) {
  return (
    <div className="relative px-4 md:px-8 lg:px-16 xl:px-24 space-y-4">
      <h2 className="text-xl font-semibold px-2">{title}</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="relative"
      >
        {series.map((series) => (
          <SwiperSlide key={series.id}>
            <SerieCard serie={series} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}