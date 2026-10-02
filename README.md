# Ask Ireland (Fáilte Guide)

> An independent, open-source civic search engine, statutory residency calculator, and policy tracker for Irish public services. Grounded strictly in official `.gov.ie` documentation.

[![License: AGPL v3](https://img.shields.io/badge/License-AGPLv3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38b2ac.svg)](https://tailwindcss.com/)

---

## Overview

Navigating Irish bureaucracy is notoriously opaque for newcomers, immigrants, and long-term residents. Official portals often bury critical rules in 50-page PDF circulars, and standard keyword search bars fail when queries contain informal phrasing or broken English.

**Ask Ireland** provides a clean, fast, client-side toolkit that delivers direct answers with verified source links and actionable checklists.

---

## Key Modules

### 1. Grounded Semantic & Syntactic Search
* **Intent-Tolerant Engine:** Uses fuzzy matching and dense keyword normalization to resolve broken English, typos, and immigrant shorthand (e.g., *"how change stamp 1 to stamp 4 21 month work"*, *"ppsn without house rent lease"*, *"gnib card renewal"*).
* **3-Card Response:** Every answer outputs:
  1. Plain-English direct summary.
  2. Statutory conditions & key facts.
  3. Actionable next steps with exact portal links.
* **Grounded Citations:** Directly cites verified URLs from `citizensinformation.ie`, `irishimmigration.ie`, `revenue.ie`, and `enterprise.gov.ie`.

### 2. Intelligent Citizenship Reckonable Residence Engine
* **Statutory Calculation:** Audits residency against the 1,825-day requirement under the *Irish Nationality and Citizenship Act 1956*.
* **2023 Statutory Absence Update:** Implements the *Courts and Civil Law (Miscellaneous Provisions) Act 2023* rules:
  * Up to **70 days** standard statutory allowance per year.
  * Up to **100 days** with certified exceptional circumstances.
  * Major absences (>100 days) flagged as breaking continuous ordinary residence.
* **Unregistered Gap Audit:** Detects gaps between consecutive IRP card renewals and flags unreckonable periods exceeding 60 days.
* **Continuous 1-Year Check:** Verifies that the final 365 days prior to application remain unbroken.

### 3. Emergency Tax Recovery Guide
* Explains the 40% PAYE + 8% USC emergency deduction mechanics.
* Walks users through adding their job on Revenue `myAccount`.
* Includes a copy-paste email template to request the employer's 8-character Tax Registration Number (TRN).

### 4. Policy Updates & Statutory News Feed
* Live feed tracking legislative updates, employment permit salary threshold changes, and ISD administrative notices.
* Categorized by Statutory Changes, Salary & Thresholds, and Operational Notices.

### 5. Official Government Portals Directory
* Curated direct outbound directory to authenticated state services (MyWelfare, Revenue myAccount, ISD Online, RTB, NDLS, EPOS).

---

## Legal & Privacy Architecture

### Zero-Knowledge Architecture (100% GDPR Compliant)
* The platform processes **no personal data on any server**.
* No accounts, no database storage, no tracking cookies, and no analytics beacons.
* All residency calculations happen strictly inside the user's browser memory (`localStorage` / `IndexedDB`). Under Article 4(1) GDPR, the platform operator does not act as a Data Controller.

### Legal Services Regulation Act 2015 Notice
* This application provides general public sector information and mathematical date calculations only. 
* It does not provide legal representation, case advice, or legal counsel. The official English statutory text on `gov.ie` and `irishstatutebook.ie` prevails in all legal matters.

### Non-Affiliation Disclaimer
* **Ask Ireland** is an independent community civic project. It is not affiliated with, endorsed by, or operated by the Government of Ireland, the Department of Justice, or the Revenue Commissioners.

---

## Getting Started

### Prerequisites
* Node.js v18+ (tested on Node.js v24)
* npm v9+

### Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/thassan66/ask-ireland.git
cd ask-ireland

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Building for Production

```bash
npm run build
```

The production-ready static assets will be output to the `dist/` directory, ready for deployment to Cloudflare Pages, Vercel, or GitHub Pages at zero hosting cost.

---

## Scheduled Sitemaps & News Harvester

The repository includes Python automation scripts for scheduled indexing:

```bash
# Crawl target official sitemaps
python3 scripts/crawler.py

# Poll official government RSS feeds
python3 scripts/sync_gov_news.py
```

---

## Contributing

Contributions are welcome under the **GNU Affero General Public License v3 (AGPLv3)**. Please submit pull requests for verified statutory rule updates, additional agency mappings, or UI enhancements.

---

## License

Distributed under the **AGPLv3 License**. See `LICENSE` for details. Built using public sector data under the *European Union (Open Data and Re-use of Public Sector Information) Regulations 2021*.
