import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('[INIT] SUPABASE_URL:', supabaseUrl ? 'SET' : 'NOT SET');
console.log('[INIT] SUPABASE_KEY:', supabaseKey ? 'SET' : 'NOT SET');

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  console.log('[REQ] Method:', req.method);

  try {
    if (req.method !== 'GET') {
      console.warn('[WARN] Method not allowed:', req.method);
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    console.log('[DB] Fetching total_trees with id = 1');

    const { data, error } = await supabase
      .from('total_trees')
      .select('"count"') // quotes in case "count" is reserved
      .eq('id', 1)
      .maybeSingle();

    if (error) {
      console.error('[ERROR] Supabase query failed:', error);
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      console.warn('[WARN] No row found, inserting default');
      const { error: insertError } = await supabase
        .from('total_trees')
        .insert([{ id: 1, count: 0 }]);

      if (insertError) {
        console.error('[ERROR] Insert failed:', insertError);
        return res.status(500).json({ error: insertError.message });
      }

      console.log('[SUCCESS] Default row inserted, returning 0');
      return res.status(200).json({ total_trees: 0 });
    }

    console.log('[SUCCESS] Returning count =', data.count);
    return res.status(200).json({ total_trees: data.count });

  } catch (err) {
    console.error('[FATAL] Unexpected crash:', err);
    return res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
}
