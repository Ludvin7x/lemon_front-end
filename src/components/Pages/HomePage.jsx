import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";

function importSlides() {
  const slides = [];
  for (let i = 1; i <= 15; i++) {
    slides.push(`/img/Slider/Diapositiva${i}.jpg`);
  }
  return slides;
}

const boxes = [
  {
    image: "/img/ensalada.jpg",
    title: "Fresh Salads",
    text: "A variety of fresh and healthy salads to enjoy any time of the day.",
  },
  {
    image: "/img/food_carne.jpg",
    title: "Meat Selections",
    text: "Delicious meat options for those who love rich flavors.",
  },
  {
    image: "/img/lugar.jpg",
    title: "Cozy Ambiance",
    text: "A welcoming place designed to enjoy special moments.",
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const HomePage = () => {
  const images = importSlides();
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(([prev]) => [(prev + 1) % images.length, 1]);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex(([prev]) => [
      prev === 0 ? images.length - 1 : prev - 1,
      -1,
    ]);
  };

  const nextSlide = () => {
    setCurrentIndex(([prev]) => [(prev + 1) % images.length, 1]);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Carousel with swipe and animations */}
      <div
        {...handlers}
        className="relative w-full h-[500px] overflow-hidden rounded-3xl shadow-xl mb-10 select-none touch-none bg-gray-100 dark:bg-gray-900"
        aria-label="Image carousel"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.7 }}
            className="absolute top-0 left-0 w-full h-full object-cover"
            loading="lazy"
            draggable={false}
          />
        </AnimatePresence>

        {/* Left arrow button */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black bg-opacity-40 p-3 text-white shadow-lg hover:bg-opacity-70 transition"
          type="button"
        >
          <CaretLeft size={28} weight="bold" />
        </button>

        {/* Right arrow button */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black bg-opacity-40 p-3 text-white shadow-lg hover:bg-opacity-70 transition"
          type="button"
        >
          <CaretRight size={28} weight="bold" />
        </button>

        {/* Pagination dots */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex([idx, idx > currentIndex ? 1 : -1])}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-4 w-4 rounded-full transition-colors duration-300 ${
                idx === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white"
              }`}
              type="button"
            />
          ))}
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {boxes.map(({ image, title, text }, idx) => (
          <Card
            key={idx}
            className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-800"
            tabIndex={0}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-52 object-cover"
              loading="lazy"
              draggable={false}
            />
            <CardContent className="p-6 space-y-3">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                {text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;