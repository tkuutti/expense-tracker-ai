export type Language = 'en' | 'fi';

export interface LanguageContextType {
  language: Language;
  changeLanguage: (language: Language) => void;
  t: (key: string) => string;
}

export interface Translations {
  // Navigation
  dashboard: string;
  categories: string;
  expenses: string;
  topVendors: string;
  insights: string;
  addExpense: string;
  
  // App title and branding
  appTitle: string;
  
  // Expense categories
  food: string;
  transportation: string;
  entertainment: string;
  shopping: string;
  bills: string;
  other: string;
  
  // Form labels
  amount: string;
  category: string;
  description: string;
  vendor: string;
  date: string;
  
  // Buttons
  save: string;
  cancel: string;
  edit: string;
  delete: string;
  add: string;
  export: string;
  
  // Validation messages
  pleaseEnterAmount: string;
  pleaseEnterValidAmount: string;
  amountMustBePositive: string;
  pleaseEnterDescription: string;
  pleaseEnterVendor: string;
  
  // Dashboard
  totalExpenses: string;
  monthlyTotal: string;
  noExpenses: string;
  expensesOverTime: string;
  expensesByCategory: string;
  
  // Expense list
  recentExpenses: string;
  noExpensesFound: string;
  filterByCategory: string;
  searchExpenses: string;
  all: string;
  
  // Vendor analytics
  totalVendors: string;
  totalSpent: string;
  averagePerVendor: string;
  mostExpensiveVendor: string;
  transactionCount: string;
  lastTransaction: string;
  
  // Monthly insights
  monthlyTrends: string;
  averageDaily: string;
  highestDay: string;
  lowestDay: string;
  
  // Language selector
  selectLanguage: string;
  english: string;
  finnish: string;
  
  // Date formats and currency
  dateFormat: string;
  currencySymbol: string;
  
  // Additional labels and messages
  enterExpenseDescription: string;
  enterVendorName: string;
  startAddingExpenses: string;
  startAddingExpensesVendor: string;
  startAddingExpensesCategory: string;
  noExpensesFoundPeriod: string;
  noExpensesFoundCriteria: string;
  withExpenses: string;
  actions: string;
  
  // Sort options
  sortByAmount: string;
  sortByPercentage: string;
  sortByCount: string;
  
  // Table headers
  dateLabel: string;
  categoryLabel: string;
  descriptionLabel: string;
  vendorLabel: string;
  amountLabel: string;
  
  // Additional missing translations
  confirmDelete: string;
  unknown: string;
  editExpense: string;
  deleteExpense: string;
  monthlyInsights: string;
  total: string;
  spending: string;
  budgetStreak: string;
  days: string;
  
  // More missing translations
  topCategory: string;
  activeCategories: string;
  pleaseSelectDate: string;
  switchToLightMode: string;
  switchToDarkMode: string;
  mode: string;
  
  // Filter translations
  filters: string;
  search: string;
  fromDate: string;
  toDate: string;
  allVendors: string;
  selectStartDate: string;
  selectEndDate: string;
  clearAllFilters: string;
  
  // Time frame translations
  currentMonth: string;
  lastMonth: string;
  lastThreeMonths: string;
  allTime: string;
  
  // Statistics translations
  averageAmount: string;
  transactions: string;
  
  // Additional label translations  
  average: string;
  
  // Page descriptions
  analyzeSpendingPatterns: string;
  
  // View mode translations
  tableView: string;
  cardView: string;
  viewDetails: string;
  
  // Cloud Export Hub translations
  connectShare: string;
  cloudExportHub: string;
  overview: string;
  integrations: string;
  templates: string;
  history: string;
  automation: string;
  connectedServices: string;
  activeShares: string;
  scheduledExports: string;
  dataExported: string;
  serviceStatus: string;
  backgroundActivity: string;
  connected: string;
  error: string;
  users: string;
  allSystemsOperational: string;
  lastUpdated: string;
  viewDocumentation: string;
  quickExport: string;
  
