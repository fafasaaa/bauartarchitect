import React from 'react';
import { SERVICES } from '../constants';
import { CheckCircle2 } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="bg-zinc-900 text-white py-24 text-center">
        <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-[0.4em] mb-4">
          Τι Κάνουμε
        </h4>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter uppercase">
          Ολοκληρωμένη Μηχανική
        </h1>
      </section>

      {SERVICES.map((service, idx) => (
        <section
          key={service.id}
          className={`py-24 ${idx % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              {/* Image */}
              <div className={`${idx % 2 !== 0 ? 'lg:order-last' : ''}`}>
                <div className="relative aspect-[4/4] overflow-hidden bg-zinc-100">
                  <img
                    src={String(service.imageUrl)}
                    alt={service.title}
                    className="relative aspect-[19/20] overflow-hidden bg-zinc-100"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Text */}
              <div>
                <h2 className="text-4xl font-display font-bold text-zinc-900 mb-8 tracking-tight uppercase">
                  {service.title}
                </h2>

                <p className="text-zinc-600 text-lg leading-relaxed mb-8">
                  {service.description}{' '}
                  Προσφέρουμε τεχνική αυστηρότητα και καινοτόμες λύσεις σε κάθε φάση του
                  κατασκευαστικού κύκλου.
                </p>

                <ul className="space-y-4 mb-12">
                  {[
                    'Διαχείριση πλήρους κύκλου ζωής έργου',
                    'Ενσωμάτωση βιώσιμων υλικών',
                    'Πιστοποίηση στατικής ακεραιότητας',
                    'Επίβλεψη ασφάλειας και συμμόρφωσης',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3 text-zinc-700">
                      <CheckCircle2 className="w-5 h-5 text-zinc-400" />
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-24 bg-zinc-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-display font-bold mb-8 uppercase">
            Λύσεις "Με το Κλειδί στο Χέρι"
          </h2>
          <p className="text-zinc-400 text-lg mb-12">
            Προσφέρουμε ολοκληρωμένα πακέτα σχεδιασμού και κατασκευής. Από το πρώτο
            σχέδιο μέχρι το τελευταίο τούβλο, η εταιρεία Bauart Architect διαχειρίζεται κάθε
            πολυπλοκότητα.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-zinc-800">
              <div className="text-zinc-500 font-bold mb-2">01</div>
              <div className="text-white font-bold uppercase text-xs tracking-widest">
                Σκοπιμότητα
              </div>
            </div>
            <div className="p-8 border border-zinc-800">
              <div className="text-zinc-500 font-bold mb-2">02</div>
              <div className="text-white font-bold uppercase text-xs tracking-widest">
                Εκτέλεση
              </div>
            </div>
            <div className="p-8 border border-zinc-800">
              <div className="text-zinc-500 font-bold mb-2">03</div>
              <div className="text-white font-bold uppercase text-xs tracking-widest">
                Παράδοση
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;