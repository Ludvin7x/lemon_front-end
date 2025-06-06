import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";

function importSlides() {
  const slides = [];
  for (let i = 1; i <= 23; i++) {
    slides.push(`/img/Slider/Diapositiva${i}.jpg`);
  }
  return slides;
}

const boxes = [
  {
    image: "/img/ensalada.jpg",
    title: "Ensaladas Frescas",
    text: "Variedad de ensaladas frescas y saludables para disfrutar en cualquier momento del día.",
  },
  {
    image: "/img/food_carne.jpg",
    title: "Opciones de Carne",
    text: "Deliciosas selecciones de carnes para los amantes de los sabores intensos.",
  },
  {
    image: "/img/lugar.jpg",
    title: "Ambiente Acogedor",
    text: "Un lugar acogedor diseñado para disfrutar momentos especiales.",
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
  const [[current, direction], setCurrent] = useState([0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(([prev]) => [(prev + 1) % images.length, 1]);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => {
    setCurrent(([prev]) => [
      prev === 0 ? images.length - 1 : prev - 1,
      -1,
    ]);
  };

  const nextSlide = () => {
    setCurrent(([prev]) => [(prev + 1) % images.length, 1]);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Carrusel con swipe y animaciones */}
      <div
        {...handlers}
        className="relative w-full h-[500px] overflow-hidden rounded-3xl shadow-xl mb-10 select-none touch-none bg-gray-100 dark:bg-gray-900"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={current}
            src={images[current]}
            alt={`Slide ${current + 1}`}
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

        {/* Flecha izquierda */}
        <button
          onClick={prevSlide}
          aria-label="Anterior"
          className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black bg-opacity-40 p-3 text-white shadow-lg hover:bg-opacity-70 transition"
        >
          <CaretLeft size={28} weight="bold" />
        </button>

        {/* Flecha derecha */}
        <button
          onClick={nextSlide}
          aria-label="Siguiente"
          className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black bg-opacity-40 p-3 text-white shadow-lg hover:bg-opacity-70 transition"
        >
          <CaretRight size={28} weight="bold" />
        </button>

        {/* Indicadores de puntos */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent([idx, idx > current ? 1 : -1])}
              aria-label={`Ir a la diapositiva ${idx + 1}`}
              className={`h-4 w-4 rounded-full transition-colors duration-300 ${
                idx === current ? "bg-white" : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tarjetas con shadcn UI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {boxes.map(({ image, title, text }, idx) => (
          <Card
            key={idx}
            className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-800"
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