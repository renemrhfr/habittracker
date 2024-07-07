import React from 'react';

export default function StatBar({ label, value }) {
  const getColor = (value) => {
    if (value > 66) return 'bg-green-500';
    if (value > 33) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const roundedValue = Math.round(value * 10) / 10;

  return (
    <div className="rounded-lg p-1">
      <div className="flex justify-between">
        <span className="text-sm font-medium text-white capitalize">{label}</span>
      
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 border-2 shadow-inner overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${getColor(roundedValue)}`}
          style={{ width: `${roundedValue}%` }}
        ></div>
      </div>
    </div>
  );
}

//  <span className="text-xs font-bold text-white">{roundedValue}%</span>