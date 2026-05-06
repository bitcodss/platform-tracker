// 50 sample respondents — used for real file exports
const REGIONS = ['Greater Bangkok', 'Central & West', 'North', 'Northeast', 'South'];
const PLATFORMS = ['Shopee', 'Lazada', 'TikTok Shop', 'Temu'];
const CATEGORIES = ['Fashion', 'Electronics', 'FMCG', 'Lifestyle', 'Beauty', 'Home Appliances', 'Food & Beverages', 'Pets'];
const GENDERS = ['Male', 'Female'];

function seed(n) {
  // simple deterministic pseudo-random
  let x = Math.sin(n + 1) * 10000;
  return x - Math.floor(x);
}

export const respondents = Array.from({ length: 50 }, (_, i) => {
  const r = seed(i * 7);
  const r2 = seed(i * 13);
  const r3 = seed(i * 17);
  const r4 = seed(i * 3);
  const r5 = seed(i * 11);
  const regionIdx = Math.floor(r * 5);
  const platformIdx = Math.floor(r2 * 4);
  const catIdx = Math.floor(r3 * 8);
  const genderIdx = i % 2; // strict 50:50
  const age = 18 + Math.floor(r4 * 37); // 18-54
  const basket = Math.round((200 + r5 * 1800) / 10) * 10;
  const freq = Math.round(1 + r2 * 9);

  const ageGroup =
    age < 25 ? '18-24' :
    age < 35 ? '25-34' :
    age < 45 ? '35-44' :
    age < 55 ? '45-54' : '55+';

  return {
    resp_id: `R${String(i + 1).padStart(4, '0')}`,
    region: REGIONS[regionIdx],
    gender: GENDERS[genderIdx],
    age,
    age_group: ageGroup,
    platform: PLATFORMS[platformIdx],
    category: CATEGORIES[catIdx],
    basket_thb: basket,
    freq_monthly: freq,
    multi_platform: freq > 5 ? 'Yes' : 'No',
    survey_month: 'Jun-2025',
  };
});

// Coded version for SPSS (numeric categories)
export const respondentsCoded = respondents.map(r => ({
  ...r,
  region_code: ['Greater Bangkok', 'Central & West', 'North', 'Northeast', 'South'].indexOf(r.region) + 1,
  gender_code: r.gender === 'Male' ? 1 : 2,
  platform_code: ['Shopee', 'Lazada', 'TikTok Shop', 'Temu'].indexOf(r.platform) + 1,
}));
