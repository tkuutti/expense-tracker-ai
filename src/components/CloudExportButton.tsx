'use client';

import React, { useState } from 'react';
import { Cloud, Zap, Share2, Users, Globe } from 'lucide-react';
import { useExpenses } from '@/hooks/useExpenses';
import { CloudExportHub } from './CloudExportHub';

export const CloudExportButton: React.FC = () => {
  const { expenses } = useExpenses();
  const [isHubOpen, setIsHubOpen] = useState(false);

  const handleOpenHub = () => {
    setIsHubOpen(true);
  };

  const handleCloseHub = () => {
    setIsHubOpen(false);
  };

  return (
    <>
      <div className="relative group">
        {/* Main Cloud Export Button */}
        <button
          onClick={handleOpenHub}
          disabled={expenses.length === 0}
          className="relative overflow-hidden inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-105"
        >
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Cloud icon with subtle animation */}
          <div className="relative">
            <Cloud className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full opacity-75 animate-pulse" />
          </div>
          
          <span className="relative font-semibold">Connect & Share</span>
          
          {/* Connectivity indicator */}
          <div className="relative flex items-center">
            <Zap className="h-4 w-4 text-yellow-300" />
            <div className="absolute inset-0 bg-yellow-300 rounded-full opacity-30 animate-ping" />
          </div>
        </button>

        {/* Service indicators */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-xs">
            📊
          </div>
          <div className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-xs">
            📧
          </div>
          <div className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-xs">
            📦
          </div>
        </div>
      </div>

      {/* Feature preview tooltip */}
      <div className="absolute top-full mt-2 left-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 max-w-sm mx-auto">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <Globe className="h-4 w-4 mr-2 text-blue-500" />
            Cloud Export Hub
          </h4>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <Share2 className="h-3 w-3 mr-2 text-green-500" />
              Share with team & generate links
            </div>
            <div className="flex items-center">
              <Zap className="h-3 w-3 mr-2 text-yellow-500" />
              Connect Google Sheets, Dropbox & more
            </div>
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-2 text-purple-500" />
              Collaborate & automate exports
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">
                {expenses.length} expenses ready
              </span>
              <span className="flex items-center text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                3 services connected
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Cloud Export Hub Modal */}
      <CloudExportHub
        isOpen={isHubOpen}
        onClose={handleCloseHub}
      />
    </>
  );
};