import { ZoomInOnScroll } from '../animations/ZoomInOnScroll';
import SocialMediaIcon from './SocialMediaIcon';
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function SocialMediaIcons({ containerClass = "", iconClass = "" }) {
  return (
    <div className={containerClass}>
      <ZoomInOnScroll duration={.8}>
        <SocialMediaIcon href="https://www.facebook.com" ariaLabel="Facebook">
          <FaFacebook className={iconClass} />
        </SocialMediaIcon>
      </ZoomInOnScroll>
      <ZoomInOnScroll duration={.8} delay={.3}>
        <SocialMediaIcon href="https://www.whatsapp.com" ariaLabel="Whatsapp">
          <FaWhatsapp className={iconClass} />
        </SocialMediaIcon>
      </ZoomInOnScroll>
      <ZoomInOnScroll duration={.8} delay={.6}>
        <SocialMediaIcon href="https://www.instagram.com" ariaLabel="Instagram">
          <FaInstagram className={iconClass} />
        </SocialMediaIcon>
      </ZoomInOnScroll>
    </div>
  );
}