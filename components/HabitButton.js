import React from 'react';
import { X } from 'lucide-react';

export default function HabitButton({ habit, onComplete, onRemove }) {
  const bgColor = habit.value > 0 ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600';

  return (
    <div className="relative group">
      <button
        onClick={onComplete}
        className={`${bgColor} text-white font-semibold py-2 rounded-xl transition duration-300 shadow-md flex flex-col items-center justify-center w-full h-full`}
      >
        <span className="text-md mb-1">{habit.name}</span>
        <span className="text-xs">{habit.value > 0 ? '+' : ''}{habit.value} XP</span>
        <span style={{fontSize: '10px'}}>{habit.category}</span>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
      >
        <X size={14} />
      </button>
    </div>
  );
}