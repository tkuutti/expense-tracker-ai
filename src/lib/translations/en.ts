import { Translations } from '@/types/language';

export const en: Translations = {
  // Navigation
  dashboard: 'Dashboard',
  categories: 'Categories', 
  expenses: 'Expenses',
  topVendors: 'Top Vendors',
  insights: 'Insights',
  addExpense: 'Add Expense',
  
  // App title and branding
  appTitle: 'Expense Tracker',
  
  // Expense categories
  food: 'Food',
  transportation: 'Transportation',
  entertainment: 'Entertainment',
  shopping: 'Shopping',
  bills: 'Bills',
  other: 'Other',
  
  // Form labels
  amount: 'Amount',
  category: 'Category',
  description: 'Description',
  vendor: 'Vendor',
  date: 'Date',
  
  // Buttons
  save: 'Save',
  cancel: 'Cancel',
  edit: 'Edit',
  delete: 'Delete',
  add: 'Add',
  export: 'Export',
  
  // Validation messages
  pleaseEnterAmount: 'Please enter an amount',
  pleaseEnterValidAmount: 'Please enter a valid amount (e.g., 15.50)',
  amountMustBePositive: 'Amount must be greater than 0',
  pleaseEnterDescription: 'Please enter a description',
  pleaseEnterVendor: 'Please enter a vendor/payee',
  
  // Dashboard
  totalExpenses: 'Total Expenses',
  monthlyTotal: 'Monthly Total',
  noExpenses: 'No expenses recorded yet',
  expensesOverTime: 'Expenses Over Time',
  expensesByCategory: 'Expenses by Category',
  
  // Expense list
  recentExpenses: 'Recent Expenses',
  noExpensesFound: 'No expenses found',
  filterByCategory: 'Filter by category',
  searchExpenses: 'Search expenses...',
  all: 'All',
  
  // Vendor analytics
  totalVendors: 'Total Vendors',
  totalSpent: 'Total Spent',
  averagePerVendor: 'Average per Vendor',
  mostExpensiveVendor: 'Most Expensive Vendor',
  transactionCount: 'Transactions',
  lastTransaction: 'Last Transaction',
  
  // Monthly insights
  monthlyTrends: 'Monthly Trends',
  averageDaily: 'Average Daily',
  highestDay: 'Highest Day',
  lowestDay: 'Lowest Day',
  
  // Language selector
  selectLanguage: 'Select Language',
  english: 'English',
  finnish: 'Finnish',
  
  // Date formats and currency
  dateFormat: 'MM/dd/yyyy',
  currencySymbol: '€',
  
  // Additional labels and messages
  enterExpenseDescription: 'Enter expense description',
  enterVendorName: 'Enter vendor or payee name',
  startAddingExpenses: 'Start adding expenses to see analytics and insights here',
  startAddingExpensesVendor: 'Start adding expenses with vendor information to see vendor analytics here',
  startAddingExpensesCategory: 'Start adding expenses to see category analytics',
  noExpensesFoundPeriod: 'No expenses found for the selected time period. Try adjusting the time frame',
  noExpensesFoundCriteria: 'No expenses found matching your criteria',
  withExpenses: 'with expenses',
  actions: 'Actions',
  
  // Sort options
  sortByAmount: 'Sort by Amount',
  sortByPercentage: 'Sort by %',
  sortByCount: 'Sort by Count',
  
  // Table headers
  dateLabel: 'Date',
  categoryLabel: 'Category',
  descriptionLabel: 'Description',
  vendorLabel: 'Vendor',
  amountLabel: 'Amount',
  
  // Additional missing translations
  confirmDelete: 'Are you sure you want to delete',
  unknown: 'Unknown',
  editExpense: 'Edit expense',
  deleteExpense: 'Delete expense',
  monthlyInsights: 'Monthly Insights',
  total: 'Total',
  spending: 'Spending',
  budgetStreak: 'Budget Streak',
  days: 'days',
  
  // More missing translations
  topCategory: 'Top Category',
  activeCategories: 'Active Categories',
  pleaseSelectDate: 'Please select a date',
  switchToLightMode: 'Switch to light mode',
  switchToDarkMode: 'Switch to dark mode',
  mode: 'mode',
  
  // Filter translations
  filters: 'Filters',
  search: 'Search',
  fromDate: 'From Date',
  toDate: 'To Date',
  allVendors: 'All Vendors',
  selectStartDate: 'Select start date',
  selectEndDate: 'Select end date',
  clearAllFilters: 'Clear all filters',
  
  // Time frame translations
  currentMonth: 'Current Month',
  lastMonth: 'Last Month',
  lastThreeMonths: 'Last 3 Months',
  allTime: 'All Time',
  
  // Statistics translations
  averageAmount: 'Average Amount',
  transactions: 'Transactions',
  
  // Additional label translations
  average: 'Average',
  
  // Page descriptions
  analyzeSpendingPatterns: 'Analyze your spending patterns by category',
  
  // View mode translations
  tableView: 'Table View',
  cardView: 'Card View',
  viewDetails: 'View Details',
  
  // Cloud Export Hub translations
  connectShare: 'Connect & Share',
  cloudExportHub: 'Cloud Export Hub',
  overview: 'Overview',
  integrations: 'Integrations',
  templates: 'Templates',
  history: 'History',
  automation: 'Automation',
  connectedServices: 'Connected Services',
  activeShares: 'Active Shares',
  scheduledExports: 'Scheduled Exports',
  dataExported: 'Data Exported',
  serviceStatus: 'Service Status',
  backgroundActivity: 'Background Activity',
  connected: 'Connected',
  error: 'Error',
  users: 'users',
  allSystemsOperational: 'All systems operational',
  lastUpdated: 'Last updated',
  viewDocumentation: 'View Documentation',
  quickExport: 'Quick Export',
  
  // Additional action labels
  toiminnot: 'ACTIONS',
  
  // Cloud Export Hub detailed translations
  googleSheets: 'Google Sheets',
  dropbox: 'Dropbox',
  gmail: 'Gmail',
  exportDirectlyToGoogleSheets: 'Export directly to Google Sheets',
  storeExportsInDropbox: 'Store exports in your Dropbox',
  monthlyReportExported: 'Monthly Report exported to Google Sheets',
  connectedDropbox: 'Connected Dropbox',
  quarterlyFinancialReport: 'Quarterly Financial Report',
  exportingQ4Data: 'Exporting Q4 2024 data to PDF',
  googleSheetsSync: 'Google Sheets Sync',
  syncingRecentExpenses: 'Syncing recent expenses',
  connectGoogleSheetsDropbox: 'Connect Google Sheets, Dropbox & more',
  exportDataDirectly: 'Export data directly to Google Sheets with real-time sync and collaboration features.',
  automaticallySaveExports: 'Automatically save exports to your Dropbox with version history and sharing.',
  emailReports: 'Email reports directly to stakeholders with customizable templates and scheduling.',
  scheduleAutomaticReports: 'Schedule automatic reports and expense summaries to your Slack channels.',
  slackIntegration: 'Slack Integration',
  postUpdatesToSlack: 'Post updates to Slack',
  zapierAutomation: 'Zapier Automation',
  connectHundredsOfApps: 'Connect to hundreds of apps and automate your expense workflows.',
  
  // Additional translations for CloudExportHub
  sharedWith: 'shared with',
  
  // Missing translations for untranslated text
  noExpensesToExport: 'No expenses to export',
  exportCSV: 'Export CSV',
  noVendorDataAvailable: 'No vendor data available',
  addVendorInfoMessage: 'Add vendor information to your expenses to see the top vendors chart. You can edit existing expenses or add new ones with vendor details.',
  avgShort: 'Avg:',
  lastShort: 'Last:',
  connectingTo: 'Connecting to',
  oauthFlowMessage: 'This will open a new window to authorize',
  invitationSentTo: 'Invitation sent to',
  moreCapabilities: 'more',
  
  // CloudExportHub missing translations
  expensesExportedSuccessfully: 'expenses exported successfully',
  teamMembers: 'team members',
  taxReportSharedWithTeam: 'Tax Report shared with team',
  successfullyConnectedStorage: 'Successfully connected storage',
  emailExportsAutomatically: 'Email exports automatically',
  authenticationExpired: 'Authentication expired',
  ago: 'ago',
  disconnected: 'Disconnected',
  recentActivity: 'Recent Activity',
  automationStudio: 'Automation Studio',
  automationFeatures: 'Create custom workflows with triggers, conditions, and actions',
  
  // ShareCenter missing translations
  shareAndCollaborate: 'Share & Collaborate',
  generateSecureLinks: 'Generate secure links to share your expense reports',
  views: 'views',
  downloads: 'downloads',
  shareableLink: 'Shareable Link',
  publicAccess: 'Public Access',
  allowDownload: 'Allow Download',
  allowComments: 'Allow Comments',
  viewOnly: 'View Only',
  canComment: 'Can Comment',
  canEdit: 'Can Edit',
  generateLinkToSeeUrl: 'Generate link to see URL',
  copied: 'Copied!',
  copy: 'Copy',
  generateSecureLink: 'Generate Secure Link',
  qrCode: 'QR Code',
  hide: 'Hide',
  show: 'Show',
  scanToAccessReport: 'Scan to access expense report',
  downloadQRCode: 'Download QR Code',
  socialMedia: 'Social Media',
  enterEmailToInvite: 'Enter email to invite',
  invite: 'Invite',
  lastActive: 'Last active',
  never: 'Never',
  shareAnalytics: 'Share Analytics',
  totalViews: 'Total Views',
  comments: 'Comments',
  shares: 'Shares',
  
  // IntegrationMarketplace missing translations
  postExpenseSummaries: 'Post expense summaries to Slack',
  storeAndSyncOneDrive: 'Store and sync your data with OneDrive',
  connectToAppsZapier: 'Connect to 5000+ apps with Zapier',
  exportToExcelOnline: 'Export to Excel Online with formulas and charts',
  createVisualizationsTableau: 'Create advanced visualizations with Tableau',
  buildInteractiveReportsPowerBI: 'Build interactive reports with Power BI',
  organizeExpensesAirtable: 'Organize expenses in Airtable databases',
  createExpenseDocumentationNotion: 'Create expense documentation in Notion',
  sendDataWebhooks: 'Send data to custom webhook endpoints',
  allServices: 'All Services',
  productivity: 'Productivity',
  cloudStorage: 'Cloud Storage',
  communication: 'Communication',
  analytics: 'Analytics',
  integration: 'integration',
  integrationMarketplace: 'Integration Marketplace',
  connectYourExpenseData: 'Connect your expense data to your favorite tools',
  searchIntegrations: 'Search integrations...',
  popular: 'Popular',
  connect: 'Connect',
  noIntegrationsFound: 'No integrations found',
  tryAdjustingSearch: 'Try adjusting your search or filters',
  enterpriseSecurity: 'Enterprise Security',
  allIntegrationsSecure: 'All integrations use secure OAuth 2.0 authentication',
  soc2Compliant: 'SOC 2 Compliant',
  gdprReady: 'GDPR Ready',
  monitoringFullTime: '24/7 Monitoring',
  
  // TemplateLibrary missing translations
  exportTemplateLibrary: 'Export Template Library',
  professionalTemplatesDesigned: 'Professional templates designed for every reporting need',
  searchTemplates: 'Search templates...',
  allTemplates: 'All Templates',
  taxReports: 'Tax Reports',
  business: 'Business',
  financial: 'Financial',
  personal: 'Personal',
  compliance: 'Compliance',
  preview: 'Preview',
  useTemplate: 'Use Template',
  previewTemplate: 'Preview template',
  addToFavorites: 'Add to favorites',
  shareTemplate: 'Share template',
  noTemplatesFound: 'No templates found',
  tryAdjustingSearchCategories: 'Try adjusting your search or category filters',
  communityTemplates: 'Community Templates',
  createCustomTemplates: 'Share and discover custom templates created by the community',
  browseCommunity: 'Browse Community',
  createTemplate: 'Create Template',
};