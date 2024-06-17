import SocialMediaIcon from './SocialMediaIcon';
import { FaFacebook, FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function SocialMediaIcons({ containerClass = "", iconClass = ""}) {
  return (
    <div className={containerClass}>
        <SocialMediaIcon href="https://www.facebook.com" ariaLabel="Facebook">
            <FaFacebook className={iconClass} />
        </SocialMediaIcon>
        <SocialMediaIcon href="https://www.whatsapp.com" ariaLabel="Whatsapp">
            <FaWhatsapp className={iconClass} />
        </SocialMediaIcon>
        <SocialMediaIcon href="https://www.instagram.com" ariaLabel="Instagram">
            <FaInstagram className={iconClass} />
        </SocialMediaIcon>
    </div>
  );
}