import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.server' });

const app = express();
const PORT = Number(process.env.PORT || 4000);
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: '1mb' }));

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(input = '') {
  return String(input).trim().replace(/[<>]/g, '');
}

function validatePayload(body = {}) {
  const fullName = sanitize(body.fullName);
  const email = sanitize(body.email);
  const projectCategory = sanitize(body.projectCategory);
  const message = sanitize(body.message);
  const company = sanitize(body.company); // honeypot

  if (company) {
    return { spam: true };
  }

  if (!fullName || !email || !projectCategory || !message) {
    return { error: 'Συμπλήρωσε όλα τα υποχρεωτικά πεδία.' };
  }

  if (!emailRegex.test(email)) {
    return { error: 'Το email δεν είναι έγκυρο.' };
  }

  if (message.length < 10) {
    return { error: 'Η περιγραφή έργου είναι πολύ μικρή.' };
  }

  return { fullName, email, projectCategory, message };
}

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error('Missing SMTP configuration in .env.server');
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true',
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  try {
    const validated = validatePayload(req.body);

    if (validated.spam) {
      return res.status(200).json({ success: true, message: 'Το μήνυμα καταχωρήθηκε.' });
    }

    if (validated.error) {
      return res.status(400).json({ success: false, error: validated.error });
    }

    const transporter = createTransporter();
    const ownerEmail = process.env.OWNER_EMAIL;

    if (!ownerEmail) {
      throw new Error('Missing OWNER_EMAIL in .env.server');
    }

    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: ownerEmail,
      replyTo: validated.email,
      subject: `Νέο αίτημα προσφοράς από ${validated.fullName}`,
      text: [
        'Νέο αίτημα προσφοράς από τη φόρμα επικοινωνίας.',
        '',
        `Ονοματεπώνυμο: ${validated.fullName}`,
        `Email: ${validated.email}`,
        `Κατηγορία έργου: ${validated.projectCategory}`,
        '',
        'Περιγραφή έργου:',
        validated.message,
      ].join('\n'),
    });

    return res.status(200).json({
      success: true,
      message: 'Το μήνυμά σας στάλθηκε επιτυχώς.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      error: 'Παρουσιάστηκε πρόβλημα κατά την αποστολή. Προσπαθήστε ξανά αργότερα.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Contact form backend listening on http://localhost:${PORT}`);
});