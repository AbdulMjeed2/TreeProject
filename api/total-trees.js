// /api/total-trees.js

export default async function handler(req, res) {
  console.log('[BACKEND] Received request:', req.method);

  try {
    // Example: fetch from Supabase
    const { createClient } = await import('@supabase/supabase-js');

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    console.log('[BACKEND] Supabase URL:', supabaseUrl ? 'Loaded' : 'Missing');
    console.log('[BACKEND] Supabase Key:', supabaseKey ? 'Loaded' : 'Missing');

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('total_trees')
      .select('count')
      .eq('id', 1)
      .single();

    console.log('[BACKEND] Supabase data:', data);
    console.log('[BACKEND] Supabase error:', error);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ count: data.count });

  } catch (err) {
    console.error('[BACKEND] Unexpected error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
