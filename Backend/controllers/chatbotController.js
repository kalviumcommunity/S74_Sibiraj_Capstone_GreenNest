/**
 * Rule-based gardening chatbot
 */
const RULES = {
  fertilizer: {
    tomato: 'Use vermicompost every 7 days. NPK 12-10-10 during flowering.',
    chilli: 'Organic compost with vermicompost. Avoid heavy nitrogen.',
    brinjal: 'DAP + Super Phosphate works best. Organic mulch recommended.',
    default: 'Use balanced organic fertilizer. Compost tea every 2 weeks.',
  },
  watering: {
    tomato: 'Water deeply 2-3 times per week. Keep soil moist, not soggy.',
    chilli: 'Water when top inch is dry. Reduce in flowering for more fruits.',
    brinjal: 'Keep soil consistently moist. Mulch to retain moisture.',
    default: 'Water when top 1-2 inches of soil are dry. Morning is best.',
  },
  sunlight: {
    tomato: '6-8 hours full sun.',
    chilli: '6-8 hours full sun.',
    brinjal: '6-8 hours full sun.',
    default: 'Most vegetables need 6+ hours of direct sunlight.',
  },
};

const KEYWORDS = {
  fertiliz: 'fertilizer',
  water: 'watering',
  sun: 'sunlight',
  light: 'sunlight',
};

function getResponse(seedName, topic) {
  const key = (seedName || '').toLowerCase().trim();
  const rule = RULES[topic];
  return rule?.[key] || rule?.default || 'No specific advice for that seed.';
}

export const chat = (req, res) => {
  try {
    const { seedName, message } = req.body;
    const msg = (message || '').toLowerCase();

    let topic = 'fertilizer';
    for (const [k, v] of Object.entries(KEYWORDS)) {
      if (msg.includes(k)) {
        topic = v;
        break;
      }
    }

    const suggestion = getResponse(seedName, topic);
    res.json({ suggestion, topic });
  } catch (err) {
    res.status(500).json({ message: 'Chatbot error' });
  }
};

// Legacy: seed-only fertilizer suggestion
export const suggestFertilizer = (req, res) => {
  const { seedName } = req.body;
  const suggestion = getResponse(seedName, 'fertilizer');
  res.json({ suggestion });
};
