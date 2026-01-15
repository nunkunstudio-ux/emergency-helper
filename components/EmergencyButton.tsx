import React from 'react';

interface EmergencyButtonProps {
    phoneNumber: string;
    onClick?: () => void;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ phoneNumber, onClick }) => {
    return (
        <a
            href={`tel:${phoneNumber}`}
            onClick={onClick}
            className="flex items-center justify-center w-64 h-64 rounded-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-4xl shadow-lg transition-transform transform hover:scale-105 active:scale-95 animate-pulse"
        >
            SOS
        </a>
    );
};

export default EmergencyButton;
