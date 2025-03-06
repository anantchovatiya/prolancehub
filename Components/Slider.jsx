"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
    const cards = [
        { id: 1, title: "Web Development", img: "/1.jpg" },
        { id: 2, title: "Graphic Design", img: "/2.jpg" },
        { id: 3, title: "Digital Marketing", img: "/3.jpg" },
        { id: 4, title: "Content Writing", img: "/4.jpg" },
        { id: 5, title: "Video Editing", img: "/5.jpg" },
        { id: 6, title: "UI/UX Design", img: "/6.jpg" },
        { id: 7, title: "Mobile App Development", img: "/7.jpg" },
        { id: 8, title: "SEO Optimization", img: "/8.jpg" },
        { id: 9, title: "Cybersecurity", img: "/9.jpg" },
        { id: 10, title: "Data Science", img: "/10.jpg" },
        { id: 11, title: "Virtual Assistance", img: "/11.jpg" },
        { id: 12, title: "Blockchain Development", img: "/12.jpg" }
    ];





    return (
        <div className="w-full mx-auto p-6">
    <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={5}  // Default to 1 for better mobile UX
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
            0: { slidesPerView: 1 },   // For small screens (phones)
            768: { slidesPerView: 3 },   // For tablets
            1024: { slidesPerView: 4 },  // For laptops
            1280: { slidesPerView: 5 },  // Large screens
        }}
        className="w-full"
    >
        <style jsx>{`
            :global(.swiper-button-next),
            :global(.swiper-button-prev) {
                color: #2563eb !important; /* Tailwind Blue-500 */
            }
            :global(.swiper-pagination) {
                position: relative;
                margin-top: 10px;
            }
            @media (max-width: 640px) {
                :global(.swiper-button-next),
                :global(.swiper-button-prev) {
                    display: none; /* Hide navigation on small screens */
                }
            }
        `}</style>

        {cards.map((card) => (
            <SwiperSlide key={card.id}>
                <div className="bg-slate-300 shadow-lg rounded-xl overflow-hidden">
                    <img src={card.img} alt={card.title} className="w-full h-60 object-cover" loading="lazy" />
                    <div className="p-4 text-center">
                        <h2 className="text-lg font-semibold">{card.title}</h2>
                    </div>
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
</div>

    );
};

export default Slider;
