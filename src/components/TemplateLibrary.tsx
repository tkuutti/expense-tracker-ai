'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  Eye, 
  Users, 
  DollarSign,
  Building,
  FileText,
  Filter,
  Sparkles,
  Play,
  Heart,
  Share2
} from 'lucide-react';
import { ExportTemplate, TemplateCategory } from '@/types';
import { useLanguage } from '@/hooks/useLanguage';

interface TemplateLibraryProps {
  onTemplateSelect?: (template: ExportTemplate) => void;
  onTemplatePreview?: (template: ExportTemplate) => void;
}

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({
  onTemplateSelect,
  onTemplatePreview
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'all'>('all');

  // Mock template data
  const templates: ExportTemplate[] = [
    {
      id: 'tax-report-2024',
      name: 'Tax Preparation Report',
      description: 'Comprehensive expense report optimized for tax preparation with IRS-compliant categories and deduction tracking.',
      category: 'tax',
      format: 'pdf',
      icon: '🏛️',
      fields: ['date', 'description', 'category', 'amount', 'tax-deductible', 'receipt-attached'],
      filters: { 
        dateRange: 'tax-year',
        categories: ['business', 'medical', 'charitable'],
        includeReceipts: true 
      },
      customization: {
        includeSummary: true,
        groupByCategory: true,
        includeTaxNotes: true
      },
      isBuiltIn: true,
      isPublic: true,
      usageCount: 2847,
      rating: 4.9,
      tags: ['tax', 'irs', 'deductions', 'professional'],
      previewData: [
        { date: '2024-01-15', description: 'Office supplies', category: 'Business', amount: '$127.50', deductible: 'Yes' },
        { date: '2024-01-20', description: 'Medical appointment', category: 'Medical', amount: '$250.00', deductible: 'Yes' },
      ]
    },
    {
      id: 'monthly-business-summary',
      name: 'Monthly Business Summary',
      description: 'Professional monthly expense overview with charts, trends, and budget comparison for business reporting.',
      category: 'business',
      format: 'excel',
      icon: '📊',
      fields: ['date', 'category', 'amount', 'vendor', 'budget-variance'],
      filters: { 
        dateRange: 'current-month',
        includeCharts: true,
        budgetComparison: true 
      },
      customization: {
        includeCharts: true,
        showTrends: true,
        budgetAlert: true
      },
      isBuiltIn: true,
      isPublic: true,
      usageCount: 1934,
      rating: 4.7,
      tags: ['business', 'monthly', 'charts', 'budget'],
      previewData: [
        { category: 'Food', amount: '$450.25', budget: '$500.00', variance: '-$49.75' },
        { category: 'Transportation', amount: '$180.50', budget: '$200.00', variance: '-$19.50' },
      ]
    },
    {
      id: 'quarterly-financial-review',
      name: 'Quarterly Financial Review',
      description: 'Executive-level quarterly expense analysis with KPIs, trends, and strategic insights for stakeholder reporting.',
      category: 'financial',
      format: 'pdf',
      icon: '📈',
      fields: ['category', 'quarter-total', 'yoy-change', 'budget-variance', 'kpis'],
      filters: { 
        dateRange: 'quarter',
        includeKPIs: true,
        executiveSummary: true 
      },
      customization: {
        executiveSummary: true,
        industryBenchmarks: true,
        actionableInsights: true
      },
      isBuiltIn: true,
      isPublic: true,
      usageCount: 756,
      rating: 4.8,
      tags: ['quarterly', 'executive', 'kpis', 'strategic'],
      previewData: [
        { category: 'Total Expenses', q4_2024: '$12,450', q4_2023: '$11,200', change: '+11.2%' },
        { category: 'Cost per Transaction', current: '$23.45', target: '$20.00', variance: '+17.3%' },
      ]
    },
    {
      id: 'personal-budget-tracker',
      name: 'Personal Budget Tracker',
      description: 'Simple and clean personal expense tracking with budget goals, savings insights, and spending patterns.',
      category: 'personal',
      format: 'csv',
      icon: '💰',
      fields: ['date', 'description', 'category', 'amount', 'budget-category'],
      filters: { 
        personalCategories: true,
        budgetGoals: true,
        savingsTracking: true 
      },
      customization: {
        budgetAlerts: true,
        savingsGoals: true,
        spendingInsights: true
      },
      isBuiltIn: true,
      isPublic: true,
      usageCount: 4521,
      rating: 4.6,
      tags: ['personal', 'budget', 'savings', 'goals'],
      previewData: [
        { date: '2024-08-01', description: 'Grocery shopping', category: 'Food', amount: '$67.85', budget: 'Essential' },
        { date: '2024-08-02', description: 'Coffee shop', category: 'Entertainment', amount: '$4.50', budget: 'Discretionary' },
      ]
    },
    {
      id: 'travel-expense-report',
      name: 'Travel Expense Report',
      description: 'Detailed travel and entertainment expense tracking with mileage, per diem, and reimbursement calculations.',
      category: 'business',
      format: 'pdf',
      icon: '✈️',
      fields: ['date', 'location', 'purpose', 'amount', 'mileage', 'per-diem', 'reimbursable'],
      filters: { 
        travelOnly: true,
        reimbursable: true,
        mileageTracking: true 
      },
      customization: {
        mileageRate: true,
        perDiemRates: true,
        clientCoding: true
      },
      isBuiltIn: true,
      isPublic: true,
      usageCount: 1287,
      rating: 4.5,
      tags: ['travel', 'mileage', 'reimbursement', 'per-diem'],
      previewData: [
        { date: '2024-07-15', location: 'San Francisco', purpose: 'Client meeting', amount: '$245.67', reimbursable: 'Yes' },
        { date: '2024-07-16', location: 'San Francisco', purpose: 'Hotel', amount: '$189.00', reimbursable: 'Yes' },
      ]
    },
    {
      id: 'vendor-analysis-report',
      name: 'Vendor Analysis Report',
      description: 'Comprehensive vendor spending analysis with payment terms, volume discounts, and contract optimization insights.',
      category: 'business',
      format: 'excel',
      icon: '🏢',
      fields: ['vendor', 'category', 'total-spend', 'transaction-count', 'avg-amount', 'payment-terms'],
      filters: { 
        vendorGrouping: true,
        paymentAnalysis: true,
        contractOptimization: true 
      },
      customization: {
        volumeDiscounts: true,
        paymentTerms: true,
        negotiations: true
      },
      isBuiltIn: true,
      isPublic: true,
      usageCount: 892,
      rating: 4.4,
      tags: ['vendor', 'procurement', 'contracts', 'optimization'],
      previewData: [
        { vendor: 'Office Depot', spend: '$2,450.67', transactions: 23, avg: '$106.55', terms: 'Net 30' },
        { vendor: 'Amazon Business', spend: '$1,890.23', transactions: 45, avg: '$42.01', terms: 'Net 15' },
      ]
    }
  ];

  const categories: { type: TemplateCategory | 'all'; label: string; icon: React.ReactNode; count: number }[] = [
    { type: 'all', label: t('allTemplates'), icon: <Sparkles className="h-4 w-4" />, count: templates.length },
    { type: 'tax', label: t('taxReports'), icon: <FileText className="h-4 w-4" />, count: templates.filter(t => t.category === 'tax').length },
    { type: 'business', label: t('business'), icon: <Building className="h-4 w-4" />, count: templates.filter(t => t.category === 'business').length },
    { type: 'financial', label: t('financial'), icon: <DollarSign className="h-4 w-4" />, count: templates.filter(t => t.category === 'financial').length },
    { type: 'personal', label: t('personal'), icon: <Heart className="h-4 w-4" />, count: templates.filter(t => t.category === 'personal').length },
    { type: 'compliance', label: t('compliance'), icon: <FileText className="h-4 w-4" />, count: templates.filter(t => t.category === 'compliance').length },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = searchQuery === '' || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template: ExportTemplate) => {
    onTemplateSelect?.(template);
  };

  const handlePreviewTemplate = (template: ExportTemplate) => {
    onTemplatePreview?.(template);
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return '📄';
      case 'excel': return '📊';
      case 'csv': return '📋';
      case 'json': return '🔧';
      default: return '📄';
    }
  };

  const formatUsageCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t('exportTemplateLibrary')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {t('professionalTemplatesDesigned')}
        </p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('searchTemplates')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as TemplateCategory | 'all')}
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

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 relative group"
          >
            {/* Template Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center text-2xl">
                  {template.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight">
                    {template.name}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                      {getFormatIcon(template.format)} {template.format.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
              {template.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {formatUsageCount(template.usageCount || 0)}
                </div>
                <div className="flex items-center">
                  <Star className="h-3 w-3 mr-1 text-yellow-500 fill-current" />
                  {template.rating}
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handlePreviewTemplate(template)}
                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  title={t('previewTemplate')}
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title={t('addToFavorites')}
                >
                  <Heart className="h-4 w-4" />
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                  title={t('shareTemplate')}
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {template.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-md"
                >
                  #{tag}
                </span>
              ))}
              {template.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md">
                  +{template.tags.length - 3}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => handlePreviewTemplate(template)}
                className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>{t('preview')}</span>
              </button>
              <button
                onClick={() => handleUseTemplate(template)}
                className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>{t('useTemplate')}</span>
              </button>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded-xl" />
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('noTemplatesFound')}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {t('tryAdjustingSearchCategories')}
          </p>
        </div>
      )}

      {/* Community Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">{t('communityTemplates')}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('createCustomTemplates')}
        </p>
        <div className="flex justify-center space-x-3">
          <button className="px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
            {t('browseCommunity')}
          </button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium">
            {t('createTemplate')}
          </button>
        </div>
      </div>
    </div>
  );
};