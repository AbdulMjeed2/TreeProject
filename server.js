// server.js
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors()); // Enable CORS if frontend and backend are on different origins
app.use(express.json()); // To parse JSON bodies

// Load Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('ERROR: Missing Supabase environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// GET /api/total-trees — return current total tree count
app.get('/api/total-trees', async (req, res) => {
  try {
    console.log('[BACKEND] /api/total-trees called');

    const { data, error } = await supabase
      .from('total_trees')
      .select('count')
      .eq('id', 1)
      .single();

    if (error) {
      console.error('[BACKEND] Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json({ total_trees: data.count });
  } catch (err) {
    console.error('[BACKEND] Unexpected error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /api/add-tree — increment total tree count by 1
app.post('/api/add-tree', async (req, res) => {
  try {
    console.log('[BACKEND] /api/add-tree called');

    // Fetch current count
    const { data, error } = await supabase
      .from('total_trees')
      .select('count')
      .eq('id', 1)
      .single();

    if (error) {
      console.error('[BACKEND] Supabase fetch error:', error);
      return res.status(500).json({ error: error.message });
    }

    const newCount = (data.count || 0) + 1;

    // Update count
    const { error: updateError } = await supabase
      .from('total_trees')
      .update({ count: newCount })
      .eq('id', 1);

    if (updateError) {
      console.error('[BACKEND] Supabase update error:', updateError);
      return res.status(500).json({ error: updateError.message });
    }

    res.json({ total_trees: newCount });
  } catch (err) {
    console.error('[BACKEND] Unexpected error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server on PORT environment variable or 3000 by default
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
