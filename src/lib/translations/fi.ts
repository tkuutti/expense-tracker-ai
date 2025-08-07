import { Translations } from '@/types/language';

export const fi: Translations = {
  // Navigation
  dashboard: 'Kojelauta',
  categories: 'Kategoriat',
  expenses: 'Kulut',
  topVendors: 'Tärkeimmät myyjät',
  insights: 'Analytiikka',
  addExpense: 'Lisää kulu',
  
  // App title and branding
  appTitle: 'Kulujenseuranta',
  
  // Expense categories
  food: 'Ruoka',
  transportation: 'Liikenne',
  entertainment: 'Viihde',
  shopping: 'Ostokset',
  bills: 'Laskut',
  other: 'Muut',
  
  // Form labels
  amount: 'Summa',
  category: 'Kategoria',
  description: 'Kuvaus',
  vendor: 'Myyjä',
  date: 'Päivämäärä',
  
  // Buttons
  save: 'Tallenna',
  cancel: 'Peruuta',
  edit: 'Muokkaa',
  delete: 'Poista',
  add: 'Lisää',
  export: 'Vie',
  
  // Validation messages
  pleaseEnterAmount: 'Syötä summa',
  pleaseEnterValidAmount: 'Syötä kelvollinen summa (esim. 15,50)',
  amountMustBePositive: 'Summan tulee olla suurempi kuin 0',
  pleaseEnterDescription: 'Syötä kuvaus',
  pleaseEnterVendor: 'Syötä myyjä tai maksun saaja',
  
  // Dashboard
  totalExpenses: 'Kulut yhteensä',
  monthlyTotal: 'Kuukausittain yhteensä',
  noExpenses: 'Ei kirjattuja kuluja',
  expensesOverTime: 'Kulut ajassa',
  expensesByCategory: 'Kulut kategorioittain',
  
  // Expense list
  recentExpenses: 'Viimeisimmät kulut',
  noExpensesFound: 'Ei kuluja löytynyt',
  filterByCategory: 'Suodata kategorian mukaan',
  searchExpenses: 'Etsi kuluja...',
  all: 'Kaikki',
  
  // Vendor analytics
  totalVendors: 'Myyjiä yhteensä',
  totalSpent: 'Käytetty yhteensä',
  averagePerVendor: 'Keskiarvo myyjää kohden',
  mostExpensiveVendor: 'Kallein myyjä',
  transactionCount: 'Tapahtumat',
  lastTransaction: 'Viimeisin tapahtuma',
  
  // Monthly insights
  monthlyTrends: 'Kuukausittaiset trendit',
  averageDaily: 'Päivittäinen keskiarvo',
  highestDay: 'Korkein päivä',
  lowestDay: 'Matalin päivä',
  
  // Language selector
  selectLanguage: 'Valitse kieli',
  english: 'Englanti',
  finnish: 'Suomi',
  
  // Date formats and currency
  dateFormat: 'dd.MM.yyyy',
  currencySymbol: '€',
  
  // Additional labels and messages
  enterExpenseDescription: 'Syötä kulun kuvaus',
  enterVendorName: 'Syötä myyjän tai maksun saajan nimi',
  startAddingExpenses: 'Aloita kulujen lisääminen nähdäksesi analytiikkaa ja näkemyksiä täällä',
  startAddingExpensesVendor: 'Aloita kulujen lisääminen myyjätietoineen nähdäksesi myyjäanalytiikkaa täällä',
  startAddingExpensesCategory: 'Aloita kulujen lisääminen nähdäksesi kategoriaanalytiikkaa',
  noExpensesFoundPeriod: 'Ei kuluja löytynyt valitulta ajanjaksolta. Kokeile aikavälin säätämistä',
  noExpensesFoundCriteria: 'Ei kriteereitäsi vastaavia kuluja löytynyt',
  withExpenses: 'kulujen kanssa',
  actions: 'Toiminnot',
  
  // Sort options
  sortByAmount: 'Järjestä summan mukaan',
  sortByPercentage: 'Järjestä %:n mukaan',
  sortByCount: 'Järjestä lukumäärän mukaan',
  
  // Table headers
  dateLabel: 'Päivämäärä',
  categoryLabel: 'Kategoria',
  descriptionLabel: 'Kuvaus',
  vendorLabel: 'Myyjä',
  amountLabel: 'Summa',
  
  // Additional missing translations
  confirmDelete: 'Haluatko varmasti poistaa',
  unknown: 'Tuntematon',
  editExpense: 'Muokkaa kulua',
  deleteExpense: 'Poista kulu',
  monthlyInsights: 'Kuukausittainen analyysi',
  total: 'Yhteensä',
  spending: 'Kulutus',
  budgetStreak: 'Budjettisarja',
  days: 'päivää',
  
  // More missing translations
  topCategory: 'Suosituin kategoria',
  activeCategories: 'Aktiiviset kategoriat',
  pleaseSelectDate: 'Valitse päivämäärä',
  switchToLightMode: 'Vaihda vaaleaan tilaan',
  switchToDarkMode: 'Vaihda tummaan tilaan',
  mode: 'tila',
  
  // Filter translations
  filters: 'Suodattimet',
  search: 'Haku',
  fromDate: 'Alkupäivämäärä',
  toDate: 'Loppupäivämäärä',
  allVendors: 'Kaikki myyjät',
  selectStartDate: 'Valitse aloituspäivä',
  selectEndDate: 'Valitse lopetuspäivä',
  clearAllFilters: 'Tyhjennä kaikki suodattimet',
  
  // Time frame translations
  currentMonth: 'Tämä kuukausi',
  lastMonth: 'Viime kuukausi',
  lastThreeMonths: 'Viimeiset 3 kuukautta',
  allTime: 'Koko aika',
  
  // Statistics translations
  averageAmount: 'Keskiarvo',
  transactions: 'Tapahtumat',
  
  // Additional label translations
  average: 'Keskiarvo',
  
  // Page descriptions
  analyzeSpendingPatterns: 'Analysoi kulutustottumuksiasi kategorioittain',
  
  // View mode translations
  tableView: 'Taulukkonäkymä',
  cardView: 'Korttinäkymä',
  viewDetails: 'Näytä tiedot',
  
  // Cloud Export Hub translations
  connectShare: 'Yhdistä & Jaa',
  cloudExportHub: 'Pilvivientikeskus',
  overview: 'Yleiskatsaus',
  integrations: 'Integraatiot',
  templates: 'Mallipohjat',
  history: 'Historia',
  automation: 'Automaatio',
  connectedServices: 'Yhdistetyt palvelut',
  activeShares: 'Aktiiviset jaot',
  scheduledExports: 'Ajastetut viennit',
  dataExported: 'Viety data',
  serviceStatus: 'Palvelun tila',
  backgroundActivity: 'Taustatoiminta',
  connected: 'Yhdistetty',
  error: 'Virhe',
  users: 'käyttäjää',
  allSystemsOperational: 'Kaikki järjestelmät toiminnassa',
  lastUpdated: 'Viimeksi päivitetty',
  viewDocumentation: 'Näytä dokumentaatio',
  quickExport: 'Pikavienti',
  
  // Additional action labels
  toiminnot: 'TOIMINNOT',
  
  // Cloud Export Hub detailed translations
  googleSheets: 'Google Sheets',
  dropbox: 'Dropbox',
  gmail: 'Gmail',
  exportDirectlyToGoogleSheets: 'Vie suoraan Google Sheetsiin',
  storeExportsInDropbox: 'Tallenna viennit Dropboxiisi',
  monthlyReportExported: 'Kuukausiraportti viety Google Sheetsiin',
  connectedDropbox: 'Yhdistetty Dropbox',
  quarterlyFinancialReport: 'Neljännesvuosittainen talousraportti',
  exportingQ4Data: 'Viedään Q4 2024 dataa PDF-muodossa',
  googleSheetsSync: 'Google Sheets synkronointi',
  syncingRecentExpenses: 'Synkronoidaan viimeisimpiä kuluja',
  connectGoogleSheetsDropbox: 'Yhdistä Google Sheets, Dropbox ja muut',
  exportDataDirectly: 'Vie dataa suoraan Google Sheetsiin reaaliaikaisella synkronoinnilla ja yhteistyöominaisuuksilla.',
  automaticallySaveExports: 'Tallenna viennit automaattisesti Dropboxiisi versiohistorian ja jakomahdollisuuksien kanssa.',
  emailReports: 'Lähetä raportit sähköpostitse sidosryhmille mukautettavilla malleilla ja aikataulutuksella.',
  scheduleAutomaticReports: 'Ajoita automaattiset raportit ja kuluyhteenvedot Slack-kanavillesi.',
  slackIntegration: 'Slack-integraatio',
  postUpdatesToSlack: 'Lähetä päivitykset Slackiin',
  zapierAutomation: 'Zapier-automaatio',
  connectHundredsOfApps: 'Yhdistä satoihin sovelluksiin ja automatisoi kulutyönkulkusi.',
  
  // Additional translations for CloudExportHub  
  sharedWith: 'jaettu',
  
  // Missing translations for untranslated text
  noExpensesToExport: 'Ei kuluja vietäväksi',
  exportCSV: 'Vie CSV',
  noVendorDataAvailable: 'Ei myyjätietoja saatavilla',
  addVendorInfoMessage: 'Lisää myyjätietoja kuluihisi nähdäksesi parhaiden myyjien kaavion. Voit muokata olemassa olevia kuluja tai lisätä uusia myyjätietojen kanssa.',
  avgShort: 'Keskim.:',
  lastShort: 'Viim.:',
  connectingTo: 'Yhdistetään kohteeseen',
  oauthFlowMessage: 'Tämä avaa uuden ikkunan valtuutusta varten',
  invitationSentTo: 'Kutsu lähetetty henkilölle',
  moreCapabilities: 'lisää',
  
  // CloudExportHub missing translations
  expensesExportedSuccessfully: 'kulua viety onnistuneesti',
  teamMembers: 'tiimin jäsentä',
  taxReportSharedWithTeam: 'Veroraportti jaettu tiimin kanssa',
  successfullyConnectedStorage: 'Tallennustila yhdistetty onnistuneesti',
  emailExportsAutomatically: 'Lähetä viennit automaattisesti sähköpostilla',
  authenticationExpired: 'Todennus vanhentunut',
  ago: 'sitten',
  disconnected: 'Ei yhdistetty',
  recentActivity: 'Viimeaikainen toiminta',
  automationStudio: 'Automaatiostudio',
  automationFeatures: 'Luo mukautettuja työnkulkuja laukaisimilla, ehdoilla ja toiminnoilla',
  
  // ShareCenter missing translations
  shareAndCollaborate: 'Jaa & Tee yhteistyötä',
  generateSecureLinks: 'Luo turvallisia linkkejä kuluraporttien jakamiseen',
  views: 'katselua',
  downloads: 'latausta',
  shareableLink: 'Jaettava linkki',
  publicAccess: 'Julkinen pääsy',
  allowDownload: 'Salli lataaminen',
  allowComments: 'Salli kommentit',
  viewOnly: 'Vain katselu',
  canComment: 'Voi kommentoida',
  canEdit: 'Voi muokata',
  generateLinkToSeeUrl: 'Luo linkki nähdäksesi URL-osoitteen',
  copied: 'Kopioitu!',
  copy: 'Kopioi',
  generateSecureLink: 'Luo turvallinen linkki',
  qrCode: 'QR-koodi',
  hide: 'Piilota',
  show: 'Näytä',
  scanToAccessReport: 'Skannaa päästäksesi kuluraporttiin',
  downloadQRCode: 'Lataa QR-koodi',
  socialMedia: 'Sosiaalinen media',
  enterEmailToInvite: 'Syötä sähköposti kutsuaksesi',
  invite: 'Kutsu',
  lastActive: 'Viimeksi aktiivinen',
  never: 'Ei koskaan',
  shareAnalytics: 'Jaa analytiikka',
  totalViews: 'Katselut yhteensä',
  comments: 'Kommentit',
  shares: 'Jaot',
  
  // IntegrationMarketplace missing translations
  postExpenseSummaries: 'Lähetä kuluyhteenvetoja Slackiin',
  storeAndSyncOneDrive: 'Tallenna ja synkronoi tietosi OneDrivessa',
  connectToAppsZapier: 'Yhdistä yli 5000 sovellukseen Zapierilla',
  exportToExcelOnline: 'Vie Excel Onlineen kaavojen ja kaavioiden kanssa',
  createVisualizationsTableau: 'Luo edistyneitä visualisointeja Tableaulla',
  buildInteractiveReportsPowerBI: 'Rakenna interaktiivisia raportteja Power BI:lla',
  organizeExpensesAirtable: 'Järjestä kulut Airtable-tietokannoissa',
  createExpenseDocumentationNotion: 'Luo kuludokumentaatiota Notionissa',
  sendDataWebhooks: 'Lähetä tietoja mukautettuihin webhook-päätepisteisiin',
  allServices: 'Kaikki palvelut',
  productivity: 'Tuottavuus',
  cloudStorage: 'Pilvitallennustila',
  communication: 'Viestintä',
  analytics: 'Analytiikka',
  integration: 'integraatio',
  integrationMarketplace: 'Integraatiokauppapaikka',
  connectYourExpenseData: 'Yhdistä kulutietosi suosikkityökaluihisi',
  searchIntegrations: 'Hae integraatioita...',
  popular: 'Suosittu',
  connect: 'Yhdistä',
  noIntegrationsFound: 'Integraatioita ei löytynyt',
  tryAdjustingSearch: 'Kokeile muuttaa hakua tai suodattimia',
  enterpriseSecurity: 'Yritystason turvallisuus',
  allIntegrationsSecure: 'Kaikki integraatiot käyttävät turvallista OAuth 2.0 -todennusta',
  soc2Compliant: 'SOC 2 -yhteensopiva',
  gdprReady: 'GDPR-valmis',
  monitoringFullTime: '24/7 valvonta',
  
  // TemplateLibrary missing translations
  exportTemplateLibrary: 'Vientimallien kirjasto',
  professionalTemplatesDesigned: 'Ammattimaiset mallipohjat jokaiseen raportointitarpeeseen',
  searchTemplates: 'Hae malleja...',
  allTemplates: 'Kaikki mallit',
  taxReports: 'Veroraportit',
  business: 'Liiketoiminta',
  financial: 'Talous',
  personal: 'Henkilökohtainen',
  compliance: 'Vaatimustenmukaisuus',
  preview: 'Esikatselu',
  useTemplate: 'Käytä mallia',
  previewTemplate: 'Esikatsele mallia',
  addToFavorites: 'Lisää suosikkeihin',
  shareTemplate: 'Jaa malli',
  noTemplatesFound: 'Malleja ei löytynyt',
  tryAdjustingSearchCategories: 'Kokeile muuttaa hakua tai kategoriasuodattimia',
  communityTemplates: 'Yhteisön mallit',
  createCustomTemplates: 'Jaa ja löydä yhteisön luomia mukautettuja malleja',
  browseCommunity: 'Selaa yhteisöä',
  createTemplate: 'Luo malli',
};