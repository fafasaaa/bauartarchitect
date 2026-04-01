
import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-white mb-6">
              <Building2 className="w-8 h-8" />
              <span className="text-xl font-display font-bold tracking-tighter">Bauart Architect</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Αριστεία στη μηχανική μέσω ακρίβειας και καινοτομίας. Χτίζουμε το μέλλον του αστικού τοπίου σε οικιστικούς, εμπορικούς και τουριστικούς τομείς.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Εξερευνηστε</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Αρχική</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Η Ιστορία μας</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Υπηρεσίες</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Έργα</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Καριέρα</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Ειδικοτητες</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/services" className="hover:text-white transition-colors">Πολυτελείς Κατοικίες</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Στατική Ενίσχυση</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Βιώσιμη Δόμηση</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-6">Επικοινωνια</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>ΛΕΩΦΌΡΟΣ ΠΑΠΑΝΙΚΟΛΆΟΥ 17 ΠΈΥΚΑ<br />ΘΕΣΣΑΛΟΝΊΚΗΣ</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+30 6972008903</span>
                <span>+30 6972742398</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>bauart@otenet.gr</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Bauart Architect CONSTRUCTION COMPANY. Με επιφύλαξη παντός δικαιώματος.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Πολιτική Απορρήτου</a>
            <a href="#" className="hover:text-white transition-colors">Όροι Χρήσης</a>
            <a href="#" className="hover:text-white transition-colors">Νομικά</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
