import React, { useEffect, useMemo, useState } from 'react';
import { PROJECTS } from '../constants';
import { Project, ProjectCategory } from '../types';
import { MapPin, Calendar, User, Layout, ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'Όλα'>('Όλα');
  const [selectedProject, setSelectedProject] = useState<Project | null>(PROJECTS[0] ?? null);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const categoriesMap: Record<'All' | ProjectCategory, string> = {
    All: 'Όλα',
    Residential: 'Κατοικιες',
    Commercial: 'Εμπορικά',
    Hospitality: 'Φιλοξενία',
    Renovation : 'Ανακαίνισεις',
    Public : 'Δημοσια',
    'Urban Design': 'Αστικός Σχεδιασμός', 
    
  };

  const categories: Array<ProjectCategory | 'Όλα'> = ['Όλα', 'Residential', 'Commercial', 'Hospitality', 'Renovation'];

  const filteredProjects = useMemo(() => {
    return filter === 'Όλα' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  // Helper: current image src (safe)
  const currentImageSrc =
    selectedProject?.images?.[activeImageIndex] ?? selectedProject?.images?.[0] ?? '';

  // If filter changes and the selected project is no longer visible, select the first from filtered list
  useEffect(() => {
    if (!selectedProject) return;

    const stillVisible = filter === 'Όλα' ? true : selectedProject.category === filter;

    if (!stillVisible) {
      const next = filteredProjects[0] ?? null;
      setSelectedProject(next);
      setActiveImageIndex(0);
      setLightboxOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, filteredProjects]);

  // If selected project changes, reset gallery state (prevents out-of-range index)
  useEffect(() => {
    setActiveImageIndex(0);
    setLightboxOpen(false);
  }, [selectedProject?.id]);

  // Keep active index valid if images length changes
  useEffect(() => {
    const len = selectedProject?.images?.length ?? 0;
    if (!len) return;
    if (activeImageIndex > len - 1) setActiveImageIndex(0);
  }, [activeImageIndex, selectedProject?.images?.length]);

  // Keyboard controls for lightbox
  useEffect(() => {
    if (!lightboxOpen || !selectedProject) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);

      const len = selectedProject.images?.length ?? 0;
      if (len > 1) {
        if (e.key === 'ArrowLeft') {
          setActiveImageIndex((i) => (i - 1 + len) % len);
        }
        if (e.key === 'ArrowRight') {
          setActiveImageIndex((i) => (i + 1) % len);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen, selectedProject]);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
    setLightboxOpen(false);

    const el = document.getElementById('project-detail');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const hasSelected = Boolean(selectedProject);

  return (
    <div className="pt-20 bg-zinc-50 min-h-screen">
      <section className="bg-zinc-900 text-white py-24 text-center">
        <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-[0.4em] mb-4">Portfolio</h4>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">Εμβληματική Αρχιτεκτονική</h1>
      </section>

      {/* Filters */}
      <div className="sticky top-16 z-40 bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-8 py-6 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold whitespace-nowrap transition-colors ${
                  filter === cat ? 'text-zinc-900 border-b-2 border-zinc-900 pb-1' : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                {cat === 'Όλα' ? categoriesMap.All : categoriesMap[cat]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                onClick={() => openProject(project)}
              >
                {/* ✅ ΑΦΑΙΡΕΘΗΚΕ grayscale */}
                <div className="aspect-[3/2] overflow-hidden transition-all duration-700 bg-zinc-100">
                  {project.images?.[0] ? (
                    <img
                      src={project.images[0]}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={project.title}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs">No image</div>
                  )}
                </div>

                <div className="p-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-2">
                        {categoriesMap[project.category]}
                      </div>
                      <h3 className="text-2xl font-display font-bold text-zinc-900 tracking-tight group-hover:text-zinc-600 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <ArrowUpRight className="w-6 h-6 text-zinc-300 group-hover:text-zinc-900 transition-colors" />
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-zinc-500">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail */}
      {hasSelected && selectedProject && (
        <section id="project-detail" className="py-24 bg-white border-t border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2">
                {/* Main image (click to open lightbox) */}
                <div
                  className="w-full aspect-video overflow-hidden shadow-2xl cursor-zoom-in bg-zinc-100 mb-6"
                  onClick={() => currentImageSrc && setLightboxOpen(true)}
                  role="button"
                  aria-label="Open gallery"
                >
                  {currentImageSrc ? (
                    // ✅ ΑΦΑΙΡΕΘΗΚΕ grayscale
                    <img
                      src={currentImageSrc}
                      className="w-full h-full object-cover transition-all duration-500"
                      alt={selectedProject.title}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm">No image</div>
                  )}
                </div>

                {/* Thumbnails */}
                {(selectedProject.images?.length ?? 0) > 1 && (
                  <div className="mb-12 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    {selectedProject.images.map((src, idx) => (
                      <button
                        key={src + idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`shrink-0 w-24 h-16 overflow-hidden border transition-all ${
                          idx === activeImageIndex ? 'border-zinc-900' : 'border-zinc-200 hover:border-zinc-400'
                        }`}
                        aria-label={`Select image ${idx + 1}`}
                        type="button"
                      >
                        <img src={src} className="w-full h-full object-cover" alt="" />
                      </button>
                    ))}
                  </div>
                )}

                <h2 className="text-4xl font-display font-bold text-zinc-900 mb-8">{selectedProject.title}</h2>

                <p className="text-zinc-600 text-lg leading-relaxed mb-8">
                  {selectedProject.description}{' '}
                  Χρησιμοποιήσαμε σκυρόδεμα υψηλής αντοχής και ειδικά σχεδιασμένα χαλύβδινα πλαίσια για να διασφαλίσουμε τη
                  στατική διάρκεια, διατηρώντας παράλληλα την αισθητική ακεραιότητα του αρχικού αρχιτεκτονικού οράματος.
                </p>

                <p className="text-zinc-600 text-lg leading-relaxed">
                  Η ομάδα μας διαχειρίστηκε κάθε φάση του έργου, από την αρχική προετοιμασία του εργοταξίου και τις
                  εκτιμήσεις περιβαλλοντικών επιπτώσεων έως τα τελικά εσωτερικά φινιρίσματα. Το αποτέλεσμα είναι μια δομή
                  που χρησιμεύει όχι μόνο ως λειτουργικός χώρος αλλά ως μαρτυρία των σύγχρονων δυνατοτήτων της μηχανικής.
                </p>
              </div>

              <div className="space-y-12 bg-zinc-50 p-12">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 mb-4 flex items-center">
                    <MapPin className="w-3 h-3 mr-2" /> Τοποθεσία
                  </h4>
                  <div className="text-zinc-900 font-medium">{selectedProject.location}</div>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 mb-4 flex items-center">
                    <Calendar className="w-3 h-3 mr-2" /> Έτος Ολοκλήρωσης
                  </h4>
                  <div className="text-zinc-900 font-medium">{selectedProject.year}</div>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 mb-4 flex items-center">
                    <User className="w-3 h-3 mr-2" /> Πελάτης
                  </h4>
                  <div className="text-zinc-900 font-medium">{selectedProject.client}</div>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400 mb-4 flex items-center">
                    <Layout className="w-3 h-3 mr-2" /> Αντικείμενο Εργασιών
                  </h4>
                  <div className="text-zinc-900 font-medium">{selectedProject.scope}</div>
                </div>

                <button className="w-full py-5 bg-zinc-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-zinc-800 transition-colors">
                  ΚΑΤΕΒΑΣΤΕ ΤΟ PDF ΤΟΥ ΕΡΓΟΥ
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      {selectedProject && lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-12 right-0 text-white/90 hover:text-white"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close"
              type="button"
            >
              <X className="w-7 h-7" />
            </button>

            <div className="relative bg-black">
              <img src={currentImageSrc} className="w-full max-h-[80vh] object-contain" alt={selectedProject.title} />

              {(selectedProject.images?.length ?? 0) > 1 && (
                <>
                  <button
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                    onClick={() => {
                      const len = selectedProject.images.length;
                      setActiveImageIndex((i) => (i - 1 + len) % len);
                    }}
                    aria-label="Previous"
                    type="button"
                  >
                    <ChevronLeft className="w-10 h-10" />
                  </button>

                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
                    onClick={() => {
                      const len = selectedProject.images.length;
                      setActiveImageIndex((i) => (i + 1) % len);
                    }}
                    aria-label="Next"
                    type="button"
                  >
                    <ChevronRight className="w-10 h-10" />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox thumbs */}
            {(selectedProject.images?.length ?? 0) > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {selectedProject.images.map((src, idx) => (
                  <button
                    key={src + idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`shrink-0 w-24 h-16 overflow-hidden border ${
                      idx === activeImageIndex ? 'border-white' : 'border-white/30 hover:border-white/60'
                    }`}
                    type="button"
                    aria-label={`Go to image ${idx + 1}`}
                  >
                    <img src={src} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;