import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Home.css";

// 1. Data configuration for currencies
const CURRENCIES = {
  INR: { label: "India", currency: "INR", flag: "https://flagcdn.com/w40/in.png", rateToOneInr: 1 },
  NPR: { label: "Nepal", currency: "NPR", flag: "https://flagcdn.com/w40/np.png", rateToOneInr: 1.60 },
  USD: { label: "USA", currency: "USD", flag: "https://flagcdn.com/w40/us.png", rateToOneInr: 0.011 },
  EUR: { label: "Europe", currency: "EUR", flag: "https://flagcdn.com/w40/eu.png", rateToOneInr: 0.0093},
  AED: { label: "UAE", currency: "AED", flag: "https://flagcdn.com/w40/ae.png", rateToOneInr: 0.040 },
  LKR: { label: "Sri Lanka", currency: "LKR", flag: "https://flagcdn.com/w40/lk.png", rateToOneInr: 3.60 },
  GBP: { label: "UK", currency: "GBP", flag: "https://flagcdn.com/w40/gb.png", rateToOneInr: 0.0082 }, 
  AFN: { label: "Afghanistan", currency: "AFN", flag: "https://flagcdn.com/w40/af.png", rateToOneInr: 1.15 },
  ALL: { label: "Albania", currency: "ALL", flag: "https://flagcdn.com/w40/al.png", rateToOneInr: 1.08 },
  AMD: { label: "Armenia", currency: "AMD", flag: "https://flagcdn.com/w40/am.png", rateToOneInr: 5.40 },
  ANG: { label: "Netherlands Antilles", currency: "ANG", flag: "https://flagcdn.com/w40/an.png", rateToOneInr: 0.020 },
  AOA: { label: "Angola", currency: "AOA", flag: "https://flagcdn.com/w40/ao.png", rateToOneInr: 6.50 },
  DZD: { label: "Algeria", currency: "DZD", flag: "https://flagcdn.com/w40/dz.png", rateToOneInr: 1.60 },
  AUD : { label: "Australia", currency: "AUD", flag: "https://flagcdn.com/w40/au.png", rateToOneInr: 0.016 },
  BHD : { label: "Bahrain", currency: "BHD", flag: "https://flagcdn.com/w40/bh.png", rateToOneInr: 0.0041 },
  BDT : { label: "Bangladesh", currency: "BDT", flag: "https://flagcdn.com/w40/bd.png", rateToOneInr: 1.18 },
  BIF : { label: "Burundi", currency: "BIF", flag: "https://flagcdn.com/w40/bi.png", rateToOneInr: 22.50 },
  BZD : { label: "Belize", currency: "BZD", flag: "https://flagcdn.com/w40/bz.png", rateToOneInr: 0.022 },
  CAD : { label: "Canada", currency: "CAD", flag: "https://flagcdn.com/w40/ca.png", rateToOneInr: 0.015 },
  CLP : { label: "Chile", currency: "CLP", flag: "https://flagcdn.com/w40/cl.png", rateToOneInr: 8.50 },
  CNY : { label: "China", currency: "CNY", flag: "https://flagcdn.com/w40/cn.png", rateToOneInr: 0.078 },
  EGP : { label: "Egypt", currency: "EGP", flag: "https://flagcdn.com/w40/eg.png", rateToOneInr: 0.35 },
  FJD : { label: "Fiji", currency: "FJD", flag: "https://flagcdn.com/w40/fj.png", rateToOneInr: 0.024 },
  FKP : { label: "Falkland Islands", currency: "FKP", flag: "https://flagcdn.com/w40/fk.png", rateToOneInr: 0.0082 },
  FOK : { label: "Faroe Islands", currency: "FOK", flag: "https://flagcdn.com/w40/fo.png", rateToOneInr: 0.0093 },
  GEL : { label: "Georgia", currency: "GEL", flag: "https://flagcdn.com/w40/ge.png", rateToOneInr: 0.035 },
  GIP : { label: "Gibraltar", currency: "GIP", flag: "https://flagcdn.com/w40/gi.png", rateToOneInr: 0.0082 },
  GMD : { label: "Gambia", currency: "GMD", flag: "https://flagcdn.com/w40/gm.png", rateToOneInr: 0.50 },
  IDR: { label: "Indonesia", currency: "IDR", flag: "https://flagcdn.com/w40/id.png", rateToOneInr: 160.00 },
  ILS: { label: "Israel", currency: "ILS", flag: "https://flagcdn.com/w40/il.png", rateToOneInr: 0.035 },
  JOD: { label: "Jordan", currency: "JOD", flag: "https://flagcdn.com/w40/jo.png", rateToOneInr: 0.0077 },
  KES: { label: "Kenya", currency: "KES", flag: "https://flagcdn.com/w40/ke.png", rateToOneInr: 1.10 },
  KWD: { label: "Kuwait", currency: "KWD", flag: "https://flagcdn.com/w40/kw.png", rateToOneInr: 0.0033 },
  KMF: { label: "Comoros", currency: "KMF", flag: "https://flagcdn.com/w40/km.png", rateToOneInr: 2.30 },
  KYD: { label: "Cayman Islands", currency: "KYD", flag: "https://flagcdn.com/w40/ky.png", rateToOneInr: 0.0092 },
  LBP: { label: "Lebanon", currency: "LBP", flag: "https://flagcdn.com/w40/lb.png", rateToOneInr: 16.00 },
  MTP: { label: "Malta", currency: "MTP", flag: "https://flagcdn.com/w40/mt.png", rateToOneInr: 0.0082 },
  MUR: { label: "Mauritius", currency: "MUR", flag: "https://flagcdn.com/w40/mu.png", rateToOneInr: 1.20 },
  MVR: { label: "Maldives", currency: "MVR", flag: "https://flagcdn.com/w40/mv.png", rateToOneInr: 0.30 },
  MWK: { label: "Malawi", currency: "MWK", flag: "https://flagcdn.com/w40/mw.png", rateToOneInr: 5.50 },
  MXN: { label: "Mexico", currency: "MXN", flag: "https://flagcdn.com/w40/mx.png", rateToOneInr: 0.22 },
  MYR: { label: "Malaysia", currency: "MYR", flag: "https://flagcdn.com/w40/my.png", rateToOneInr: 0.048 },
  MZN: { label: "Mozambique", currency: "MZN", flag: "https://flagcdn.com/w40/mz.png", rateToOneInr: 3.50 },
  NAD: { label: "Namibia", currency: "NAD", flag: "https://flagcdn.com/w40/na.png", rateToOneInr: 0.50 },
  NGN: { label: "Nigeria", currency: "NGN", flag: "https://flagcdn.com/w40/ng.png", rateToOneInr: 5.50 },
  RUB : { label: "Russia", currency: "RUB", flag: "https://flagcdn.com/w40/ru.png", rateToOneInr: 0.80 },
  RWF : { label: "Rwanda", currency: "RWF", flag: "https://flagcdn.com/w40/rw.png", rateToOneInr: 1.20 },
  SAR : { label: "Saudi Arabia", currency: "SAR", flag: "https://flagcdn.com/w40/sa.png", rateToOneInr: 0.041 },
  SBD : { label: "Solomon Islands", currency: "SBD", flag: "https://flagcdn.com/w40/sb.png", rateToOneInr: 0.0090 },
  SCR : { label: "Seychelles", currency: "SCR", flag: "https://flagcdn.com/w40/sc.png", rateToOneInr: 0.30 },
  SDG : { label: "Sudan", currency: "SDG", flag: "https://flagcdn.com/w40/sd.png", rateToOneInr: 0.50 },
  SYP : { label: "Syria", currency: "SYP", flag: "https://flagcdn.com/w40/sy.png", rateToOneInr: 0.00040 },
  SZL : { label: "Eswatini", currency: "SZL", flag: "https://flagcdn.com/w40/sz.png", rateToOneInr: 0.50 },
  TND : { label: "Tunisia", currency: "TND", flag: "https://flagcdn.com/w40/tn.png", rateToOneInr: 0.032 },
  TOP : { label: "Tonga", currency: "TOP", flag: "https://flagcdn.com/w40/to.png", rateToOneInr: 0.025 },
  TRY : { label: "Turkey", currency: "TRY", flag: "https://flagcdn.com/w40/tr.png", rateToOneInr: 0.20 },
  TTD : { label: "Trinidad and Tobago", currency: "TTD", flag: "https://flagcdn.com/w40/tt.png", rateToOneInr: 0.075 },
  TZS : { label: "Tanzania", currency: "TZS", flag: "https://flagcdn.com/w40/tz.png", rateToOneInr: 25.00 },
  UGX : { label: "Uganda", currency: "UGX", flag: "https://flagcdn.com/w40/ug.png", rateToOneInr: 3.50 },
  VES : { label: "Venezuela", currency: "VES", flag: "https://flagcdn.com/w40/ve.png", rateToOneInr: 0.00010 },
  VUV : { label: "Vanuatu", currency: "VUV", flag: "https://flagcdn.com/w40/vu.png", rateToOneInr: 0.025 },
  ZAR: { label: "South Africa", currency: "ZAR", flag: "https://flagcdn.com/w40/za.png", rateToOneInr: 0.50 },
  
}; 

