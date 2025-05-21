import db from '../config/db.js';

export const createProcedures = async (req, res) => {
  const { title, created_by } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: 'Le titre est requis.' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO procedures (title, created_by) VALUES (?, ?)',
      [title, created_by || null]
    );

    res.status(201).json({
      success: true,
      message: 'Procédure créée avec succès',
      id: result.insertId
    });
  } catch (error) {
    console.error('Erreur lors de la création :', error.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

export const getProcedures = async (req, res) => {
  const { id } = req.params;

  try {
    const [procedures] = await db.query(
      'SELECT * FROM procedures WHERE id = ?', 
      [id]
    );

    if (procedures.length === 0) {
      return res.status(404).json({ success: false, message: 'Procédures introuvable.' });
    }

    const procedure = procedures[0];

    const [steps] = await db.query(
      `SELECT * FROM process
      WHERE procedures_id = ? 
      ORDER BY position ASC`,
      [id]
    );
    res.status(200).json({
      success: true,
      procedure,
      steps
    });
  } catch (error) {
    console.error('Erreur lors de la récupération :', error.message);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
} ;