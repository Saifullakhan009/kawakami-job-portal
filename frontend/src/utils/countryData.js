// ======================================================
// COUNTRY & CURRENCY DATA
// Used across:
// Add Job
// Manage Jobs
// Applications
// Candidate Job Filters
// ======================================================

export const countryData = [
  // ================= MIDDLE EAST =================
  { country: "United Arab Emirates", currency: "AED" },
  { country: "Saudi Arabia", currency: "SAR" },
  { country: "Qatar", currency: "QAR" },
  { country: "Oman", currency: "OMR" },
  { country: "Kuwait", currency: "KWD" },
  { country: "Bahrain", currency: "BHD" },
  { country: "Jordan", currency: "JOD" },

  // ================= SOUTH ASIA =================
  { country: "India", currency: "INR" },
  { country: "Pakistan", currency: "PKR" },
  { country: "Bangladesh", currency: "BDT" },
  { country: "Sri Lanka", currency: "LKR" },
  { country: "Nepal", currency: "NPR" },

  // ================= SOUTHEAST ASIA =================
  { country: "Singapore", currency: "SGD" },
  { country: "Malaysia", currency: "MYR" },
  { country: "Thailand", currency: "THB" },
  { country: "Philippines", currency: "PHP" },
  { country: "Indonesia", currency: "IDR" },
  { country: "Vietnam", currency: "VND" },

  // ================= EAST ASIA =================
  { country: "Japan", currency: "JPY" },
  { country: "South Korea", currency: "KRW" },
  { country: "China", currency: "CNY" },
  { country: "Hong Kong", currency: "HKD" },

  // ================= EUROPE =================
  { country: "United Kingdom", currency: "GBP" },
  { country: "Germany", currency: "EUR" },
  { country: "France", currency: "EUR" },
  { country: "Italy", currency: "EUR" },
  { country: "Spain", currency: "EUR" },
  { country: "Netherlands", currency: "EUR" },
  { country: "Ireland", currency: "EUR" },
  { country: "Portugal", currency: "EUR" },
  { country: "Belgium", currency: "EUR" },
  { country: "Austria", currency: "EUR" },
  { country: "Finland", currency: "EUR" },
  { country: "Greece", currency: "EUR" },
  { country: "Poland", currency: "PLN" },
  { country: "Switzerland", currency: "CHF" },
  { country: "Norway", currency: "NOK" },
  { country: "Sweden", currency: "SEK" },
  { country: "Denmark", currency: "DKK" },
  { country: "Czech Republic", currency: "CZK" },
  { country: "Hungary", currency: "HUF" },
  { country: "Romania", currency: "RON" },

  // ================= NORTH AMERICA =================
  { country: "United States", currency: "USD" },
  { country: "Canada", currency: "CAD" },
  { country: "Mexico", currency: "MXN" },

  // ================= OCEANIA =================
  { country: "Australia", currency: "AUD" },
  { country: "New Zealand", currency: "NZD" },

  // ================= AFRICA =================
  { country: "South Africa", currency: "ZAR" },
  { country: "Kenya", currency: "KES" },
  { country: "Nigeria", currency: "NGN" },
  { country: "Ghana", currency: "GHS" },
  { country: "Egypt", currency: "EGP" },
  { country: "Morocco", currency: "MAD" },
  { country: "Mauritius", currency: "MUR" },
  { country: "Tanzania", currency: "TZS" },
  { country: "Uganda", currency: "UGX" },

  // ================= SOUTH AMERICA =================
  { country: "Brazil", currency: "BRL" },
  { country: "Argentina", currency: "ARS" },
  { country: "Chile", currency: "CLP" },
  { country: "Colombia", currency: "COP" },
  { country: "Peru", currency: "PEN" },
];

// ======================================================
// UNIQUE CURRENCY LIST
//
// Some countries use the same currency.
// Example:
// Germany -> EUR
// France  -> EUR
// Italy   -> EUR
//
// Set removes duplicate currencies.
// sort() keeps the dropdown alphabetically organised.
// ======================================================

export const currencies = [
  ...new Set(countryData.map((item) => item.currency)),
].sort();

// ======================================================
// HELPER FUNCTION
// Returns the default currency for a selected country.
//
// Example:
// getCurrencyByCountry("United Kingdom") -> "GBP"
// getCurrencyByCountry("India") -> "INR"
// ======================================================

export const getCurrencyByCountry = (countryName) => {
  const selectedCountry = countryData.find(
    (item) => item.country === countryName
  );

  return selectedCountry?.currency || "";
};