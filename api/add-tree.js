// api/add-tree.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const { data: currentData, error: getError } = await supabase
      .from('total_trees')
      .select('count')
      .eq('id', 1)
      .single();

    if (getError) return res.status(500).json({ error: getError.message });

    const currentCount = currentData?.count || 0;
    const newCount = currentCount + 1;

    const { error: updateError } = await supabase
      .from('total_trees')
      .update({ count: newCount })
      .eq('id', 1);

    if (updateError) return res.status(500).json({ error: updateError.message });

    res.status(200).json({ total_trees: newCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
