'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  Zap, 
  CheckCircle, 
  ExternalLink,
  Sparkles,
  TrendingUp,
  Shield,
  Cloud,
  Database,
  Mail,
  FileText,
  Bot
} from 'lucide-react';
import { IntegratedService, ServiceType } from '@/types';

interface IntegrationMarketplaceProps {
  onServiceConnect?: (serviceId: string) => void;
}

export const IntegrationMarketplace: React.FC<IntegrationMarketplaceProps> = ({
  onServiceConnect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceType | 'all'>('all');

  // Mock integration marketplace data
  const availableServices: IntegratedService[] = [
    {
      id: 'google-sheets',
      name: 'google-sheets',
      displayName: 'Google Sheets',
      type: 'productivity',
      status: 'connected',
      icon: '📊',
      description: 'Export data directly to Google Sheets with real-time sync and collaboration features.',
      capabilities: ['real-time-sync', 'auto-format', 'collaboration', 'formulas'],
      isPopular: true,
      userCount: 1247,
    },
    {
      id: 'dropbox',
      name: 'dropbox',
      displayName: 'Dropbox',
      type: 'storage',
      status: 'disconnected',
      icon: '📦',
      description: 'Automatically save exports to your Dropbox with version history and sharing.',
      capabilities: ['file-sync', 'version-history', 'sharing', 'backup'],
      userCount: 892,
    },
    {
      id: 'gmail',
      name: 'gmail',
      displayName: 'Gmail',
      type: 'communication',
      status: 'disconnected',
      icon: '✉️',
      description: 'Send automated email reports with customizable templates and scheduling.',
      capabilities: ['automated-emails', 'scheduling', 'templates', 'attachments'],
      userCount: 2341,
    },
    {
      id: 'slack',
      name: 'slack',
      displayName: 'Slack',
      type: 'communication',
      status: 'disconnected',
      icon: '💬',
      description: 'Post expense summaries and alerts to Slack channels automatically.',
      capabilities: ['channel-posting', 'notifications', 'bot-commands', 'threading'],
      userCount: 567,
    },
    {
      id: 'onedrive',
      name: 'onedrive',
      displayName: 'OneDrive',
      type: 'storage',
      status: 'disconnected',
      icon: '☁️',
      description: 'Store and sync exports with Microsoft OneDrive for seamless Office integration.',
      capabilities: ['office-integration', 'sync', 'sharing', 'collaboration'],
      userCount: 734,
    },
    {
      id: 'zapier',
      name: 'zapier',
      displayName: 'Zapier',
      type: 'automation',
      status: 'disconnected',
      icon: '⚡',
      description: 'Connect to 5000+ apps with custom automation workflows and triggers.',
      capabilities: ['workflow-automation', 'triggers', 'custom-actions', 'webhooks'],
      userCount: 445,
    },
    {
      id: 'excel-online',
      name: 'excel-online',
      displayName: 'Excel Online',
      type: 'productivity',
      status: 'disconnected',
      icon: '📈',
      description: 'Export to Excel Online with advanced formulas and pivot table generation.',
      capabilities: ['formulas', 'pivot-tables', 'charts', 'collaboration'],
      userCount: 1089,
    },
    {
      id: 'tableau',
      name: 'tableau',
      displayName: 'Tableau',
      type: 'analytics',
      status: 'disconnected',
      icon: '📊',
      description: 'Create powerful visualizations and dashboards from your expense data.',
      capabilities: ['data-visualization', 'dashboards', 'analytics', 'reporting'],
      userCount: 234,
    },
    {
      id: 'power-bi',
      name: 'power-bi',
      displayName: 'Power BI',
      type: 'analytics',
      status: 'disconnected',
      icon: '⚡',
      description: 'Build interactive reports and business intelligence dashboards.',
      capabilities: ['business-intelligence', 'interactive-reports', 'data-modeling'],
      userCount: 445,
    },
    {
      id: 'airtable',
      name: 'airtable',
      displayName: 'Airtable',
      type: 'productivity',
      status: 'disconnected',
      icon: '🗃️',
      description: 'Organize expenses in flexible databases with rich field types and views.',
      capabilities: ['database-management', 'custom-fields', 'views', 'collaboration'],
      userCount: 678,
    },
    {
      id: 'notion',
      name: 'notion',
      displayName: 'Notion',
      type: 'productivity',
      status: 'disconnected',
      icon: '📝',
      description: 'Create expense documentation and reports in your Notion workspace.',
      capabilities: ['documentation', 'templates', 'databases', 'collaboration'],
      userCount: 923,
    },
    {
      id: 'webhooks',
      name: 'webhooks',
      displayName: 'Custom Webhooks',
      type: 'automation',
      status: 'disconnected',
      icon: '🔗',
      description: 'Send data to any REST API endpoint with custom payload formatting.',
      capabilities: ['custom-endpoints', 'payload-formatting', 'authentication'],
      userCount: 156,
    }
  ];

  const categories: { type: ServiceType | 'all'; label: string; icon: React.ReactNode; count: number }[] = [
    { type: 'all', label: 'All Services', icon: <Sparkles className="h-4 w-4" />, count: availableServices.length },
    { type: 'productivity', label: 'Productivity', icon: <FileText className="h-4 w-4" />, count: availableServices.filter(s => s.type === 'productivity').length },
    { type: 'storage', label: 'Cloud Storage', icon: <Cloud className="h-4 w-4" />, count: availableServices.filter(s => s.type === 'storage').length },
    { type: 'communication', label: 'Communication', icon: <Mail className="h-4 w-4" />, count: availableServices.filter(s => s.type === 'communication').length },
    { type: 'automation', label: 'Automation', icon: <Bot className="h-4 w-4" />, count: availableServices.filter(s => s.type === 'automation').length },
    { type: 'analytics', label: 'Analytics', icon: <TrendingUp className="h-4 w-4" />, count: availableServices.filter(s => s.type === 'analytics').length },
  ];

  const filteredServices = availableServices.filter(service => {
    const matchesSearch = searchQuery === '' || 
      service.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || service.type === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleConnect = (serviceId: string) => {
    // Simulate OAuth connection flow
    const service = availableServices.find(s => s.id === serviceId);
    if (service) {
      // In a real app, this would open OAuth flow
      alert(`Connecting to ${service.displayName}...\n\nThis would open the OAuth flow for ${service.displayName} integration.`);
      onServiceConnect?.(serviceId);
    }
  };

  const getServiceIcon = (type: ServiceType) => {
    switch (type) {
      case 'productivity': return <FileText className="h-4 w-4" />;
      case 'storage': return <Cloud className="h-4 w-4" />;
      case 'communication': return <Mail className="h-4 w-4" />;
      case 'automation': return <Bot className="h-4 w-4" />;
      case 'analytics': return <TrendingUp className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Integration Marketplace
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Connect your expense data to 15+ popular services and automate your workflow
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as ServiceType | 'all')}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category.type} value={category.type}>
                {category.label} ({category.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.type}
            onClick={() => setSelectedCategory(category.type)}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedCategory === category.type
                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }
            `}
          >
            {category.icon}
            {category.label}
            <span className="bg-white dark:bg-gray-600 text-xs px-2 py-0.5 rounded-full">
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 relative overflow-hidden group"
          >
            {/* Popular badge */}
            {service.isPopular && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                <Star className="h-3 w-3 mr-1" />
                Popular
              </div>
            )}

            {/* Service Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-2xl">
                  {service.icon}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                  {service.displayName}
                </h4>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    {getServiceIcon(service.type)}
                    <span className="ml-1 capitalize">{service.type}</span>
                  </div>
                  {service.status === 'connected' && (
                    <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Connected
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
              {service.description}
            </p>

            {/* Capabilities */}
            <div className="flex flex-wrap gap-1 mb-4">
              {service.capabilities.slice(0, 3).map((capability) => (
                <span
                  key={capability}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md"
                >
                  {capability.replace('-', ' ')}
                </span>
              ))}
              {service.capabilities.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md">
                  +{service.capabilities.length - 3} more
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Users className="h-4 w-4 mr-1" />
                {service.userCount?.toLocaleString()} users
              </div>
              <div className="flex items-center text-sm text-yellow-500">
                <Star className="h-4 w-4 mr-1 fill-current" />
                {(4.2 + Math.random() * 0.7).toFixed(1)}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleConnect(service.id)}
              disabled={service.status === 'connected'}
              className={`
                w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2
                ${service.status === 'connected'
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 cursor-default'
                  : 'bg-blue-600 hover:bg-blue-700 text-white group-hover:shadow-md'
                }
              `}
            >
              {service.status === 'connected' ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <span>Connected</span>
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  <span>Connect</span>
                  <ExternalLink className="h-3 w-3 opacity-70" />
                </>
              )}
            </button>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No integrations found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Shield className="h-5 w-5 text-green-500" />
          <span className="font-medium text-gray-900 dark:text-white">Enterprise Security</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          All integrations use OAuth 2.0 and enterprise-grade security. Your data is encrypted in transit and at rest.
        </p>
        <div className="flex items-center justify-center space-x-6 text-xs text-gray-500 dark:text-gray-400">
          <span>SOC 2 Compliant</span>
          <span>GDPR Ready</span>
          <span>24/7 Monitoring</span>
        </div>
      </div>
    </div>
  );
};