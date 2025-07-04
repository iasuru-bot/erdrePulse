const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Style commun pour les emails
const getEmailTemplate = (content, buttonUrl, buttonText, company = 'ERDRePulse') => {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${company} - Communication Officielle</title>
      <style>
        body {
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.6;
          color: #333333;
          background-color: #f9f9f9;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .header {
          background-color: #1976d2;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 30px 25px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
        }
        .footer {
          background-color: #f5f5f5;
          padding: 20px;
          text-align: center;
          color: #666666;
          font-size: 12px;
        }
        .button {
          display: inline-block;
          background-color: #1976d2;
          color: white !important;
          text-decoration: none;
          padding: 12px 30px;
          border-radius: 4px;
          font-weight: bold;
          margin: 20px 0;
          text-align: center;
        }
        .button:hover {
          background-color: #1565c0;
        }
        p {
          margin-bottom: 15px;
        }
        .note {
          background-color: #f8f8f8;
          padding: 15px;
          border-left: 4px solid #1976d2;
          margin: 25px 0;
          font-size: 13px;
        }
        .contact {
          margin-top: 25px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="logo">${company}</h1>
        </div>
        <div class="content">
          ${content}
          <div style="text-align: center;">
            <a href="${buttonUrl}" class="button">${buttonText}</a>
          </div>
          <div class="note">
            <strong>Information de sécurité:</strong> Ce message a été envoyé suite à une action de votre part sur notre plateforme. 
            Si vous n'êtes pas à l'origine de cette action, veuillez ignorer cet email.
          </div>
          <div class="contact">
            <p>Besoin d'aide? Contactez notre support à <a href="mailto:support@erdrepulse.fr">support@erdrepulse.fr</a></p>
          </div>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} ${company}. Tous droits réservés.</p>
          <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const sendVerificationEmail = async (email, token) => {
  const frontendUrl = process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : process.env.FRONTEND_URL_LOCAL;
  
  const verificationUrl = `${frontendUrl}/verify-email?token=${token}`;
  
  const content = `
    <h2>Bienvenue sur ERDRePulse !</h2>
    <p>Merci de vous être inscrit. Pour finaliser votre inscription, veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse email.</p>
    <p>Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.</p>
    <p>Ce lien est valable pendant 24 heures. Si vous n'avez pas effectué cette inscription, vous pouvez ignorer cet email.</p>
  `;
  
  const mailOptions = {
    from: `"ERDRePulse" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Confirmation de votre compte ERDRePulse',
    html: getEmailTemplate(content, verificationUrl, 'Confirmer mon compte')
  };

  await transporter.sendMail(mailOptions);
};

const sendPasswordResetEmail = async (email, token) => {
  const frontendUrl = process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : process.env.FRONTEND_URL_LOCAL;
  
  const resetUrl = `${frontendUrl}/reset-password?token=${token}`;
  
  const content = `
    <h2>Réinitialisation de votre mot de passe</h2>
    <p>Bonjour,</p>
    <p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte. Pour créer un nouveau mot de passe, veuillez cliquer sur le bouton ci-dessous :</p>
    <p>Ce lien est valable pendant 1 heure. Si vous n'avez pas demandé cette réinitialisation, veuillez sécuriser votre compte ou contacter notre support.</p>
  `;
  
  const mailOptions = {
    from: `"ERDRePulse" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Réinitialisation de votre mot de passe ERDRePulse',
    html: getEmailTemplate(content, resetUrl, 'Réinitialiser mon mot de passe')
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail
}; 