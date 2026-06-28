export const loadSave = (key, defaultValue) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

export const writeSave = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const clearSave = (key) => {
  localStorage.removeItem(key);
};
