// JavaScript source code
const Utilizator = require('../models/Utilizator');

// POST /api/utilizatori/register (and POST /api/utilizatori)
exports.registerUser = async (req, res) => {
  try {
    const { Nume, Email, Telefon, TipUser } = req.body;
    const existingUser = await Utilizator.findOne({ where: { Email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Acest email este deja înregistrat.' });
    }
    const newUser = await Utilizator.create({
      Nume,
      Email,
      Telefon,
      TipUser: TipUser || 'Client',
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Eroare la înregistrarea utilizatorului.' });
  }
};

// GET /api/utilizatori
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Utilizator.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Eroare la preluarea utilizatorilor.' });
  }
};

// GET /api/utilizatori/:id
exports.getUserById = async (req, res) => {
  try {
    const user = await Utilizator.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilizatorul nu a fost găsit.' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Eroare la preluarea utilizatorului.' });
  }
};

// PUT /api/utilizatori/:id
exports.updateUser = async (req, res) => {
  try {
    const { Nume, Email, Telefon, TipUser } = req.body;
    const user = await Utilizator.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilizatorul nu a fost găsit.' });
    }
    await user.update({ Nume, Email, Telefon, TipUser });
    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Eroare la actualizarea utilizatorului.' });
  }
};

// DELETE /api/utilizatori/:id
exports.deleteUser = async (req, res) => {
  try {
    const user = await Utilizator.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Utilizatorul nu a fost găsit.' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Utilizatorul a fost șters cu succes.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Eroare la ștergerea utilizatorului.' });
  }
};