// Currency full names (for dropdown display)
const CURRENCY_NAMES = {
  INR: "Indian Rupee" ,
  NPR: "Nepalese Rupee",
  USD: "US Dollar",
  EUR: "Euro",
  AED: "UAE Dirham",
  LKR: "Sri Lankan Rupee",
  GBP: "British Pound",
  AFN: "Afghan Afghani",
  ALL: "Albanian Lek",
  AMD: "Armenian Dram",
  ANG: "Netherlands Antillean Guilder",
  AOA: "Angolan Kwanza",
  DZD: "Algerian Dinar",
  AUD: "Australian Dollar",
  BHD: "Bahraini Dinar",
  BDT: "Bangladeshi Taka",
  BIF: "Burundian Franc",
  BZD: "Belize Dollar",
  CAD: "Canadian Dollar",
  CLP: "Chilean Peso",
  CNY: "Chinese Yuan",
  EGP: "Egyptian Pound",
  FJD: "Fijian Dollar",
  FKP: "Falkland Islands Pound",
  FOK: "Faroese Króna",
  GEL: "Georgian Lari",
  GIP: "Gibraltar Pound",
  GMD: "Gambian Dalasi",
  IDR: "Indonesian Rupiah",
  ILS: "Israeli Shekel",
  JOD: "Jordanian Dinar",
  KES: "Kenyan Shilling",
  KWD: "Kuwaiti Dinar",
  KMF: "Comorian Franc",
  KYD: "Cayman Islands Dollar",
  LBP: "Lebanese Pound",
  MTP: "Maltese Pound",
  MUR: "Mauritian Rupee",
  MVR: "Maldivian Rufiyaa",
  MWK: "Malawian Kwacha",
  MXN: "Mexican Peso",
  MYR: "Malaysian Ringgit",
  MZN: "Mozambican Metical",
  NAD: "Namibian Dollar",
  NGN: "Nigerian Naira",
  RUB: "Russian Ruble",
  RWF: "Rwandan Franc",
  SAR: "Saudi Riyal",
  SBD: "Solomon Islands Dollar",
  SCR: "Seychellois Rupee",
  SDG: "Sudanese Pound",
  SYP: "Syrian Pound",
  SZL: "Swazi Lilangeni",
  TND: "Tunisian Dinar",
  TOP: "Tongan Paʻanga",
  TRY: "Turkish Lira",
  TTD: "Trinidad and Tobago Dollar",
  TZS: "Tanzanian Shilling",
  UGX: "Ugandan Shilling",
  VES: "Venezuelan Bolívar",
  VUV: "Vanuatu Vatu",
  ZAR: "South African Rand"
};

