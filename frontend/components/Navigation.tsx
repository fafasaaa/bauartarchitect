import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Building2 } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const solidNav = scrolled || !isHome; // ✅ white nav on non-home pages OR when scrolled

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Αρχική', path: '/' },
    { name: 'Εταιρεία', path: '/about' },
    { name: 'Υπηρεσίες', path: '/services' },
    { name: 'Έργα', path: '/projects' },
    { name: 'Επικοινωνία', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        solidNav ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <Building2 className={`w-8 h-8 transition-colors ${solidNav ? 'text-zinc-900' : 'text-white'}`} />
            <span
              className={`text-xl md:text-2xl font-display font-bold tracking-tighter transition-colors ${
                solidNav ? 'text-zinc-900' : 'text-white'
              }`}
            >
              Bauart Architect
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] font-medium tracking-widest uppercase transition-colors hover:opacity-100 ${
                  location.pathname === link.path
                    ? solidNav
                      ? 'text-zinc-900'
                      : 'text-white'
                    : solidNav
                      ? 'text-zinc-500 hover:text-zinc-900'
                      : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/contact"
              className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                solidNav
                  ? 'bg-zinc-900 text-white hover:bg-zinc-800'
                  : 'bg-white text-zinc-900 hover:bg-zinc-200'
              }`}
            >
              Ζητηστε Προσφορα
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className={`${solidNav ? 'text-zinc-900' : 'text-white'}`}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-zinc-900 border-b border-zinc-100 uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 px-6 py-4 bg-zinc-900 text-white font-bold uppercase tracking-widest"
            >
              Ζητήστε Προσφορά
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;