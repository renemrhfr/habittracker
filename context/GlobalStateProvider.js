'use client';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

const clampValue = (value) => Math.min(100, Math.max(0, value));

const DECREASE_RATE = 100 / (72 * 60 * 60 * 1000); // 100 points over 72 hours in milliseconds

export const GlobalStateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const calculateDecreasedStat = useCallback((stat, currentTime) => {
    const lastUpdateTime = new Date(stat.lastUpdated || stat.lastUpdateTime).getTime();
    const timeDiff = Math.max(0, currentTime - lastUpdateTime);
    const decreasePercentage = (timeDiff * DECREASE_RATE) / 100;
    const newValue = clampValue(stat.value * (1 - decreasePercentage));
    return {
      ...stat,
      value: newValue,
      lastUpdated: new Date(currentTime).toISOString()
    };
  }, []);

  const fetchUserData = useCallback(() => {
    fetch('/api/user')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        const currentTime = Date.now();
        const updatedStats = data.stats.map(stat => calculateDecreasedStat(stat, currentTime));
        
        setUser({
          ...data,
          stats: updatedStats
        });
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  }, [calculateDecreasedStat]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const getUpdatedStats = useCallback((currentTime = Date.now()) => {
    if (!user) return [];
    return user.stats.map(stat => calculateDecreasedStat(stat, currentTime));
  }, [user, calculateDecreasedStat]);

  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      const currentTime = Date.now();
      setUser(prevUser => ({
        ...prevUser,
        stats: getUpdatedStats(currentTime)
      }));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [user, getUpdatedStats]);

  const updateStat = useCallback((category, value) => {
    if (!user) return;
    const currentTime = Date.now();
    const currentStat = user.stats.find(stat => stat.category === category);
    if (!currentStat) return;

    const updatedStat = calculateDecreasedStat(currentStat, currentTime);
    const newValue = clampValue(updatedStat.value + value);
   
    fetch('/api/stats', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userId: user.id, 
        category, 
        value: newValue,
        lastUpdated: new Date(currentTime).toISOString()
      })
    })
      .then(res => res.json())
      .then(serverUpdatedStat => {
        setUser(prevUser => ({
          ...prevUser,
          stats: prevUser.stats.map(stat =>
            stat.category === category ? {...serverUpdatedStat, value: clampValue(serverUpdatedStat.value)} : stat
          )
        }));
      });
  }, [user, calculateDecreasedStat]);

  const addHabit = useCallback((habit) => {
    if (!user) return;
    return fetch('/api/habits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: habit.name,
        category: habit.category,
        value: habit.value,
        userId: user.id
      })
    })
      .then(res => res.json())
      .then(newHabit => {
        setUser(prevUser => ({
          ...prevUser,
          habits: [...prevUser.habits, newHabit]
        }));
        return newHabit;
      });
  }, [user]);

  const removeHabit = useCallback((habitId) => {
    if (!user) return;
    return fetch(`/api/habits?id=${habitId}`, { method: 'DELETE' })
      .then(() => {
        setUser(prevUser => ({
          ...prevUser,
          habits: prevUser.habits.filter(habit => habit.id !== habitId)
        }));
      });
  }, [user]);

  const contextValue = React.useMemo(() => ({
    stats: user ? user.stats : [],
    habits: user?.habits || [],
    userName: user?.name,
    updateStat,
    addHabit,
    removeHabit,
    loading
  }), [user, updateStat, addHabit, removeHabit, loading]);

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};