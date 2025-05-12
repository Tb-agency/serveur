
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

// Middleware
app.use(cors());
app.use(express.json());

// Route principale pour transmettre les requêtes à Brevo
app.post('/', async (req, res) => {
  try {
    const { firstName, email, createdAt } = req.body;
    const brevoApiKey = req.headers['x-brevo-api-key'];
    
    if (!brevoApiKey) {
      return res.status(401).json({ error: 'Brevo API key is required' });
    }
    
    // Format de la date pour une meilleure lisibilité
    const submissionDate = new Date(createdAt).toLocaleString('fr-FR', {
      dateStyle: 'full',
      timeStyle: 'short'
    });

    // Configuration de l'email à envoyer
    const emailData = {
      sender: {
        name: "Jeu Concours",
        email: "noreply@example.com"  // Remplacez par une adresse email valide pour votre domaine
      },
      to: [
        {
          email: email,
          name: firstName
        }
      ],
      subject: "Confirmation de votre participation au jeu concours",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #4f46e5; text-align: center;">Merci pour votre participation !</h1>
          <p style="font-size: 16px; line-height: 1.5; color: #333;">Bonjour ${firstName},</p>
          <p style="font-size: 16px; line-height: 1.5; color: #333;">Nous avons bien reçu votre participation à notre jeu concours le ${submissionDate}.</p>
          <p style="font-size: 16px; line-height: 1.5; color: #333;">Votre participation a été enregistrée avec succès et vous êtes maintenant dans la liste des participants.</p>
          <p style="font-size: 16px; line-height: 1.5; color: #333;">Nous vous contacterons bientôt si vous êtes parmi nos gagnants.</p>
          <div style="margin: 30px 0; text-align: center;">
            <div style="display: inline-block; background-color: #4f46e5; color: white; padding: 12px 24px; border-radius: 4px; font-weight: bold;">Participation enregistrée</div>
          </div>
          <p style="font-size: 14px; line-height: 1.5; color: #666; text-align: center; margin-top: 30px;">Merci d'avoir participé à notre jeu concours !</p>
        </div>
      `
    };

    // Envoi de l'email en utilisant l'API Brevo
    const brevoResponse = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify(emailData),
    });

    const responseData = await brevoResponse.json();
    
    if (!brevoResponse.ok) {
      console.error('Error sending email via Brevo:', responseData);
      return res.status(brevoResponse.status).json(responseData);
    }

    console.log('Email sent successfully:', responseData);
    return res.status(200).json({ success: true, data: responseData });
    
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Route pour vérifier que le serveur fonctionne
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
