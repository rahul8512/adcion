# ADCOIN (ADCN) website

A responsive static website built with HTML, CSS and vanilla JavaScript. No build tools or backend are required.

## Files
- `index.html` — page structure and all website sections
- `styles.css` — responsive dark/red visual design
- `app.js` — MetaMask connect, BNB Chain switch/add, add-token request, copy contract
- `assets/adcoin-logo.png` — supplied ADCOIN logo

## Run locally
1. Extract the ZIP.
2. Open the `adcoin-website` folder.
3. Run a local static server (recommended) from that folder:
   - Python: `python -m http.server 8000`
   - Then visit `http://localhost:8000`
4. Wallet connection works on HTTPS websites or localhost, with MetaMask installed.

## Publish
Upload the complete folder contents to your hosting provider's `public_html` directory, or deploy the folder to a static host such as GitHub Pages, Cloudflare Pages, or Netlify. Keep the `assets` folder beside `index.html`.

## Before publishing
- Confirm the contract address and all token facts against the deployed contract and BscScan.
- The project creation and DEX-listing milestones are shown as supplied by the project owner; confirm the listing details and date/time before making public claims.
- A PancakeSwap link opens the swap interface with the ADCN contract preselected. It does not guarantee liquidity, tradability, price, or a successful swap.
- The MetaMask buttons request wallet connection/network selection and token display only. The site never asks for seed phrases or private keys and does not automatically execute trades.
- Add real social links, privacy/terms pages, and any required legal disclosures before launch.
- MetaMask wallet injection may differ across browsers/wallet versions. Test on desktop and mobile before publishing.

## Network values used
- Network: BNB Smart Chain Mainnet
- Chain ID: 56 (`0x38`)
- RPC: `https://bsc-dataseed.bnbchain.org`
- Explorer: `https://bscscan.com/`
