import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import procedureRoutes from './routes/procedures.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/procedures', procedureRoutes);

app.get('/', (req, res) => {
  db.query('SELECT NOW()', (err, result) => {
    if (err) return res.status(500).json({ error: 'Database connection error' });
    res.json({ message: 'Database connected', date: result[0].now });
  });
});

app.listen(3000, () => { 
  console.log('Server is running on port 3000');
});