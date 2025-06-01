import React from "react";

function importSlides() {
  const slides = [];
  for (let i = 1; i <= 23; i++) {
    slides.push(`/img/slider/Diapositiva${i}.jpg`);
  }
  return slides;
}

const boxes = [
  {
    image: '/img/ensalada.jpg',
    title: "Ensaladas Frescas",
    text: "Variedad de ensaladas frescas y saludables para disfrutar en cualquier momento del día.",
  },
  {
    image: '/img/food_carne.jpg',
    title: "Opciones de Carne",
    text: "Deliciosas selecciones de carnes para los amantes de los sabores intensos.",
  },
  {
    image: '/img/lugar.jpg',
    title: "Ambiente Acogedor",
    text: "Un lugar acogedor diseñado para disfrutar momentos especiales.",
  },
];

const HomePage = () => {
  const images = importSlides();

  return (
    <div className="homepage container py-4">
      {/* Carrusel Bootstrap */}
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
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
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>

      {/* Tarjetas de contenido */}
      <div className="row mt-5 g-4">
        {boxes.map(({ image, title, text }, idx) => (
          <div key={idx} className="col-md-4">
            <div className="card h-100 shadow-sm">
              <img src={image} className="card-img-top" alt={title} style={{ height: '200px', objectFit: 'cover' }} />
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