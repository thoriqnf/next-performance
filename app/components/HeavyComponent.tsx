'use client';

import { useState, useEffect } from 'react';
import { heavyData } from '../lib/heavy-data';

export function HeavyComponent() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate heavy calculation on mount to block main thread
    const startTime = performance.now();
    while (performance.now() - startTime < 500) {
      // Block thread for 500ms
      Math.random();
    }
    
    // Process heavy data
    const processed = heavyData.map(item => ({
      ...item,
      processed: true
    }));
    
    setData(processed);
  }, []);

  return (
    <div className="hidden">
      {/* Render invisible elements to add DOM weight without affecting visual design */}
      {data.slice(0, 100).map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
