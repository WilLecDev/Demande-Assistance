import db from '../config/db.js';

export const createHistorique = async (req, res) => {
    const { users_id, procedures_id, process_id, resolved } = req.body;

    if (!users_id || !procedures_id || !process_id) {
        return res.status(400).json({
            success: false, 
            message: "Les champs user_id, procedures_id et process_id sont requis."
        });
    }

    try {
        const [result] = await db.query(
            `INSERT INTO historique (
            users_id, procedures_id, process_id, resolved
            ) VALUES (?, ?, ?, ?)`,
            [users_id, procedures_id, process_id, resolved || false]
            );

            res.status(201).json({
                success: true,
                message: "Historique créé avec succès",
                id: result.insertId
            });
    } catch (error) {
        console.error("Erreur lors de la création de l'historique :", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Erreur serveur",
            error: error.message
         });
    }
};