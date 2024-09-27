import FooterAppGoogle from '../assets/footerStores.png';
import FooterSocialMedias from '../assets/fb-ins-tw-logo.webp';

const Footer = () => {
  return (
    <div className="py-6 bg-gray-100">
      <div className="container px-10 mx-auto">
        <div className="flex justify-around">
          <div>
            <h3 className="text-lg font-semibold">POPULAR LOCATIONS</h3>
            <ul className="mt-2 text-sm text-gray-500">
              <li>Kolkata</li>
              <li>Mumbai</li>
              <li>Chennai</li>
              <li>Pune</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">TRENDING LOCATIONS</h3>
            <ul className="mt-2 text-sm text-gray-500">
              <li>Bhubaneshwar</li>
              <li>Hyderabad</li>
              <li>Chandigarh</li>
              <li>Nashik</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">ABOUT US</h3>
            <ul className="mt-2 text-sm text-gray-500">
              <li>Tech@OLX</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">OLX</h3>
            <ul className="mt-2 text-sm text-gray-500">
              <li>Blog</li>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
              <li>Vulnerability Disclosure Program</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">FOLLOW US</h3>
            <ul className="flex space-x-4">
              <li>
                <img src={FooterSocialMedias} alt="Social Media" className="w-20 h-20" /> 
              </li>
            </ul>
            <div className="flex space-x-4">
              <a href="#" className="flex items-center">
                <img src={FooterAppGoogle} alt="Google Play" className="w-20 h-auto" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-4 text-sm text-center text-gray-500">
          All rights reserved © 2006-2024 OLX
        </div>
      </div>
    </div>
  );
};

export default Footer;
