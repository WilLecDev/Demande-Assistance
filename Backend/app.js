import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import procedureRoutes from './routes/procedures.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/procedures', procedureRoutes);

app.get('/', async (req, res) => {
  try {
    const [result] = await db.query('SELECT NOW()');
    res.json({ message: 'Database connected', date: result[0]['NOW()'] });
  } catch (err) {
    res.status(500).json({ error: 'Database connection error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});