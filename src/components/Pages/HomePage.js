import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Slide1 from '../../img/Slider/Diapositiva1.JPG';
import Slide2 from '../../img/Slider/Diapositiva2.JPG';
import Slide3 from '../../img/Slider/Diapositiva3.JPG';
import Slide4 from '../../img/Slider/Diapositiva4.JPG';
import Slide5 from '../../img/Slider/Diapositiva5.JPG';
import Slide6 from '../../img/Slider/Diapositiva6.JPG';
import Slide7 from '../../img/Slider/Diapositiva7.JPG';
import Slide8 from '../../img/Slider/Diapositiva8.JPG';
import Slide9 from '../../img/Slider/Diapositiva9.JPG';
import Slide10 from '../../img/Slider/Diapositiva10.JPG';

import BoxImage1 from "../../img/ensalada.jpg";
import BoxImage2 from "../../img/food_carne.jpg";
import BoxImage3 from "../../img/lugar.jpg";

const HomePage = () => {
  const images = [
    Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10
  ];

  const boxes = [
    {
      image: BoxImage1,
      title: "Ensaladas Frescas",
      text: "Variedad de ensaladas frescas y saludables para disfrutar en cualquier momento del día. Descubre opciones deliciosas y nutritivas para tu alimentación diaria.",
    },
    {
      image: BoxImage2,
      title: "Opciones de Carne",
      text: "Deliciosas selecciones de carnes para los amantes de los sabores intensos y la calidad en cada bocado. Disfruta de platos preparados con los mejores ingredientes.",
    },
    {
      image: BoxImage3,
      title: "Ambiente Acogedor",
      text: "Un lugar acogedor diseñado para disfrutar momentos especiales y compartir experiencias inolvidables. Sumérgete en un espacio único que te brinda comodidad y calidez.",
    },
  ];

  return (
    <div className="homepage container py-4">
      {/* Bootstrap Carousel */}
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{ maxHeight: '500px' }}>
        <div className="carousel-indicators">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={idx}
              className={idx === 0 ? 'active' : ''}
              aria-current={idx === 0 ? 'true' : undefined}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
        <div className="carousel-inner">
          {images.map((img, idx) => (
            <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
              <img
                src={img}
                className="d-block w-100"
                alt={`Slide ${idx + 1}`}
                style={{ objectFit: 'cover', maxHeight: '500px' }}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* Boxes */}
      <div className="row mt-5 g-4">
        {boxes.map(({ image, title, text }, idx) => (
          <div key={idx} className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img
                src={image}
                className="card-img-top"
                alt={title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{title}</h5>
                <p className="card-text flex-grow-1">{text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;