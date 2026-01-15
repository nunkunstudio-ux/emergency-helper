'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import EmergencyButton from '@/components/EmergencyButton';

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('emergencyPhoneNumber');
    if (stored) {
      setPhoneNumber(stored);
      startCountdown();
    }
  }, []);

  const startCountdown = () => {
    setCountdown(3);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timerRef.current!);
          triggerCall();
          return 0;
        }
        return prev ? prev - 1 : 0;
      });
    }, 1000);
  };

  const triggerCall = () => {
    const stored = localStorage.getItem('emergencyPhoneNumber');
    if (stored) {
      window.location.href = `tel:${stored}`;
    }
  };

  const handleCancel = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setCountdown(null);
    setIsCancelled(true);
  };

  if (phoneNumber === null) {
    // Loading or no number set
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <p className="mb-4 text-xl">No emergency number set.</p>
        <Link href="/settings" className="px-6 py-3 bg-blue-600 rounded font-bold">
          Go to Settings
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pulse Animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-red-600 rounded-full opacity-20 animate-ping"></div>
      </div>

      <h1 className="text-4xl font-bold mb-8 z-10">Emergency Call</h1>

      {countdown !== null && countdown > 0 && (
        <div className="mb-8 text-center z-10">
          <p className="text-2xl mb-2">Calling in...</p>
          <div className="text-8xl font-bold text-red-500">{countdown}</div>
          <button
            onClick={handleCancel}
            className="mt-4 px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-full text-xl font-bold"
          >
            Cancel
          </button>
        </div>
      )}

      {(countdown === 0 || isCancelled) && (
        <div className="z-10 flex flex-col items-center">
          <EmergencyButton phoneNumber={phoneNumber} />
          <p className="mt-6 text-gray-400">Tap SOS to call immediately</p>

          <Link href="/settings" className="mt-12 text-gray-500 hover:text-white">
            Settings
          </Link>
        </div>
      )}
    </div>
  );
}
