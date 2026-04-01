import React from 'react';
import { ShieldCheck, Users, Globe } from 'lucide-react';
import aboutImage from '../assets/project/pefka/095.jpg';

const About: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative h-[60vh] flex items-center justify-center bg-zinc-900 text-white overflow-hidden">
       
        <div className="relative z-10 text-center px-4">
          <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-[0.4em] mb-4">
            Η Ιστορία μας
          </h4>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase">
            Κληρονομιά Ακεραιότητας
          </h1>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-[4/5]">
              <img
                src={aboutImage}
                className="w-full h-full object-cover"
                alt="Construction site"
              />
              <div className="absolute -bottom-10 -right-10 bg-zinc-900 text-white p-10 hidden md:block">
                <div className="text-4xl font-display font-bold">1998</div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-400">
                  ΙΔΡΥΣΗ ΣΤΗΝ ΘΕΣΣΑΛΟΝΙΚΗ
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-display font-bold text-zinc-900 mb-8 tracking-tight uppercase">
                Δύο δεκαετίες αρχιτεκτονικής πρωτοπορίας.
              </h2>

              <div className="space-y-6 text-zinc-600 leading-relaxed text-lg">
                <p>
                  Η εταιρεία Bauart Architect ξεκίνησε με μια απλή αποστολή: να γεφυρώσει το
                  χάσμα μεταξύ της αρχιτεκτονικής φαντασίας και της στατικής πραγματικότητας.
                  Ιδρύθηκε το 1998 και ξεκίνησε ως μια μικρή εταιρεία συμβούλων, εξελισσόμενη
                  σε μια πολυεθνική κατασκευαστική δύναμη.
                </p>

                <p>
                  Σήμερα, είμαστε ο προτιμώμενος συνεργάτης για επενδυτές που απαιτούν το
                  αδύνατο. Η προσέγγισή μας συνδυάζει την παραδοσιακή δεξιοτεχνία με την
                  τεχνολογία αιχμής, διασφαλίζοντας ότι κάθε κατασκευή είναι χτισμένη για
                  αντοχή στο χρόνο και βιωσιμότητα.
                </p>

                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div className="flex items-start space-x-3">
                    <ShieldCheck className="w-6 h-6 text-zinc-900 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-zinc-900 uppercase text-xs tracking-widest mb-1">
                        Απαράμιλλη Ασφάλεια
                      </h4>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-[0.4em] mb-4">
              Οι Αξίες μας
            </h4>
            <h2 className="text-4xl font-display font-bold text-zinc-900 tracking-tight uppercase">
              Τι μας καθορίζει
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Παγκόσμια Προοπτική',
                icon: Globe,
                desc: 'Δραστηριοποιούμαστε σε 4 ηπείρους με βαθιά κατανόηση των τοπικών κανονισμών και αισθητικής.',
              },
              {
                title: 'Συνεργασία',
                icon: Users,
                desc: 'Πιστεύουμε ότι οι καλύτερες κατασκευές χτίζονται μέσω διαφανούς συνεργασίας μεταξύ πελάτη, αρχιτέκτονα και μηχανικού.',
              },
              {
                title: 'Βιώσιμο Μέλλον',
                icon: ShieldCheck,
                desc: 'Δέσμευση σε πρακτικές κατασκευής με ουδέτερο ισοζύγιο άνθρακα και βιώσιμη προμήθεια υλικών.',
              },
            ].map((val, idx) => (
              <div
                key={idx}
                className="bg-white p-12 shadow-sm border-t-4 border-zinc-900 text-center"
              >
                <val.icon className="w-10 h-10 mx-auto mb-6 text-zinc-900" />
                <h3 className="text-xl font-display font-bold text-zinc-900 mb-4">
                  {val.title}
                </h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners / Certifications */}
      <section className="py-24 bg-zinc-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"></div>
      </section>
    </div>
  );
};

export default About;