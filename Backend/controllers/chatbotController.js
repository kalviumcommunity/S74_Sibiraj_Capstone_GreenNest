export const suggestFertilizer = (req, res) => {
  const { seedName } = req.body;

  const suggestions = {
    tomato: "Use 12-10-10 NPK fertilizer",
    chilli: "Use organic compost with vermicompost",
    brinjal: "DAP + Super Phosphate works best",
    default: "Use balanced organic fertilizer"
  };

  const result = suggestions[seedName.toLowerCase()] || suggestions.default;
  res.json({ suggestion: result });
};