  // Additional action labels
  toiminnot: string;
  
  // Cloud Export Hub detailed translations
  googleSheets: string;
  dropbox: string;
  gmail: string;
  exportDirectlyToGoogleSheets: string;
  storeExportsInDropbox: string;
  monthlyReportExported: string;
  connectedDropbox: string;
  quarterlyFinancialReport: string;
  exportingQ4Data: string;
  googleSheetsSync: string;
  syncingRecentExpenses: string;
  connectGoogleSheetsDropbox: string;
  exportDataDirectly: string;
  automaticallySaveExports: string;
  emailReports: string;
  scheduleAutomaticReports: string;
  slackIntegration: string;
  postUpdatesToSlack: string;
  zapierAutomation: string;
  connectHundredsOfApps: string;
  
  // Additional translations for CloudExportHub
  sharedWith: string;
  
  // Newly added translations for untranslated text
  noExpensesToExport: string;
  exportCSV: string;
  noVendorDataAvailable: string;
  addVendorInfoMessage: string;
  avgShort: string;
  lastShort: string;
  connectingTo: string;
  oauthFlowMessage: string;
  invitationSentTo: string;
  moreCapabilities: string;
  
  // CloudExportHub missing translations
  expensesExportedSuccessfully: string;
  teamMembers: string;
  taxReportSharedWithTeam: string;
  successfullyConnectedStorage: string;
  emailExportsAutomatically: string;
  authenticationExpired: string;
  ago: string;
  disconnected: string;
  recentActivity: string;
  automationStudio: string;
  automationFeatures: string;
  
  // ShareCenter missing translations
  shareAndCollaborate: string;
  generateSecureLinks: string;
  views: string;
  downloads: string;
  shareableLink: string;
  publicAccess: string;
  allowDownload: string;
  allowComments: string;
  viewOnly: string;
  canComment: string;
  canEdit: string;
  generateLinkToSeeUrl: string;
  copied: string;
  copy: string;
  generateSecureLink: string;
  qrCode: string;
  hide: string;
  show: string;
  scanToAccessReport: string;
  downloadQRCode: string;
  socialMedia: string;
  enterEmailToInvite: string;
  invite: string;
  lastActive: string;
  never: string;
  shareAnalytics: string;
  totalViews: string;
  comments: string;
  shares: string;
  
  // IntegrationMarketplace missing translations
  postExpenseSummaries: string;
  storeAndSyncOneDrive: string;
  connectToAppsZapier: string;
  exportToExcelOnline: string;
  createVisualizationsTableau: string;
  buildInteractiveReportsPowerBI: string;
  organizeExpensesAirtable: string;
  createExpenseDocumentationNotion: string;
  sendDataWebhooks: string;
  allServices: string;
  productivity: string;
  cloudStorage: string;
  communication: string;
  analytics: string;
  integration: string;
  integrationMarketplace: string;
  connectYourExpenseData: string;
  searchIntegrations: string;
  popular: string;
  connect: string;
  noIntegrationsFound: string;
  tryAdjustingSearch: string;
  enterpriseSecurity: string;
  allIntegrationsSecure: string;
  soc2Compliant: string;
  gdprReady: string;
  monitoringFullTime: string;
  
  // TemplateLibrary missing translations
  exportTemplateLibrary: string;
  professionalTemplatesDesigned: string;
  searchTemplates: string;
  allTemplates: string;
  taxReports: string;
  business: string;
  financial: string;
  personal: string;
  compliance: string;
  preview: string;
  useTemplate: string;
  previewTemplate: string;
  addToFavorites: string;
  shareTemplate: string;
  noTemplatesFound: string;
  tryAdjustingSearchCategories: string;
  communityTemplates: string;
  createCustomTemplates: string;
  browseCommunity: string;
  createTemplate: string;
}