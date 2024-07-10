// src/components/NavBar.tsx
import React from 'react';
import { FaHome, FaClipboardList, FaUsers, FaTrophy, FaWallet } from 'react-icons/fa';

interface NavBarProps {
  setActiveTab: (tab: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around items-center py-2">
      <button onClick={() => setActiveTab('Home')} className="flex flex-col items-center text-blue-600">
        <FaHome size={24} />
        <span className="text-xs">Home</span>
      </button>
      <button onClick={() => setActiveTab('Tasks')} className="flex flex-col items-center text-blue-600">
        <FaClipboardList size={24} />
        <span className="text-xs">Tasks</span>
      </button>
      <button onClick={() => setActiveTab('Friends')} className="flex flex-col items-center text-blue-600">
        <FaUsers size={24} />
        <span className="text-xs">Friends</span>
      </button>
      <button onClick={() => setActiveTab('Activity')} className="flex flex-col items-center text-blue-600">
        <FaTrophy size={24} />
        <span className="text-xs">Activity</span>
      </button>
      <button onClick={() => setActiveTab('Wallet')} className="flex flex-col items-center text-blue-600">
        <FaWallet size={24} />
        <span className="text-xs">Wallet</span>
      </button>
    </nav>
  );
};

export default NavBar;
