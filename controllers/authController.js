const Utilizator = require('../models/Utilizator');

// POST /api/auth/register
exports.registerUser = async (req, res) => {
  try {
    const { Nume, Email, Telefon, TipUser } = req.body;

    // Optional: Check if a user with this email already exists
    const existingUser = await Utilizator.findOne({ where: { Email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Acest email este deja înregistrat.' });
    }

    const newUser = await Utilizator.create({
      Nume,
      Email,
      Telefon,
      TipUser: TipUser || 'Client', // Fallback to 'Client' if not provided
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Eroare la crearea utilizatorului.' });
  }
};