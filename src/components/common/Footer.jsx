import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaGithub, FaYoutube, FaInstagram } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import config from '../../config/env';

// Navigation link configuration
const NAV_LINKS = {
  quick: [
    { title: "Student", url: config.careerUrl, external: true },
    { title: "Institute", url: config.campusUrl, external: true },
    { title: "Organization", url: config.hireUrl, external: true },
  ],
  company: [
    { title: "About", url: "/about", external: false },
    { title: "News", url: "/news", external: false },
    { title: "Jobs", url: "/jobs", external: false },
  ],
  legal: [
    { title: "Privacy Policy", url: "/privacy-policy", external: false },
    { title: "Terms of Service", url: "/terms-service", external: false },
    { title: "Cookie Policy", url: "/cookie-policy", external: false },
  ]
};

// Social media links
const SOCIAL_LINKS = [
  { Icon: FaTwitter, color: "hover:text-[#1DA1F2]", url: "https://twitter.com/premacai" },
  { Icon: FaLinkedin, color: "hover:text-[#0A66C2]", url: "https://linkedin.com/company/premacai" },
  { Icon: FaGithub, color: "hover:text-gray-300", url: "https://github.com/premacai" },
  { Icon: FaYoutube, color: "hover:text-[#FF0000]", url: "https://youtube.com/premacai" },
  { Icon: FaInstagram, color: "hover:text-[#E1306C]", url: "https://instagram.com/premacai" },
];

// Additional footer links
const FOOTER_LINKS = [
  { title: "Accessibility", url: "/accessibility", external: false },
  { title: "Security", url: "/security", external: false },
  { title: "Status", url: "/status", external: false },
];

// Reusable LinkList component with proper navigation handling
const LinkList = ({ title, links }) => (
  <div className="space-y-4">
    <h4 className="text-gray-200 font-semibold text-sm uppercase tracking-wider">
      {title}
    </h4>
    <ul className="space-y-3">
      {links.map((link, index) => (
        <li key={`${title.toLowerCase()}-${index}`}>
          {link.external ? (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-400 text-sm transition-colors flex items-center group"
            >
              {link.title}
              <FiArrowUpRight className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ) : (
            <Link
              to={link.url}
              className="text-gray-400 hover:text-emerald-400 text-sm transition-colors flex items-center group"
            >
              {link.title}
              <FiArrowUpRight className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                PremacAI
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Pioneering the next generation of talent solutions with our integrated AI platform.
              Revolutionize recruitment, education, and career development through cutting-edge automation.
            </p>
          </div>

          {/* Navigation Links */}
          <LinkList title="Platforms" links={NAV_LINKS.quick} />
          <LinkList title="Company" links={NAV_LINKS.company} />
          <LinkList title="Legal" links={NAV_LINKS.legal} />
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <div className="text-gray-500 text-center md:text-left">
              © {currentYear} PremacAI. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map(({ Icon, color, url }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${color} transition-colors`}
                  aria-label={`Visit our ${Icon.name.replace('Fa', '')} page`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Additional Links */}
            <nav className="flex space-x-6">
              {FOOTER_LINKS.map((link, index) => (
                link.external ? (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.title}
                  </a>
                ) : (
                  <Link
                    key={index}
                    to={link.url}
                    className="text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.title}
                  </Link>
                )
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;