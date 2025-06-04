import React, { useState } from "react";
import { Leaf, Medal, Users } from "phosphor-react";
import Unsplash from "../api/images/getImage";

const About = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageError, setImageError] = useState(null);

  return (
    <div className="about-page bg-light min-h-screen d-flex flex-column text-dark">
      {/* Hero Section */}
      <section className="bg-warning text-dark text-center py-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">
            Welcome to <span className="text-white">Lemon</span>
          </h1>
          <p className="lead">
            Fresh. Zesty. An unforgettable dining experience.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="container py-5 flex-grow-1">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Elegant restaurant"
                className="img-fluid rounded-3 shadow-sm w-100"
              />
            ) : imageError ? (
              <div className="text-danger">Image failed to load.</div>
            ) : (
              <div className="text-muted">Loading image...</div>
            )}
          </div>
          <div className="col-md-6">
            <h2 className="h3 mb-3">Our Story</h2>
            <p className="fs-5">
              Born from a passion for vibrant flavors, Lemon marries the zest of the
              Mediterranean with contemporary culinary artistry. Every plate is a
              celebration of seasonal ingredients, thoughtfully curated by chefs
              who believe food should be both nourishing and exciting.
            </p>
            <p className="fs-5">
              Whether you’re in the mood for a quick bite at lunch or a relaxed
              dinner with friends, Lemon’s warm ambiance and attentive service
              await you.
            </p>
          </div>
        </div>
      </section>

      {/* Unsplash fetcher (invisible) */}
      <Unsplash
        query="restaurant"
        onSuccess={(url) => setImageUrl(url)}
        onError={(err) => setImageError(err)}
      />

      {/* Values Section */}
      <section className="bg-dark py-5 text-white">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="p-4 shadow-sm rounded-3 h-100">
                <Leaf size={48} className="mb-3 text-warning" />
                <h3 className="h5 mb-2">Sustainability</h3>
                <p className="mb-0">
                  Locally‑sourced produce, ethically raised meats.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-4 shadow-sm rounded-3 h-100">
                <Medal size={48} className="mb-3 text-warning" />
                <h3 className="h5 mb-2">Quality</h3>
                <p className="mb-0">
                  Hand‑selected ingredients, cooked to perfection.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-4 shadow-sm rounded-3 h-100">
                <Users size={48} className="mb-3 text-warning" />
                <h3 className="h5 mb-2">Community</h3>
                <p className="mb-0">
                  A welcoming space that feels like home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto text-center py-3 bg-light">
        <small className="text-muted">Created by Ludvin F.</small>
      </footer>
    </div>
  );
};

export default About;