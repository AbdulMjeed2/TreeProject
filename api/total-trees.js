async function fetchTrees() {
  console.log('[FRONTEND] Starting fetch...');

  try {
    const response = await fetch('/api/total-trees');
    console.log('[FRONTEND] Raw response:', response);

    console.log('[FRONTEND] Status:', response.status);
    const text = await response.text();
    console.log('[FRONTEND] Raw body text:', text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('[FRONTEND] JSON parse failed:', parseError);
      throw parseError;
    }

    console.log('[FRONTEND] Parsed data:', data);
    return data;

  } catch (err) {
    console.error('[FRONTEND] Fetch failed:', err);
    throw err;
  }
}
