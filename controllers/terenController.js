const Teren = require('../models/Teren');

// GET /api/terenuri
exports.getTerenuri = async (req, res) => {
  try {
    const terenuri = await Teren.findAll();
    res.status(200).json(terenuri);
  } catch (error) {
    res.status(500).json({ error: 'Server error retrieving terenuri' });
  }
};

// POST /api/terenuri
exports.createTeren = async (req, res) => {
  try {
    const { Denumire, OraDeschidere, OraInchidere, Sport, TarifOrar, Disponibil } = req.body;
    const newTeren = await Teren.create({
      Denumire,
      OraDeschidere,
      OraInchidere,
      Sport,
      TarifOrar,
      Disponibil
    });
    res.status(201).json(newTeren);
  } catch (error) {
    res.status(500).json({ error: 'Server error creating teren' });
  }
};

// TODO: Implement PUT (Update) and DELETE (Remove) in future commits