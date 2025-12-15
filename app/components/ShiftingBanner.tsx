'use client';

import { useState, useEffect } from 'react';

export function ShiftingBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Delay showing the banner to cause layout shift after initial paint
    const timer = setTimeout(() => {
      setShow(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="bg-yellow-100 text-yellow-800 p-4 text-center text-sm font-medium animate-in slide-in-from-top duration-500">
      <p>
        <strong>Limited Time Offer!</strong> Get 50% slow down on all requests today!
      </p>
    </div>
  );
}
