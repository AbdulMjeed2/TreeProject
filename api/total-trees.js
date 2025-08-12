// api/total-trees.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { data, error } = await supabase
    .from('total_trees')
    .select('count')
    .eq('id', 1)
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json({ total_trees: data?.count || 0 });
  }
}
