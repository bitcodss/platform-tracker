export const PLATFORMS = {
  Lazada: { color: '#0F146D', light: '#e8e9f8' },
  Shopee: { color: '#EE4D2D', light: '#fdecea' },
  TikTokShop: { color: '#010101', light: '#e6e6e6' },
  Temu: { color: '#FA6338', light: '#fff0ec' },
};

export const REGIONS = ['All Regions', 'Greater Bangkok', 'Central & West', 'North', 'Northeast', 'South'];
export const GENDERS = ['All', 'Male', 'Female'];
export const AGE_GROUPS = ['All Ages', '18-24', '25-34', '35-44', '45-54', '55+'];
export const CATEGORIES = ['All Categories', 'Electronics', 'Fashion', 'FMCG', 'Lifestyle'];

// Executive Summary KPIs
export const kpis = {
  totalFrequency: 4.2,
  avgBasketSize: 650,
  activeBuyers: 847,
  totalRespondents: 1000,
};

// Market Share (% of orders volume)
export const marketShareData = [
  { name: 'Shopee', value: 38, fill: '#EE4D2D' },
  { name: 'Lazada', value: 27, fill: '#0F146D' },
  { name: 'TikTok Shop', value: 22, fill: '#010101' },
  { name: 'Temu', value: 13, fill: '#FA6338' },
];

// Monthly trend (order frequency avg)
export const monthlyTrend = [
  { month: 'Jan', Shopee: 3.8, Lazada: 2.9, TikTokShop: 1.8, Temu: 0.9 },
  { month: 'Feb', Shopee: 4.0, Lazada: 2.8, TikTokShop: 2.1, Temu: 1.0 },
  { month: 'Mar', Shopee: 4.2, Lazada: 3.0, TikTokShop: 2.3, Temu: 1.2 },
  { month: 'Apr', Shopee: 4.5, Lazada: 2.7, TikTokShop: 2.5, Temu: 1.4 },
  { month: 'May', Shopee: 4.3, Lazada: 2.6, TikTokShop: 2.8, Temu: 1.6 },
  { month: 'Jun', Shopee: 4.6, Lazada: 2.8, TikTokShop: 3.0, Temu: 1.8 },
];

// Share of Wallet - value (THB)
export const walletValueData = [
  { name: 'Shopee', value: 1820, fill: '#EE4D2D' },
  { name: 'Lazada', value: 1340, fill: '#0F146D' },
  { name: 'TikTok Shop', value: 980, fill: '#010101' },
  { name: 'Temu', value: 580, fill: '#FA6338' },
];

// Wallet volume (orders/month)
export const walletVolumeData = [
  { name: 'Shopee', value: 38, fill: '#EE4D2D' },
  { name: 'Lazada', value: 27, fill: '#0F146D' },
  { name: 'TikTok Shop', value: 22, fill: '#010101' },
  { name: 'Temu', value: 13, fill: '#FA6338' },
];

// Multi-platform overlap (% of buyers)
export const overlapData = [
  { combo: 'Shopee only', pct: 18 },
  { combo: 'Lazada only', pct: 12 },
  { combo: 'Shopee + Lazada', pct: 21 },
  { combo: 'Shopee + TikTok', pct: 17 },
  { combo: 'Lazada + TikTok', pct: 9 },
  { combo: 'Shopee + Temu', pct: 8 },
  { combo: '3+ Platforms', pct: 15 },
];

// Demographics breakdown
export const genderData = [
  { name: 'Male', value: 50, fill: '#3B82F6' },
  { name: 'Female', value: 50, fill: '#EC4899' },
];

export const regionData = [
  { region: 'Greater Bangkok', n: 200, completed: 195 },
  { region: 'Central & West', n: 200, completed: 198 },
  { region: 'North', n: 200, completed: 192 },
  { region: 'Northeast', n: 200, completed: 200 },
  { region: 'South', n: 200, completed: 188 },
];

// Category deep-dive
export const categoryClusterData = [
  { cluster: 'Electronics', Shopee: 820, Lazada: 1240, TikTokShop: 560, Temu: 340 },
  { cluster: 'Fashion', Shopee: 680, Lazada: 420, TikTokShop: 890, Temu: 510 },
  { cluster: 'FMCG', Shopee: 450, Lazada: 320, TikTokShop: 380, Temu: 260 },
  { cluster: 'Lifestyle', Shopee: 520, Lazada: 380, TikTokShop: 420, Temu: 310 },
];

export const categoryTableData = [
  { category: 'Home Appliances', cluster: 'Electronics', Shopee: 850, Lazada: 1400, TikTok: 480, Temu: 290, topPlatform: 'Lazada' },
  { category: 'Smartphones & Accessories', cluster: 'Electronics', Shopee: 920, Lazada: 1100, TikTok: 620, Temu: 380, topPlatform: 'Lazada' },
  { category: 'Clothing & Apparel', cluster: 'Fashion', Shopee: 720, Lazada: 380, TikTok: 960, Temu: 540, topPlatform: 'TikTok' },
  { category: 'Beauty & Personal Care', cluster: 'Fashion', Shopee: 680, Lazada: 450, TikTok: 840, Temu: 490, topPlatform: 'TikTok' },
  { category: 'Food & Beverages', cluster: 'FMCG', Shopee: 520, Lazada: 280, TikTok: 390, Temu: 210, topPlatform: 'Shopee' },
  { category: 'Health & Wellness', cluster: 'FMCG', Shopee: 480, Lazada: 360, TikTok: 340, Temu: 280, topPlatform: 'Shopee' },
  { category: 'Home & Living', cluster: 'Lifestyle', Shopee: 560, Lazada: 420, TikTok: 490, Temu: 340, topPlatform: 'Shopee' },
  { category: 'Pets', cluster: 'Lifestyle', Shopee: 490, Lazada: 340, TikTok: 350, Temu: 290, topPlatform: 'Shopee' },
];

export const basketSizeByPlatform = [
  { platform: 'Lazada', male: 820, female: 610 },
  { platform: 'Shopee', male: 590, female: 710 },
  { platform: 'TikTok Shop', male: 480, female: 650 },
  { platform: 'Temu', male: 420, female: 380 },
];
