"use client"
import { useState } from 'react';
import PasswordPrompt from '../components/PasswordPrompt';
import Dashboard from '../components/Dashboard';

export default function Home() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <PasswordPrompt onCorrectPassword={() => setAuthenticated(true)} />;
  }

  return (
    <main className="min-h-screen">
      <div className="overflow-hidden">
        <Dashboard />
      </div>
    </main>
  );
}