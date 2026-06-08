import React from "react";
import "./MarketingFooter.css";
import FooterColumn from "./FooterColumn";

const MarketingFooter = () => {

  const servicesLinks = [
    "Currency Exchange",
    "International Transfers",
    "Live Exchange Rates",
    "Multi-Currency Wallet"
  ];

  const companyLinks = [
    "About MoneyKauf",
    "Careers",
    "Investor Relations",
    "Partnerships"
  ];

  const supportLinks = [
    "Help Center",
    "Transaction Policies",
    "Privacy Policy",
    "Regulatory Compliance"
  ];

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Column (custom) */}
        <div className="footer-column">
          <h2 className="footer-logo">MoneyKauf</h2>
          <p>
            A cross-border transfer platform focused on speed, fee
            transparency,and secure settlement. Designed for students, proffesionals, 
            and travelers who want a "Go Local When You Travel" experience
          </p>
        </div>

        {/* Reusable Columns */}
        <FooterColumn title="Services" links={servicesLinks} />
        <FooterColumn title="Company" links={companyLinks} />
        <FooterColumn title="Support" links={supportLinks} />

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Aavrajan Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default MarketingFooter;