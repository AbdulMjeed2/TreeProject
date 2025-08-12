import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('[DEBUG] SUPABASE_URL:', supabaseUrl ? 'SET' : 'NOT SET');
console.log('[DEBUG] SUPABASE_KEY:', supabaseKey ? 'SET' : 'NOT SET');

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  console.log('[DEBUG] API called with method:', req.method);

  try {
    if (req.method !== 'GET') {
      console.warn('[DEBUG] Method not allowed:', req.method);
      res.status(405).send('Method Not Allowed');
      return;
    }

    console.log('[DEBUG] Fetching total_trees row with id = 1');

    const { data, error } = await supabase
      .from('total_trees')
      .select('"count"') // quotes in case "count" conflicts
      .eq('id', 1)
      .maybeSingle();

    console.log('[DEBUG] Query response data:', data);
    console.log('[DEBUG] Query error:', error);

    if (error) {
      console.error('[ERROR] Supabase query failed:', JSON.stringify(error, null, 2));
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      console.warn('[DEBUG] No row found with id=1, inserting default row');
      const { error: insertError } = await supabase
        .from('total_trees')
        .insert([{ id: 1, count: 0 }]);

      if (insertError) {
        console.error('[ERROR] Insert failed:', JSON.stringify(insertError, null, 2));
        return res.status(500).json({ error: insertError.message });
      }
      console.log('[DEBUG] Insert successful, returning count = 0');
      return res.status(200).json({ total_trees: 0 });
    }

    console.log('[DEBUG] Data fetched successfully, count =', data.count);
    res.status(200).json({ total_trees: data.count });

  } catch (err) {
    console.error('[ERROR] Unexpected crash:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
}
