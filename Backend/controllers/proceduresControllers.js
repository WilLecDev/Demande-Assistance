import db from '../config/db.js';

export  const createprocedures = async (req, res) => {
    const { title,created_by } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' });
    }
    
    try {
        const [result] = await db.query('INSERT INTO procedures (title, created_by) VALUES (?, ?)', [title, created_by || null]);
        res.status(201).json({ success: true, message: 'Procedure created successfully', 
            data: { id: result.insertId, title, created_by } });
    } catch (error) {
        console.error('Error creating procedure:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
    };
