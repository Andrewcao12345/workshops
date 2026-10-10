# QueueUp: restaurant waitlist mockup

A static mockup of a QR-code restaurant waitlist. No build step and no backend.

## Flow
1. `index.html` shows a QR code poster for each demo restaurant (what you'd print at the host stand).
2. Scanning a code opens `join.html?r=<restaurant-id>`, where the guest enters their phone number and party size.
3. The status screen shows:
   - **place in line** (hardcoded `partiesAhead + 1`)
   - **estimated wait** (`place × minutesPerParty`)
   - **likely table**: the smallest table that fits the party, preferring tables that are finishing up soon, highlighted on a floor plan

To make the demo feel alive, the line moves up one spot every 10 seconds until the guest's table is ready.
Their spot is saved in `localStorage`, so it survives a page refresh.

## Run it
```bash
cd restaurant-queue
python3 -m http.server 8000
# open http://localhost:8000
```
For the QR codes to work from a phone, the site has to be reachable from that phone. Host it on
GitHub Pages, or serve it on your LAN and open the page using your computer's IP address, not `localhost`.
The QR codes always point at whatever URL the page was loaded from.

## Customize
Restaurants, table layouts, queue length and average wait times are all in `data.js`.
