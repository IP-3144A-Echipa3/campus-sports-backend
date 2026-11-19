const { Op } = require('sequelize');
const Rezervare = require('../models/Rezervare');
const Teren = require('../models/Teren');
const Utilizator = require('../models/Utilizator');

// GET /api/rezervari
exports.getAllRezervari = async (req, res) => {
  try {
    const rezervari = await Rezervare.findAll({
      order: [['OraStart', 'ASC']],
    });
    res.status(200).json(rezervari);
  } catch (error) {
    console.error('Error fetching rezervari:', error);
    res.status(500).json({ error: 'Eroare la preluarea rezervărilor.' });
  }
};

// POST /api/rezervari
exports.createRezervare = async (req, res) => {
  try {
    const { UtilizatorID, TerenID, OraStart, OraFinal } = req.body;

    const start = new Date(OraStart);
    const end = new Date(OraFinal);

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
      return res.status(400).json({ error: 'Intervalul orar este invalid.' });
    }

    // 1. Verify user and field exist
    const [utilizator, teren] = await Promise.all([
      Utilizator.findByPk(UtilizatorID),
      Teren.findByPk(TerenID),
    ]);

    if (!utilizator) {
      return res.status(404).json({ error: 'Utilizatorul nu a fost găsit.' });
    }
    if (!teren) {
      return res.status(404).json({ error: 'Terenul nu a fost găsit.' });
    }
    if (!teren.Disponibil) {
      return res.status(400).json({ error: 'Acest teren este momentan indisponibil.' });
    }

    // 2. Check for overlapping non-cancelled bookings on the same field
    const overlapping = await Rezervare.findOne({
      where: {
        TerenID,
        Status: { [Op.ne]: 'Anulata' },
        [Op.and]: [
          { OraStart: { [Op.lt]: end } },
          { OraFinal: { [Op.gt]: start } },
        ],
      },
    });

    if (overlapping) {
      return res.status(409).json({
        error: 'Terenul este deja rezervat în acest interval orar.',
      });
    }

    // 3. Create the booking
    const newRezervare = await Rezervare.create({
      UtilizatorID,
      TerenID,
      OraStart: start,
      OraFinal: end,
      Status: 'Confirmata',
    });

    res.status(201).json(newRezervare);
  } catch (error) {
    console.error('Error creating rezervare:', error);
    res.status(500).json({ error: 'Eroare la crearea rezervării.' });
  }
};

// PUT /api/rezervari/:id/status (e.g., Cancel a booking)
exports.updateRezervareStatus = async (req, res) => {
  try {
    const { Status } = req.body;
    const rezervare = await Rezervare.findByPk(req.params.id);

    if (!rezervare) {
      return res.status(404).json({ error: 'Rezervarea nu a fost găsită.' });
    }

    await rezervare.update({ Status });
    res.status(200).json(rezervare);
  } catch (error) {
    console.error('Error updating rezervare:', error);
    res.status(500).json({ error: 'Eroare la actualizarea rezervării.' });
  }
};

// DELETE /api/rezervari/:id
exports.deleteRezervare = async (req, res) => {
  try {
    const rezervare = await Rezervare.findByPk(req.params.id);
    if (!rezervare) {
      return res.status(404).json({ error: 'Rezervarea nu a fost găsită.' });
    }

    await rezervare.destroy();
    res.status(200).json({ message: 'Rezervarea a fost ștearsă.' });
  } catch (error) {
    console.error('Error deleting rezervare:', error);
    res.status(500).json({ error: 'Eroare la ștergerea rezervării.' });
  }
};