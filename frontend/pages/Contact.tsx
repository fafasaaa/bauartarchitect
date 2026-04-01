import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const API_URL = 'http://localhost:4000/api/contact';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Κατασκευή Κατοικιών');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverMsg, setServerMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setServerMsg('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject: category, message }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setServerMsg(data.message);
        setName(''); setEmail(''); setCategory('Κατασκευή Κατοικιών'); setMessage('');
      } else {
        setStatus('error');
        setServerMsg(Array.isArray(data.errors) ? data.errors.join(' ') : data.message || 'Κάτι πήγε στραβά.');
      }
    } catch {
      setStatus('error');
      setServerMsg('Δεν ήταν δυνατή η σύνδεση. Δοκιμάστε ξανά ή γράψτε απευθείας στο bauart@otenet.gr');
    }
  }

  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Λεωφόρος+Παπανικολάου+16,+Πεύκα,+Θεσσαλονίκη';

  return (
    <div className="pt-20 bg-white">
      <section className="bg-zinc-900 text-white py-24 text-center">
        <h4 className="text-zinc-400 text-xs font-bold uppercase tracking-[0.4em] mb-4">Επικοινωνηστε Μαζι Μας</h4>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">Ξεκινήστε το Έργο σας</h1>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            <div>
              <h2 className="text-3xl font-display font-bold text-zinc-900 mb-8 tracking-tight">Υποβολή Αιτήματος Προσφοράς</h2>

              {status === 'success' && (
                <div className="mb-6 flex items-start gap-3 bg-green-50 border border-green-200 p-4">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-green-800 text-sm uppercase tracking-wider mb-1">Το μήνυμα στάλθηκε!</p>
                    <p className="text-green-700 text-sm">{serverMsg}</p>
                    <button onClick={() => setStatus('idle')} className="mt-2 text-xs font-bold text-green-700 underline uppercase tracking-widest">
                      Νέο μήνυμα
                    </button>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 p-4">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-red-800 text-sm uppercase tracking-wider mb-1">Σφάλμα αποστολής</p>
                    <p className="text-red-700 text-sm">{serverMsg}</p>
                  </div>
                </div>
              )}

              {status !== 'success' && (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-2">Ονοματεπωνυμο</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full px-6 py-4 bg-zinc-50 border-none focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                        placeholder="π.χ. Ιωάννης Παπαδόπουλος"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-2">Διευθυνση Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-6 py-4 bg-zinc-50 border-none focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                        placeholder="info@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-2">Κατηγορια Εργου</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full px-6 py-4 bg-zinc-50 border-none focus:ring-2 focus:ring-zinc-900 outline-none transition-all appearance-none"
                    >
                      <option>Κατασκευή Κατοικιών</option>
                      <option>Εμπορικό</option>
                      <option>Φιλοξενία</option>
                      <option>Ανακαίνιση</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-2">Συντομη Περιγραφη Εργου</label>
                    <textarea
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      className="w-full px-6 py-4 bg-zinc-50 border-none focus:ring-2 focus:ring-zinc-900 outline-none transition-all h-32"
                      placeholder="Περιγράψτε μας το όραμά σας..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-5 bg-zinc-900 text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-800 disabled:bg-zinc-400 transition-colors flex items-center justify-center space-x-3"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                        <span>ΑΠΟΣΤΟΛΗ...</span>
                      </>
                    ) : (
                      <>
                        <span>ΑΠΟΣΤΟΛΗ ΜΗΝΥΜΑΤΟΣ</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-zinc-900 mb-8 tracking-tight">Τα Κεντρικά μας</h2>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="p-4 bg-zinc-50 rounded-full">
                      <MapPin className="w-6 h-6 text-zinc-900" />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 uppercase text-xs tracking-widest mb-1">Τοποθεσία Γραφείου</h4>
                      <p className="text-zinc-600">ΛΕΩΦΌΡΟΣ ΠΑΠΑΝΙΚΟΛΆΟΥ 16 ΠΈΥΚΑ</p>
                      <p className="text-zinc-600">ΘΕΣΣΑΛΟΝΊΚΗΣ</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-4 bg-zinc-50 rounded-full">
                      <Phone className="w-6 h-6 text-zinc-900" />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 uppercase text-xs tracking-widest mb-1">Τηλέφωνο Επικοινωνίας</h4>
                      <p className="text-zinc-600">+30 6972008903</p>
                      <p className="text-zinc-600">+30 6972742398</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="p-4 bg-zinc-50 rounded-full">
                      <Mail className="w-6 h-6 text-zinc-900" />
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 uppercase text-xs tracking-widest mb-1">Email Επικοινωνίας</h4>
                      <p className="text-zinc-600">bauart@otenet.gr</p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-video w-full grayscale shadow-xl overflow-hidden block hover:grayscale-0 transition-all duration-500"
              >
                <img
                  src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000"
                  className="w-full h-full object-cover"
                  alt="Map"
                />
                <div className="absolute inset-0 bg-zinc-900/10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-zinc-900 text-white font-bold text-xs uppercase tracking-widest animate-pulse cursor-pointer">
                  ΤΟΠΟΘΕΣΙΑ ΓΡΑΦΕΙΟΥ
                </div>
              </a>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;