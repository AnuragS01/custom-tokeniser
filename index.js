import express from 'express';
import cors from 'cors';
import { encode, decode } from './token.js';
const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from custom-tokeniser!');
});

// Encode route
app.post('/encode', (req, res) => {
  const { text } = req.body;
  if (typeof text !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid text field' });
  }
  try {
    const tokens = encode(text);
    res.json({ tokens });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Decode route
app.post('/decode', (req, res) => {
  const { tokens } = req.body;
  if (!Array.isArray(tokens)) {
    return res.status(400).json({ error: 'Missing or invalid tokens field (must be array)' });
  }
  try {
    const text = decode(tokens);
    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});