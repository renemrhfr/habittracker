'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function NewHabitForm({ onAddHabit, onClose }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Gesundheit');
  const [value, setValue] = useState(10);

  useEffect(() => {
    // Round value to nearest 10
    setValue(Math.round(value / 10) * 10);
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddHabit({ name, category, value: parseInt(value) });
    setName('');
    setCategory('Gesundheit');
    setValue(10);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-slate-400 p-6 rounded-xl shadow-xl w-[80vw]"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-bold text-white mb-6">Neue Aktivität</h2>
        <div className="space-y-2 text-gray-700">
          <label htmlFor="name" className="text-sm font-medium text-white">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-300"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium text-gray-700">Kategorie</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-gray-700 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-300"
          >
            <option value="Gesundheit">Gesundheit</option>
            <option value="Ausdauer">Ausdauer</option>
            <option value="Kraft">Kraft</option>
            <option value="Produktivität">Produktivität</option>
            <option value="Hygiene">Hygiene</option>
            <option value="Sozial">Sozial</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="value" className="text-sm font-medium text-gray-700">XP Wert</label>
          <div className="flex items-center">
            <input
              id="value"
              type="range"
              min="-100"
              max="100"
              step="10"
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-4 text-lg font-semibold text-white">{value}</span>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-300"
          >
            Abbrechen
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-amber-700 to-amber-800 text-white rounded-lg hover:from-amber-400 hover:to-amber-700 transition duration-300"
          >
            Hinzufügen
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}