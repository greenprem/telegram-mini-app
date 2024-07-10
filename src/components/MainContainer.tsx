// src/components/MainContainer.tsx
'use client';
import React, { useState } from 'react';
import NavBar from './NavBar';
import MainContent from './MainContent';
import TaskList from './TaskList';
import DailyEarn from './DailyEarn';

const MainContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Home');
  const [isCollected, setIsCollected] = useState<boolean>(false);

  const handleCollect = () => {
    setIsCollected(true);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      
        {!isCollected && <DailyEarn onCollect={handleCollect} />}
        {isCollected && activeTab === 'Home' && <MainContent />}
        {activeTab === 'Tasks' && <TaskList />}
        {activeTab === 'Friends' && <div className="p-4">Friends Content</div>}
        {activeTab === 'Activity' && <div className="p-4">Activity Content</div>}
        {activeTab === 'Wallet' && <div className="p-4">Wallet Content</div>}
      
      <NavBar setActiveTab={setActiveTab} />
    </div>
  );
};

export default MainContainer;
