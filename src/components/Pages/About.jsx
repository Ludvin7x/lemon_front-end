import React, { useState } from "react";
import { Leaf, Medal, Users } from "phosphor-react";
import Unsplash from "../api/images/getImage";

const About = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageError, setImageError] = useState(null);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-yellow-400 dark:bg-yellow-500 text-gray-900 dark:text-gray-900 text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to <span className="text-white dark:text-gray-900">Lemon</span>
        </h1>
        <p className="text-xl max-w-xl mx-auto">
          Fresh. Zesty. An unforgettable dining experience.
        </p>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-colors">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Elegant restaurant"
              className="w-full h-auto object-cover"
            />
          ) : imageError ? (
            <div className="text-red-600 text-center p-6">Image failed to load.</div>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 text-center p-6">Loading image...</div>
          )}
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl font-semibold">Our Story</h2>
          <p className="text-lg leading-relaxed">
            Born from a passion for vibrant flavors, Lemon marries the zest of the
            Mediterranean with contemporary culinary artistry. Every plate is a
            celebration of seasonal ingredients, thoughtfully curated by chefs
            who believe food should be both nourishing and exciting.
          </p>
          <p className="text-lg leading-relaxed">
            Whether you’re in the mood for a quick bite at lunch or a relaxed
            dinner with friends, Lemon’s warm ambiance and attentive service
            await you.
          </p>
        </div>
      </section>

      {/* Unsplash Fetcher */}
      <Unsplash
        query="restaurant"
        onSuccess={(url) => setImageUrl(url)}
        onError={(err) => setImageError(err)}
      />

      {/* Values Section */}
      <section className="bg-gray-900 dark:bg-gray-800 text-yellow-400 dark:text-yellow-300 py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {[{
            icon: <Leaf size={48} weight="fill" />,
            title: "Sustainability",
            desc: "Locally‑sourced produce, ethically raised meats.",
          }, {
            icon: <Medal size={48} weight="fill" />,
            title: "Quality",
            desc: "Hand‑selected ingredients, cooked to perfection.",
          }, {
            icon: <Users size={48} weight="fill" />,
            title: "Community",
            desc: "A welcoming space that feels like home.",
          }].map(({ icon, title, desc }, idx) => (
            <div key={idx} className="bg-gray-800 dark:bg-gray-700 p-8 rounded-lg shadow-lg flex flex-col items-center space-y-4 transition-colors">
              <div className="text-yellow-400 dark:text-yellow-300">{icon}</div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-gray-300 dark:text-gray-200">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-500 dark:text-gray-400 text-sm bg-gray-100 dark:bg-gray-900">
        Created by Ludvin F.
      </footer>
    </div>
  );
};

export default About;