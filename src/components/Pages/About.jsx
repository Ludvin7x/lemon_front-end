import React, { useState } from "react";
import { Leaf, Medal, Users } from "phosphor-react";
import Unsplash from "../api/images/getImage";

const About = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageError, setImageError] = useState(null);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-yellow-400 text-gray-900 text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to <span className="text-white">Lemon</span>
        </h1>
        <p className="text-xl max-w-xl mx-auto">
          Fresh. Zesty. An unforgettable dining experience.
        </p>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Elegant restaurant"
              className="w-full h-auto object-cover"
            />
          ) : imageError ? (
            <div className="text-red-600 text-center">Image failed to load.</div>
          ) : (
            <div className="text-gray-500 text-center">Loading image...</div>
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

      {/* Unsplash fetcher (invisible) */}
      <Unsplash
        query="restaurant"
        onSuccess={(url) => setImageUrl(url)}
        onError={(err) => setImageError(err)}
      />

      {/* Values Section */}
      <section className="bg-gray-900 text-yellow-400 py-16 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center space-y-4">
            <Leaf size={48} weight="fill" />
            <h3 className="text-xl font-semibold">Sustainability</h3>
            <p className="text-gray-300">
              Locally‑sourced produce, ethically raised meats.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center space-y-4">
            <Medal size={48} weight="fill" />
            <h3 className="text-xl font-semibold">Quality</h3>
            <p className="text-gray-300">
              Hand‑selected ingredients, cooked to perfection.
            </p>
          </div>
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center space-y-4">
            <Users size={48} weight="fill" />
            <h3 className="text-xl font-semibold">Community</h3>
            <p className="text-gray-300">
              A welcoming space that feels like home.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-500 text-sm bg-gray-100">
        Created by Ludvin F.
      </footer>
    </div>
  );
};

export default About;