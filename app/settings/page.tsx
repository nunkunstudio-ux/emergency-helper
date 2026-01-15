'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('emergencyPhoneNumber');
        if (stored) {
            setPhoneNumber(stored);
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('emergencyPhoneNumber', phoneNumber);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            <div className="w-full max-w-md space-y-4">
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Emergency Phone Number
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="e.g. 191 or 0812345678"
                        className="w-full p-4 rounded bg-gray-800 border border-gray-700 focus:border-red-500 focus:outline-none text-xl"
                    />
                </div>

                <button
                    onClick={handleSave}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded font-bold text-lg transition-colors"
                >
                    {saved ? 'Saved!' : 'Save Number'}
                </button>

                <Link href="/" className="block text-center text-gray-400 hover:text-white mt-4">
                    &larr; Back to Home
                </Link>
            </div>
        </div>
    );
}
