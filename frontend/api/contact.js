import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Συμπλήρωσε όλα τα πεδία.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.OWNER_EMAIL,
      replyTo: email,
      subject: `Νέο αίτημα: ${subject}`,
      text: `Ονοματεπώνυμο: ${name}\nEmail: ${email}\nΚατηγορία: ${subject}\n\nΜήνυμα:\n${message}`,
    });

    return res.status(200).json({ success: true, message: 'Το μήνυμά σας στάλθηκε επιτυχώς.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Πρόβλημα αποστολής. Δοκιμάστε ξανά.' });
  }
}