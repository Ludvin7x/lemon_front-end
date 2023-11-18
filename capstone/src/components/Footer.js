import React from "react"
import "./Footer.css"
import facebookIcon from "../img/icono_facebook.png"
import whatsappIcon from "../img/icono_whatsapp.png"


const Footer = () => {
    return(
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
    )
}

export default Footer;