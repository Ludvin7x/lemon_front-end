import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomePage.css';

// Importar las 10 imágenes
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

import BoxImage1 from "../../img/ensalada.jpg"
import BoxImage2 from "../../img/food_carne.jpg"
import BoxImage3 from "../../img/lugar.jpg"
import facebookIcon from "../../img/icono_facebook.png"
import whatsappIcon from "../../img/icono_whatsapp.png"


const HomePage = () => {
  const images = [
    { id: 1, path: Slide1 },
    { id: 2, path: Slide2 },
    { id: 3, path: Slide3 },
    { id: 4, path: Slide4 },
    { id: 5, path: Slide5 },
    { id: 6, path: Slide6 },
    { id: 7, path: Slide7 },
    { id: 8, path: Slide8 },
    { id: 9, path: Slide9 },
    { id: 10, path: Slide10 },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true, // Centrar las diapositivas
  };

  return (
    <div className="homepage">
      <Slider {...sliderSettings}>
        {images.map((image) => (
          <div key={image.id} className="slide-container">
            <img src={image.path} alt={`Slide ${image.id}`} className="slide-image" />
          </div>
        ))}
      </Slider>

      <div className="row">
        {/* Primer cuadro */}
        <div className="box">
          <img src={BoxImage1} alt="Box 1" className="box-image" />
          <h3>Ensaladas Frescas</h3>
          <p>
            Variedad de ensaladas frescas y saludables para disfrutar en cualquier momento del día.
            Descubre opciones deliciosas y nutritivas para tu alimentación diaria.
          </p>
        </div>
        {/* Segundo cuadro */}
        <div className="box">
          <img src={BoxImage2} alt="Box 2" className="box-image" />
          <h3>Opciones de Carne</h3>
          <p>
            Deliciosas selecciones de carnes para los amantes de los sabores intensos y la calidad en cada bocado.
            Disfruta de platos preparados con los mejores ingredientes.
          </p>
        </div>
        {/* Tercer cuadro */}
        <div className="box">
          <img src={BoxImage3} alt="Box 3" className="box-image" />
          <h3>Ambiente Acogedor</h3>
          <p>
            Un lugar acogedor diseñado para disfrutar momentos especiales y compartir experiencias inolvidables.
            Sumérgete en un espacio único que te brinda comodidad y calidez.
          </p>
        </div>
      </div>

      <div className="footer">
        <p>Little Lemon &copy; {new Date().getFullYear()} Todos los derechos reservados</p>
        <div className="social-links">
          <a href="link-de-facebook">
            <img src={facebookIcon} alt="Facebook" />
          </a>
          <a href="link-de-whatsapp">
            <img src={whatsappIcon} alt="WhatsApp" />
          </a>
        </div>
      </div>
    </div>
  );
}
export default HomePage;