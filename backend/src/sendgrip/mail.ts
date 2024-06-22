import { Router } from 'express';
import sgMail from '@sendgrid/mail';
import { UserRequest } from '../types/types';
import express from 'express';

export const Sendmail = Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

Sendmail.post('/send-email', (req: UserRequest, res: express.Response) => {
  const { to, from, subject, text, html } = req.body;

  const msg: sgMail.MailDataRequired = {
    to,
    from,
    subject: subject || "Test Email from Postman",
    text: text || "This is a test email sent from Postman using SendGrid",
    html: html || "<strong>This is a test email sent from Postman using SendGrid</strong>"
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).send('Email sent');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Failed to send email');
    });
});
