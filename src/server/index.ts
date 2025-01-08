import express from 'express';
import cors from 'cors';
import { query } from '../lib/db';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/cities', async (req, res) => {
  try {
    const result = await query('SELECT * FROM cities ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});

app.get('/api/cities/search', async (req, res) => {
  const { term } = req.query;
  try {
    const result = await query(
      'SELECT * FROM cities WHERE name ILIKE $1 ORDER BY name LIMIT 10',
      [`%${term}%`]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search cities' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});