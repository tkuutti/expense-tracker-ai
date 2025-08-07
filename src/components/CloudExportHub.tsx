'use client';

import React, { useState } from 'react';
import { 
  Cloud, 
  Zap, 
  Share2, 
  Clock, 
  BarChart3, 
  Plus, 
  Settings,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Download,
  History
} from 'lucide-react';
import { useExpenses } from '@/hooks/useExpenses';
import { useLanguage } from '@/hooks/useLanguage';
import { IntegratedService, ActivityItem, BackgroundJob } from '@/types';
import { IntegrationMarketplace } from './IntegrationMarketplace';
import { TemplateLibrary } from './TemplateLibrary';
import { ShareCenter } from './ShareCenter';

interface CloudExportHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CloudExportHub: React.FC<CloudExportHubProps> = ({ isOpen, onClose }) => {
  const { expenses } = useExpenses();
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<'overview' | 'integrations' | 'templates' | 'history' | 'automation'>('overview');

  // Mock data for demonstration
  const connectedServices: IntegratedService[] = [
    {
      id: 'google-sheets',
      name: 'google-sheets',
      displayName: t('googleSheets'),
      type: 'productivity',
      status: 'connected',
      icon: '📊',
      description: t('exportDirectlyToGoogleSheets'),
      capabilities: ['real-time-sync', 'auto-format', 'collaboration'],
      lastSync: new Date(),
      connectedAt: new Date(),
      isPopular: true,
      userCount: 1247,
    },
    {
      id: 'dropbox',
      name: 'dropbox',
      displayName: t('dropbox'),
      type: 'storage',
      status: 'connected',
      icon: '📦',
      description: t('storeExportsInDropbox'),
      capabilities: ['file-sync', 'version-history', 'sharing'],
      lastSync: new Date(Date.now() - 3600000),
      connectedAt: new Date(),
      userCount: 892,
    },
    {
      id: 'gmail',
      name: 'gmail',
      displayName: t('gmail'),
      type: 'communication',
      status: 'error',
      icon: '✉️',
      description: t('emailExportsAutomatically'),
      capabilities: ['automated-emails', 'scheduling', 'templates'],
      errorMessage: t('authenticationExpired'),
      userCount: 2341,
    }
  ];

  const recentActivity: ActivityItem[] = [
    {
      id: '1',
      type: 'export',
      title: t('monthlyReportExported'),
      description: `127 ${t('expensesExportedSuccessfully')}`,
      timestamp: new Date(Date.now() - 1800000),
      userId: 'current-user',
    },
    {
      id: '2',
      type: 'share',
      title: t('taxReportSharedWithTeam'),
      description: `${t('sharedWith')} 3 ${t('teamMembers')}`,
      timestamp: new Date(Date.now() - 3600000),
      userId: 'current-user',
    },
    {
      id: '3',
      type: 'connect',
      title: t('connectedDropbox'),
      description: t('successfullyConnectedStorage'),
      timestamp: new Date(Date.now() - 7200000),
      userId: 'current-user',
    },
  ];

  const backgroundJobs: BackgroundJob[] = [
    {
      id: '1',
      type: 'export',
      name: t('quarterlyFinancialReport'),
      description: t('exportingQ4Data'),
      status: 'running',
      progress: 67,
      startedAt: new Date(Date.now() - 300000),
      estimatedDuration: 120000,
      retryCount: 0,
      maxRetries: 3,
      priority: 'high',
    },
    {
      id: '2',
      type: 'sync',
      name: t('googleSheetsSync'),
      description: t('syncingRecentExpenses'),
      status: 'completed',
      progress: 100,
      startedAt: new Date(Date.now() - 600000),
      completedAt: new Date(Date.now() - 60000),
      retryCount: 0,
      maxRetries: 3,
      priority: 'medium',
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running':
      case 'connecting':
        return <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ${t('ago')}`;
    if (hours < 24) return `${hours}h ${t('ago')}`;
    return date.toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-t-xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Cloud className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t('cloudExportHub')}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('connectShare')} - {t('automation').toLowerCase()}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            {[
              { id: 'overview', label: t('overview'), icon: BarChart3 },
              { id: 'integrations', label: t('integrations'), icon: Zap },
              { id: 'templates', label: t('templates'), icon: Plus },
              { id: 'history', label: t('history'), icon: History },
              { id: 'automation', label: t('automation'), icon: Clock },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id as 'overview' | 'integrations' | 'templates' | 'history' | 'automation')}
                className={`
                  flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors
                  ${activeSection === id
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }
                `}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeSection === 'overview' && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{t('connectedServices')}</p>
                        <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                          {connectedServices.filter(s => s.status === 'connected').length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-500 rounded-lg">
                        <Share2 className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">{t('activeShares')}</p>
                        <p className="text-2xl font-bold text-green-900 dark:text-green-100">12</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-500 rounded-lg">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-purple-600 dark:text-purple-400">{t('scheduledExports')}</p>
                        <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">3</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-orange-500 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-orange-600 dark:text-orange-400">{t('dataExported')}</p>
                        <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{expenses.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Connected Services Status */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-blue-500" />
                    {t('serviceStatus')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {connectedServices.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{service.icon}</span>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{service.displayName}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {service.userCount?.toLocaleString()} {t('users')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(service.status)}
                          <span className={`text-sm font-medium ${
                            service.status === 'connected' ? 'text-green-600 dark:text-green-400' :
                            service.status === 'error' ? 'text-red-600 dark:text-red-400' :
                            'text-yellow-600 dark:text-yellow-400'
                          }`}>
                            {service.status === 'connected' ? t('connected') :
                             service.status === 'error' ? t('error') : t('disconnected')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Background Jobs */}
                {backgroundJobs.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-blue-500" />
                      {t('backgroundActivity')}
                    </h3>
                    <div className="space-y-4">
                      {backgroundJobs.map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(job.status)}
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{job.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{job.description}</p>
                            </div>
                          </div>
                          {job.status === 'running' && (
                            <div className="flex items-center space-x-3">
                              <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${job.progress}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {job.progress}%
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <History className="h-5 w-5 mr-2 text-blue-500" />
                    {t('recentActivity')}
                  </h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${
                          activity.type === 'export' ? 'bg-blue-100 dark:bg-blue-900/20' :
                          activity.type === 'share' ? 'bg-green-100 dark:bg-green-900/20' :
                          'bg-purple-100 dark:bg-purple-900/20'
                        }`}>
                          {activity.type === 'export' ? <Download className="h-4 w-4 text-blue-600 dark:text-blue-400" /> :
                           activity.type === 'share' ? <Share2 className="h-4 w-4 text-green-600 dark:text-green-400" /> :
                           <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {formatTimeAgo(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'integrations' && (
              <IntegrationMarketplace />
            )}

            {activeSection === 'templates' && (
              <TemplateLibrary />
            )}

            {activeSection === 'history' && (
              <ShareCenter />
            )}

            {activeSection === 'automation' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {t('automationStudio')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('automationFeatures')}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-xl">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                {t('allSystemsOperational')}
              </span>
              <span>{t('lastUpdated')}: {new Date().toLocaleTimeString()}</span>
            </div>
            
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                {t('viewDocumentation')}
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-md hover:from-blue-600 hover:to-purple-600 transition-colors">
                {t('quickExport')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};