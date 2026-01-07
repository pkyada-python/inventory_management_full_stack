import { Leaf, Phone, Mail, MapPin, Youtube } from "lucide-react";

const productLinks = [
  "Flowering Stimulant",
  "Plant Growth Regulator",
  "Bio Pesticides",
  "Organic Fertilizers",
  "Soil Conditioners",
  "Bio Fungicides",
];

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Awards", href: "#" },
  { label: "Contact", href: "#contact" },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold">
                  Redox Industries
                </span>
                <span className="block text-xs text-primary-foreground/70">
                  Limited
                </span>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed mb-6">
              Manufacturer and supplier of premium plant nutrients, pesticides,
              and bio products for organic farming since 2008.
            </p>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
            >
              <Youtube className="w-5 h-5 text-red-400" />
              <span className="text-sm font-medium">Watch on YouTube</span>
            </a>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-5">Our Products</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#products"
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <a
                  href="tel:08045802800"
                  className="text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  08045802800
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <a
                  href="mailto:info@redoxagro.com"
                  className="text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  info@redoxagro.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70">
                  Gujarat, India
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>
              © {new Date().getFullYear()} Redox Industries Limited. All Rights
              Reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Terms of Use
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
