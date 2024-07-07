'use client';
import React, { useState } from 'react';
import { useGlobalState } from '../context/GlobalStateProvider';
import Avatar from './Avatar';
import StatBar from './StatBar';
import HabitButton from './HabitButton';
import NewHabitForm from './NewHabitForm';

export default function Dashboard() {
  const { stats, habits, updateStat, addHabit, removeHabit, userName, loading } = useGlobalState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHabitComplete = (category, value) => {
    updateStat(category, value);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddHabit = async (newHabit) => {
    await addHabit(newHabit);
    closeModal();
  };

  const handleRemoveHabit = async (habitId) => {
    await removeHabit(habitId);
  };

  const STAT_ORDER = [
    'Gesundheit',
    'Ausdauer',
    'Kraft',
    'Produktivität',
    'Hygiene',
    'Sozial'
  ];

  if (loading) {
    return <div className="min-h-screen bg-slate-800 flex items-center justify-center">
      <p className="text-white text-2xl">Loading...</p>
    </div>;
  }
  const statMap = Object.fromEntries(stats.map(stat => [stat.category, stat]));

  return (
    <div className="min-h-screen bg-slate-800 p-2">
      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-700 shadow-md shadow-slate-800 overflow-hidden mb-4 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="flex flex-col items-center mr-4">
              <Avatar className="w-24 h-24 rounded-lg border-2 border-white shadow-lg mb-2" />
              <p className="text-xl font-bold text-white mt-2">{userName}</p>
            </div>
            <div className="flex-grow grid grid-cols-2 gap-4">
              {STAT_ORDER.map(category => (
                <StatBar 
                  key={category} 
                  label={category} 
                  value={statMap[category]?.value || 0} 
                />
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6 bg-slate-700 p-5 rounded-lg">
          {habits.map(habit => (
            <HabitButton
              key={habit.id}
              habit={habit}
              onComplete={() => handleHabitComplete(habit.category, habit.value)}
              onRemove={() => handleRemoveHabit(habit.id)}
            />
          ))}
          <button
            onClick={openModal}
            className="bg-gradient-to-r from-yellow-400 to-yellow-400 hover:from-yellow-400 hover:to-orange-500 text-white font-bold py-4 px-6 rounded-lg transition duration-300 shadow-md transform hover:scale-105 flex flex-col items-center justify-center"
          >
            <span className="text-sm">Hinzufügen</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <NewHabitForm onAddHabit={handleAddHabit} onClose={closeModal} />
        </div>
      )}
    </div>
  );
}