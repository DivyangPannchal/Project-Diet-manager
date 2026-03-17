// AI Integration for Intelligent Diet Tips

async function fetchFromGroq(prompt, elementId, formatAsList = false) {
  const el = document.getElementById(elementId);
  
  if (!el) {
    console.error(`Element with id ${elementId} not found.`);
    return;
  }
  
  if (formatAsList) {
    el.innerHTML = '<li style="color: var(--cyan); animation: flicker 2s infinite;">Processing AI Generation...</li>';
  } else {
    el.innerHTML = '<span style="color: var(--cyan); animation: flicker 2s infinite;">Communicating with NutriBot AI...</span>';
  }

  try {
    const res = await fetch('groq_chat.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt })
    });
    
    const data = await res.json();
    if (data.reply) {
      if (formatAsList) {
        // Break lines and filter empty ones
        const items = data.reply.split('\n').filter(line => line.trim().length > 0);
        let listHTML = '';
        items.forEach(item => {
           // Remove markdown bold asterisks and leading dashes
           let cleaned = item.replace(/\*\*/g, '').replace(/^- /g, '').trim();
           // Highlight the meal type if formatted like "Breakfast: "
           cleaned = cleaned.replace(/^(Breakfast|Lunch|Dinner|Snack)s?:/i, '<strong style="color: #fff;">$1:</strong>');
           listHTML += `<li>${cleaned}</li>`;
        });
        el.innerHTML = listHTML;
      } else {
        el.innerHTML = data.reply.replace(/\*\*/g, '<strong>').replace(/\n/g, '<br>');
      }
    } else {
      el.innerHTML = `<span style="color: var(--red-neon)">Error: ${data.error || 'Unknown error'}</span>`;
    }
  } catch (err) {
    el.innerHTML = `<span style="color: var(--red-neon)">Connection failed. Ensure PHP server is running.</span>`;
  }
}

function showRandomTip(action) {
  const tipText = document.getElementById('tips-text');
  
  if (action === 'do') {
    tipText.className = 'do-tip';
    fetchFromGroq(
      "Give me one single, highly effective 'Do' tip for a healthy diet in 1-2 sentences. Make it actionable, scientifically accurate, and unique. Do not use any markdown.",
      'tips-text', 
      false
    );
  } else {
    tipText.className = 'dont-tip';
    fetchFromGroq(
      "Give me one single, highly effective 'Don't' tip (what to avoid) for a healthy diet in 1-2 sentences. Formulate as a warning. Do not use any markdown.",
      'tips-text', 
      false
    );
  }
}

function generateMealPlan() {
  const prompt = "Generate a balanced, healthy 1-day meal plan. Provide exactly 4 lines in this strict exact format, with no intro or outro text. Use this exact structure:\nBreakfast: [food choice]\nLunch: [food choice]\nDinner: [food choice]\nSnack: [food choice]";
  
  fetchFromGroq(prompt, 'meal-list', true);
}