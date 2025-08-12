import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('SUPABASE_URL:', supabaseUrl ? 'SET' : 'NOT SET');
console.log('SUPABASE_KEY:', supabaseKey ? 'SET' : 'NOT SET');

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  console.log('API called with method:', req.method);
  try {
    if (req.method !== 'GET') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const { data, error } = await supabase
      .from('total_trees')
      .select('count')
      .eq('id', 1)
      .maybeSingle();

    if (error) {
      console.error('Supabase query error:', error);
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      console.warn('No row found with id=1, inserting default row');
      const { error: insertError } = await supabase
        .from('total_trees')
        .insert([{ id: 1, count: 0 }]);
      if (insertError) {
        console.error('Insert error:', insertError);
        return res.status(500).json({ error: insertError.message });
      }
      return res.status(200).json({ total_trees: 0 });
    }

    console.log('Data fetched:', data);
    res.status(200).json({ total_trees: data.count });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
