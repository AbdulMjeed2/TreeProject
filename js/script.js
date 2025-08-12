async function loadGlobalStats() {
  try {
    const response = await fetch('/api/total-trees');
    console.log('[FRONTEND] Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[FRONTEND] Server error:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('[FRONTEND] Received data:', data);

    const totalTrees = data.total_trees || 0;
    treeDisplayAlt.textContent = totalTrees;

    const oxygenPerTree = 118;
    const co2PerTree = 22;

    oxygenDisplay.textContent = (totalTrees * oxygenPerTree).toFixed(2);
    co2Display.textContent = (totalTrees * co2PerTree).toFixed(2);
  } catch (error) {
    console.error('[FRONTEND] Failed to load global stats:', error);
  }
}
