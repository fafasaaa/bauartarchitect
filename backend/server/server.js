import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 4000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
  ],
  methods: ['POST', 'GET'],
}));
app.use(express.json());

// ─── Gmail Transporter ────────────────────────────────────────────────────────
// Στέλνει μέσω bauart.website1@gmail.com → φτάνει στο bauart@otenet.gr
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bauart.website1@gmail.com',
    pass: 'jfwa udcb nbbv zsws',
  },
});

// ─── Validate ─────────────────────────────────────────────────────────────────
function validateContactForm(body) {
  const { name, email, message } = body;
  const errors = [];
  if (!name || name.trim().length < 2) errors.push('Το όνομα είναι υποχρεωτικό.');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Παρακαλώ εισάγετε έγκυρο email.');
  if (!message || message.trim().length < 10) errors.push('Το μήνυμα πρέπει να έχει τουλάχιστον 10 χαρακτήρες.');
  return errors;
}

// ─── Contact Route ────────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  const errors = validateContactForm(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Email προς το γραφείο
  const mailToOffice = {
    from: '"BAUART Website" <bauart.website1@gmail.com>',
    to: 'bauart@otenet.gr',
    replyTo: email,
    subject: `[Νέο Μήνυμα Website] ${subject || 'Επικοινωνία από το website'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9;">
        <div style="background: #111827; padding: 24px 32px;">
          <h1 style="color: #ffffff; font-size: 20px; margin: 0; letter-spacing: 1px;">BAUART ARCHITECT</h1>
          <p style="color: #9ca3af; margin: 4px 0 0; font-size: 13px;">Νέο μήνυμα από το website</p>
        </div>
        <div style="padding: 32px; background: #ffffff;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px; width: 140px;">Ονοματεπώνυμο</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${email}</td>
            </tr>
            ${subject ? `<tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 13px;">Κατηγορία Έργου</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${subject}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 14px 0; vertical-align: top; color: #6b7280; font-size: 13px;">Μήνυμα</td>
              <td style="padding: 14px 0; color: #111827; font-size: 14px; line-height: 1.7;">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
        </div>
        <div style="background: #f3f4f6; padding: 16px 32px; text-align: center;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">Στάλθηκε αυτόματα από τη φόρμα επικοινωνίας του bauart website</p>
        </div>
      </div>
    `,
  };

  // Αυτόματη απάντηση στον χρήστη
  const mailToSender = {
    from: '"BAUART Architect" <bauart.website1@gmail.com>',
    to: email,
    subject: 'Λάβαμε το μήνυμά σας — BAUART Architect',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #111827; padding: 24px 32px;">
          <h1 style="color: #ffffff; font-size: 20px; margin: 0; letter-spacing: 1px;">BAUART ARCHITECT</h1>
        </div>
        <div style="padding: 32px; background: #ffffff;">
          <p style="color: #374151; font-size: 15px; line-height: 1.7;">Αγαπητέ/ή ${name},</p>
          <p style="color: #374151; font-size: 15px; line-height: 1.7;">
            Σας ευχαριστούμε για το μήνυμά σας. Το λάβαμε και θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.
          </p>
          <p style="color: #374151; font-size: 15px; line-height: 1.7;">
            Με εκτίμηση,<br>
            <strong>Η ομάδα της BAUART Architect</strong>
          </p>
        </div>
        <div style="background: #f3f4f6; padding: 16px 32px;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">bauart@otenet.gr | BAUART Architect, Θεσσαλονίκη</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailToOffice);
    await transporter.sendMail(mailToSender);
    console.log(`[${new Date().toISOString()}] Email sent from: ${email}`);
    return res.status(200).json({ success: true, message: 'Το μήνυμά σας στάλθηκε επιτυχώς!' });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Error:`, err.message);
    return res.status(500).json({ success: false, message: 'Σφάλμα αποστολής. Δοκιμάστε ξανά ή επικοινωνήστε στο bauart@otenet.gr' });
  }
});

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`✅ BAUART Contact Backend running on http://localhost:${PORT}`);
});
