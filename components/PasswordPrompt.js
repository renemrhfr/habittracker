"use client"
import { useState } from "react";

function PasswordPrompt({ onSubmit }) {

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const checkPassword = () => {
   var errorMessage = onSubmit(password);
   setError(errorMessage);
  };

  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center">
      <div className="bg-slate-700 shadow-md shadow-slate-800 p-8 rounded-lg">
        <form onSubmit={(e) => { e.preventDefault(); checkPassword(); }} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort eingeben"
            className="p-2 rounded-md text-lg"
            style={{ background: '#2d2f34', color: 'white' }}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md transform hover:scale-105"
          >
            Enter
          </button>
          {error && <p className="text-red-500 text-center">Falsches Passwort</p>}
        </form>
      </div>
    </div>
  );
}

export default PasswordPrompt;