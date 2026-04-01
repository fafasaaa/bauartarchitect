import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, PlayCircle } from 'lucide-react';
import { PROJECTS, STATS, SERVICES } from '../constants';

const Home: React.FC = () => {
  const [activeStat, setActiveStat] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % STATS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-zinc-900">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
         <video
  className="w-full h-full object-cover opacity-[0.42] transition-all duration-1000"
  src="/video/video1.mp4"
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
/>
 
          {/* Cinematic overlay for better typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          {/* Title with subtle haze */}
          <h1 className="text-6xl md:text-8xl font-semibold tracking-tight text-white/30">
  Bauart <br /> Architect.
</h1>

          <p className="max-w-2xl mx-auto mt-6 text-base md:text-lg text-white/70 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            Building Tomorrow&apos;s Landmarks Today.
            <br />
            Bauart delivers innovative construction solutions with precision, quality and trust.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center px-8 py-3 border border-white/30 text-white/85 bg-white/5 backdrop-blur-md hover:bg-white/10 transition"
            >
              ΔΕΙΤΕ ΤΟ PORTFOLIO <ArrowRight className="ml-3 w-4 h-4" />
            </Link>

            
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50">
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
          <span className="text-[10px] uppercase tracking-widest text-white">Scroll</span>
        </div>
      </section>

      {/* Intro & Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-[0.4em] mb-4">
                Προδιαγραφές Ποιότητας
              </h4>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-zinc-900 mb-8 leading-tight">
                Χτίζοντας το μέλλον <br /> σε θεμέλια εμπιστοσύνης.
              </h2>
              <p className="text-zinc-600 text-lg leading-relaxed mb-8">
                Η Bauart Architect είναι μια κορυφαία κατασκευαστική εταιρεία που ειδικεύεται σε σύνθετα οικιστικά,
                εμπορικά και τουριστικά έργα. Με μια κληρονομιά που ξεπερνά τις δύο δεκαετίες, έχουμε εξελιχθεί σε
                σύμβολο αρχιτεκτονικής φιλοδοξίας και αξιοπιστίας.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-zinc-900 hover:translate-x-2 transition-transform"
              >
                Η Ιστορία μας <ChevronRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-px bg-zinc-200 p-px shadow-2xl">
              {STATS.map((stat, idx) => (
                <div key={idx} className="bg-white p-12 text-center group hover:bg-zinc-50 transition-colors">
                  <div className="text-4xl md:text-5xl font-display font-bold text-zinc-900 mb-2">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-[0.4em] mb-4">Βασικες Ικανοτητες</h4>
              <h2 className="text-4xl font-display font-bold tracking-tight text-zinc-900">
                Πολυδιάστατη Εμπειρία. <br /> Ενιαίο Όραμα.
              </h2>
            </div>
            <Link
              to="/services"
              className="px-8 py-4 border-2 border-zinc-900 text-xs font-bold uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all"
            >
              Όλες οι Υπηρεσίες
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="group relative overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 h-[400px]"
              >
                <div className="absolute inset-0">
                  <img
                    src={service.imageUrl}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 "
                    alt={service.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-white text-xl font-display font-bold mb-3 transform group-hover:-translate-y-2 transition-transform duration-500">
                    {service.title}
                  </h3>
                  <p className="text-zinc-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                    {service.description}
                  </p>
                  <Link
                    to="/services"
                    className="text-white text-[10px] uppercase tracking-widest font-bold inline-flex items-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                  >
                    ΜΑΘΕΤΕ ΠΕΡΙΣΣΟΤΕΡΑ <ArrowRight className="ml-2 w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-[0.4em] mb-4">Επιλεγμενα Εργα</h4>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Εμβληματικό Portfolio</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800">
            {PROJECTS.filter((p) => p.featured).map((project) => (
              <div key={project.id} className="relative group overflow-hidden aspect-[3/4]">
                <img
                  src={project.imageUrl}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={project.title}
                />
                <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <div className="text-xs uppercase tracking-widest text-zinc-400 mb-2">
                    {project.category === 'Commercial'
                      ? 'Εμπορικό'
                      : project.category === 'Residential'
                      ? 'Οικιστικό'
                      : 'Φιλοξενία'}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">{project.title}</h3>
                  <div className="text-sm text-zinc-300 mb-8">{project.location}</div>
                  <Link
                    to={`/projects`}
                    className="w-full py-4 border border-white text-[10px] uppercase tracking-[0.3em] font-bold text-center hover:bg-white hover:text-zinc-900 transition-colors"
                  >
                    ΕΞΕΡΕΥΝΗΣΤΕ ΤΟ ΕΡΓΟ
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/projects"
              className="text-zinc-400 hover:text-white transition-colors uppercase tracking-[0.3em] text-xs font-bold inline-flex items-center"
            >
              ΔΕΙΤΕ ΟΛΑ ΤΑ ΕΡΓΑ <ArrowRight className="ml-3 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      

      {/* Final CTA */}
      <section className="relative py-32 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 tracking-tighter uppercase leading-tight">
            Είστε έτοιμοι να χτίσετε <br /> το μέλλον μαζί μας;
          </h2>
          <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
            Επικοινωνήστε με τους συμβούλους μηχανικούς μας σήμερα για να συζητήσουμε το επόμενο έργο σας.
          </p>
          <Link
            to="/contact"
            className="inline-block px-12 py-6 bg-white text-zinc-900 font-bold uppercase tracking-[0.2em] text-sm hover:bg-zinc-200 transition-colors"
          >
            ΞΕΚΙΝΗΣΤΕ ΜΙΑ ΣΥΖΗΤΗΣΗ
          </Link>
        </div>
      </section>          
    </div>
  );
};

export default Home;
