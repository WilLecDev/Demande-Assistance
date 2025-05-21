import db from "../config/db.js";

export const createProcess = async (req, res) => {
    const {
        is_question,
        question_text,
        question_type,
        is_action,
        action_description,
        action_result,
        has_followup_question,
        followup_question_text,
        followup_question_type,
        procedures_id,
        position
    } = req.body;

    if (!procedures_id || typeof procedures_id !== 'number') {
        return res.status(400).json({ success: false, 
            message: 'L\'ID de la procédure est requis et doit être un nombre.' });
    }

    try {
        const [result] = await db.query(
            `INSERT INTO process (
            is_question, 
            question_text, 
            question_type, 
            is_action, 
            action_description, 
            action_result, 
            has_followup_question, 
            followup_question_text, 
            followup_question_type, 
            procedures_id, 
            position
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                is_question || false,
                question_text || null,
                question_type || null,
                is_action || false,
                action_description || null,
                action_result || false,
                has_followup_question || false,
                followup_question_text || null,
                followup_question_type || null,
                procedures_id,
                position
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Process créé avec succès',
            id: result.insertId
        });

        }catch (error) {
        console.error('Erreur lors de la création :', error.message);
        res.status(500).json({ success: false, message: 'Erreur serveur', error: error.message });
    }
};