// ⭐ Active currencies (fixed order)
const ACTIVE_CURRENCIES = ["INR", "USD", "EUR", "AED", "NPR", "LKR"];

// Sort all currencies alphabetically by country name
const SORTED_CURRENCIES = Object.entries(CURRENCIES).sort(
  ([, a], [, b]) => a.label.localeCompare(b.label)
); 
// Convert active currencies to objects
const ACTIVE_LIST = ACTIVE_CURRENCIES.map(code => ({
  code,
  ...CURRENCIES[code]
}));

// All non-active currencies (alphabetical)
const OTHER_CURRENCIES = SORTED_CURRENCIES.filter(
  ([code]) => !ACTIVE_CURRENCIES.includes(code)
);
const FLAT_FEE_INR = 50;

function Home() {
  const [sendAmount, setSendAmount] = useState(0);
  const [fromCurr, setFromCurr] = useState("INR");
  const [toCurr, setToCurr] = useState("NPR");
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [showFeeDetails, setShowFeeDetails] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // "from" or "to"
  const [searchTerm, setSearchTerm] = useState("");
  


  useEffect(() => {
  if (!sendAmount || sendAmount <= 0) {
    setReceiveAmount(0);
    return;
  }

  // Step 1: Convert sender currency to INR (base currency)
  const rateFrom = CURRENCIES[fromCurr].rateToOneInr;
  const amountInInr = sendAmount / rateFrom;

  // Step 2: Deduct flat fee in INR (always ₹50)
  const amountAfterFeeInInr = Math.max(amountInInr - FLAT_FEE_INR, 0);

  // Step 3: Convert remaining INR to target currency
  const rateTo = CURRENCIES[toCurr].rateToOneInr;
  const finalConvertedAmount = amountAfterFeeInInr * rateTo;

  // Step 4: Set final amount (rounded)
  setReceiveAmount(finalConvertedAmount);
}, [sendAmount, fromCurr, toCurr]);


  // Calculate current display rate for the badge
  const displayRate = (CURRENCIES[toCurr].rateToOneInr / CURRENCIES[fromCurr].rateToOneInr).toFixed(4);
  
  // ===== Receipt Calculations (SAFE - does not affect main logic) =====
const rateFrom = CURRENCIES[fromCurr].rateToOneInr;
const rateTo = CURRENCIES[toCurr].rateToOneInr;

const amountInInr = sendAmount > 0 ? sendAmount / rateFrom : 0;
const feeInInr = Math.min(FLAT_FEE_INR, amountInInr); // Always ₹50 or less if low amount
const amountAfterFee = Math.max(amountInInr - feeInInr, 0);
const finalRecipientAmount = amountAfterFee * rateTo;

  return (
    <section className="hero-section">
      <div className="animated-bg">
        <span className="ripple ripple-1"></span>
        <span className="ripple ripple-2"></span>
        <span className="ripple ripple-3"></span>
      </div>

      <div className="hero-content">
        {/* LEFT SIDE */}
        <motion.div 
          className="hero-left"
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="badge">⭐ Trusted by 100K+ users worldwide</div>
          <h1 className="hero-title">
            Send And Spend Money<span> Across The World </span>
          </h1>
          <p className="hero-subtitle">
            Fast, secure international transfers with a transparent flat fee and real-time exchange rates.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn">Send Money Now →</button>
            <button className="secondary-btn">See How It Works</button>
          </div> 

          {/* ===== STATS (PLACE HERE - UNDER BUTTONS) ===== */}
<div className="hero-stats">
  <div className="stat-item">
    <h2>Rs. 2.1B+</h2>
    <p>Transferred</p>
  </div>

  <div className="stat-item">
    <h2>Global Reach</h2>
    <p>Transfer Network</p>
  </div>

  <div className="stat-item">
    <h2>99.9%</h2>
    <p>Success Rate</p>
  </div>
</div>
        </motion.div>


        {/* RIGHT SIDE (CALCULATOR) */}
        <motion.div 
          className="hero-right"
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="calculator-card wise-style">
            <div className="rate-badge">
              🔒 1 {fromCurr} = {displayRate} {toCurr}
            </div>

            {/* SENDER INPUT */}
            <div className="calc-row">
              <label>You send :</label>
              <div className="input-box">
               <div className="currency-picker" onClick={() => setOpenDropdown("from")}>
  <img
    src={CURRENCIES[fromCurr].flag}
    className="currency-flag"
    alt={fromCurr}
  />
  <span className="currency-code">{fromCurr}</span>
  <span className="arrow">▾</span>

  {openDropdown === "from" && (
    <div
  className="dropdown-panel"
  onClick={(e) => e.stopPropagation()}
>
  {/* SEARCH AREA */}
  <div className="dropdown-search-wrapper">
  <div className="currency-search">
  <span className="search-icon">🔍</span>

  <input
  type="text"
  placeholder="Type a currency / country"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
</div>
</div>

  {/* LABEL UNDER SEARCH BAR */}
 {/* FILTERED DATA */}
{/* ================= CURRENCY LIST ================= */}

{(() => {
  const filteredList = SORTED_CURRENCIES.filter(([code, data]) =>
    code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeList = filteredList.filter(([code]) =>
    ACTIVE_CURRENCIES.includes(code)
  );

  const otherList = filteredList.filter(([code]) =>
    !ACTIVE_CURRENCIES.includes(code)
  );

  return (
    <div className="dropdown-list">   {/* ✅ ONLY ONE SCROLL CONTAINER */}

      {activeList.length > 0 && (
        <>
          <div className="dropdown-label active-label">
            <span className="active-dot"></span>
            Active Countries
          </div>

          {activeList.map(([code, data]) => (
            <div
              key={code}
              className="dropdown-item"
              onClick={(e) => {
                e.stopPropagation();
                openDropdown === "from"
                  ? setFromCurr(code)
                  : setToCurr(code);
                setOpenDropdown(null);
                setSearchTerm("");
              }}
            >
              <img src={data.flag} className="dropdown-flag" alt={code} />

              <div className="dropdown-text">
                <span className="dropdown-code">{code}</span>
                <span className="dropdown-name">{data.label}</span>
              </div>

              <span className="active-tick">✔</span>
            </div>
          ))}
        </>
      )}

      {otherList.length > 0 && (
        <>
          <div className="dropdown-label">
            All currencies
          </div>

          {otherList.map(([code, data]) => (
            <div
              key={code}
              className="dropdown-item"
              onClick={(e) => {
                e.stopPropagation();
                openDropdown === "from"
                  ? setFromCurr(code)
                  : setToCurr(code);
                setOpenDropdown(null);
                setSearchTerm("");
              }}
            >
              <img src={data.flag} className="dropdown-flag" alt={code} />

              <div className="dropdown-text">
                <span className="dropdown-code">{code}</span>
                <span className="dropdown-name">{data.label}</span>
              </div>
            </div>
          ))}
        </>
      )}

    </div>
  );
})()}
  
  </div>
  )}
</div>
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(Number(e.target.value))}
                />
              </div>
            </div>


            
            {/* RECIPIENT INPUT */}
<div className="calc-row">
  <label>Recipient gets :</label>

  <div className="input-box">

    <div className="currency-picker" onClick={() => setOpenDropdown("to")}>
  <img
    src={CURRENCIES[toCurr].flag}
    className="currency-flag"
    alt={toCurr}
  />
  <span className="currency-code">{toCurr}</span>
  <span className="arrow">▾</span>

  {openDropdown === "to" && (
  <div
    className="dropdown-panel"
    onClick={(e) => e.stopPropagation()}
  >
    {/* SEARCH AREA */}
    <div className="dropdown-search-wrapper">
      <div className="currency-search">
        <span className="search-icon">🔍</span>

        <input
          type="text"
          placeholder="Type a currency / country"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>

    {/* LABEL */}
    {/* FILTERED DATA */}
{/* ================= CURRENCY LIST ================= */}

{(() => {
  const filteredList = SORTED_CURRENCIES.filter(([code, data]) =>
    code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeList = filteredList.filter(([code]) =>
    ACTIVE_CURRENCIES.includes(code)
  );

  const otherList = filteredList.filter(([code]) =>
    !ACTIVE_CURRENCIES.includes(code)
  );

  return (
    <div className="dropdown-list">   {/* ✅ ONLY ONE SCROLL CONTAINER */}

      {activeList.length > 0 && (
        <>
          <div className="dropdown-label active-label">
            <span className="active-dot"></span>
            Active Countries
          </div>

          {activeList.map(([code, data]) => (
            <div
              key={code}
              className="dropdown-item"
              onClick={(e) => {
                e.stopPropagation();
                openDropdown === "from"
                  ? setFromCurr(code)
                  : setToCurr(code);
                setOpenDropdown(null);
                setSearchTerm("");
              }}
            >
              <img src={data.flag} className="dropdown-flag" alt={code} />

              <div className="dropdown-text">
                <span className="dropdown-code">{code}</span>
                <span className="dropdown-name">{data.label}</span>
              </div>

              <span className="active-tick">✔</span>
            </div>
          ))}
        </>
      )}

      {otherList.length > 0 && (
        <>
          <div className="dropdown-label">
            All currencies
          </div>

          {otherList.map(([code, data]) => (
            <div
              key={code}
              className="dropdown-item"
              onClick={(e) => {
                e.stopPropagation();
                openDropdown === "from"
                  ? setFromCurr(code)
                  : setToCurr(code);
                setOpenDropdown(null);
                setSearchTerm("");
              }}
            >
              <img src={data.flag} className="dropdown-flag" alt={code} />

              <div className="dropdown-text">
                <span className="dropdown-code">{code}</span>
                <span className="dropdown-name">{data.label}</span>
              </div>
            </div>
          ))}
        </>
      )}

    </div>
  );
})()}
  
    </div>
)}
</div>

    <input
      type="text"
      value={receiveAmount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}
      disabled
    />

              </div>
            </div>

            {/* ===== FEE RECEIPT POPUP ===== */}
{showFeeDetails && (
  <div className="fee-popup-overlay" onClick={() => setShowFeeDetails(false)}>
    <div className="fee-popup" onClick={(e) => e.stopPropagation()}>
      
      <div className="receipt-row">
        <span>Transfer amount:</span>
        <span>
          {fromCurr} {sendAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </span>
      </div>

      <div className="receipt-row">
        <span>Our fee:</span>
        <span>₹{feeInInr.toFixed(2)}</span>
      </div>

      <div className="receipt-row">
        <span>Exchange rate:</span>
        <span>
          1 {fromCurr} = {displayRate} {toCurr}
        </span>
      </div>

      <hr className="receipt-divider" />

      <div className="receipt-total">
        <span>Recipient gets:</span>
        <span>
          {toCurr} {finalRecipientAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </span>
      </div>

    </div>
  </div>
)}

 {/* TOTAL FEES (CLICKABLE LIKE WISE) */}
<div className="total-fee-box">
  <span>Total fees</span>
  <span 
    className="fee-amount"
    onClick={() => setShowFeeDetails(true)}
  >
    ₹{feeInInr.toFixed(2)} INR ›
  </span>
</div>
            <button className="send-btn wise-btn">Get Started</button>
          </div>
        </motion.div>
      </div> 

    </section>
  );
}  
export default Home;
        