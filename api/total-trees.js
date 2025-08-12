export default async function handler(req, res) {
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
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      const { error: insertError } = await supabase
        .from('total_trees')
        .insert([{ id: 1, count: 0 }]);

      if (insertError) {
        console.error('Insert error:', insertError);
        return res.status(500).json({ error: insertError.message });
      }

      return res.status(200).json({ total_trees: 0 });
    }

    return res.status(200).json({ total_trees: data.count });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
