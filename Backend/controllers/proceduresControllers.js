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
