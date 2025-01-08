import express from 'express';
import cors from 'cors';
import { query } from './db';

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

app.get('/api/cities/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('SELECT * FROM cities WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'City not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch city' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});