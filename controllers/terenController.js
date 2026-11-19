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

// PUT /api/terenuri/:id
exports.updateTeren = async (req, res) => {
  try {
    const { id } = req.params;
    const { Denumire, OraDeschidere, OraInchidere, Sport, TarifOrar, Disponibil } = req.body;

    const teren = await Teren.findByPk(id);
    if (!teren) {
      return res.status(404).json({ error: 'Terenul nu a fost găsit.' }); 
    }

    await teren.update({
      Denumire,
      OraDeschidere,
      OraInchidere,
      Sport,
      TarifOrar,
      Disponibil,
    });

    res.status(200).json(teren);
  } catch (error) {
    console.error('Error updating teren:', error);
    res.status(500).json({ error: 'Eroare la actualizarea terenului.' });
  }
};

// DELETE /api/terenuri/:id
exports.deleteTeren = async (req, res) => {
  try {
    const { id } = req.params;

    const teren = await Teren.findByPk(id);
    if (!teren) {
      return res.status(404).json({ error: 'Terenul nu a fost găsit.' });
    }

    await teren.destroy();
    res.status(200).json({ message: 'Terenul a fost șters cu succes.' });
  } catch (error) {
    console.error('Error deleting teren:', error);
    res.status(500).json({ error: 'Eroare la ștergerea terenului.' });
  }
};