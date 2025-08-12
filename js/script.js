window.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements inside DOMContentLoaded to ensure they exist
  const treeDisplay = document.getElementById("tree-count");           // user-specific count
  const treeDisplayAlt = document.getElementById("tree-count-display"); // global total
  const oxygenDisplay = document.getElementById("oxygen");
  const co2Display = document.getElementById("co2");
  const clicksRemainingDisplay = document.getElementById("clicks-remaining");
  const button = document.getElementById("click-button");

  // Load user stats from localStorage
  let userClicks = parseInt(localStorage.getItem("userClicks") || "0");
  let userTrees = parseInt(localStorage.getItem("userTrees") || "0");

  // Detect API base URL depending on environment
  const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api' 
    : '/api'; 

  function updateStats() {
    const clicksRemaining = 50 - (userClicks % 50);

    if (treeDisplay) treeDisplay.textContent = userTrees;
    if (clicksRemainingDisplay) clicksRemainingDisplay.textContent = clicksRemaining;
  }

  async function addClick() {
    try {
      if (button) button.disabled = true;

      userClicks++;
      localStorage.setItem("userClicks", userClicks.toString());

      const newTrees = Math.floor(userClicks / 50);
      if (newTrees > userTrees) {
        userTrees = newTrees;
        localStorage.setItem("userTrees", userTrees.toString());

        // POST to add-tree API to increment global count
        const response = await fetch(`${API_BASE}/add-tree`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`Tree planted! Global total: ${data.total_trees}`);
          await loadGlobalStats(); // refresh global stats after planting
        } else {
          console.error('Failed to add tree to database');
        }
      }

      updateStats();

      if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
          button.style.transform = 'scale(1)';
          button.disabled = false;
        }, 100);
      }
    } catch (error) {
      console.error('Error adding click:', error);
      if (button) {
        setTimeout(() => {
          button.disabled = false;
        }, 100);
      }
    }
  }

  async function loadGlobalStats() {
    try {
      const response = await fetch(`${API_BASE}/total-trees`);
      if (response.ok) {
        const data = await response.json();
        const totalTrees = data.total_trees || 0;

        if (treeDisplayAlt) treeDisplayAlt.textContent = totalTrees;

        // Update oxygen and CO2 calculations based on global total
        const oxygenPerTreePerYear = 118; // kg
        const co2PerTreePerYear = 22;     // kg

        if (oxygenDisplay) {
          oxygenDisplay.textContent = (totalTrees * oxygenPerTreePerYear).toFixed(2);
        }
        if (co2Display) {
          co2Display.textContent = (totalTrees * co2PerTreePerYear).toFixed(2);
        }

        console.log(`Updated global stats: ${totalTrees} trees planted`);
      }
    } catch (error) {
      console.error('Error loading global stats:', error);
    }
  }

  // Initialize UI
  updateStats();
  loadGlobalStats();

  // Event listener for button click
  if (button) {
    button.addEventListener("click", addClick);
  }

  // Refresh global stats every 5 seconds
  setInterval(() => {
    loadGlobalStats();
  }, 5000);
});
