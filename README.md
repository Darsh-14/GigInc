# InsureGig - Guidewire DEVTrails Phase 2

Parametric micro-insurance for gig workers with automatic trigger-based claims, GPS fraud checks, and weekly premium pricing constrained to ₹20-₹50.

## Deployed App
- Public URL: `ADD_YOUR_DEPLOYED_URL_HERE`

## What Is Implemented
- Weekly premium model constrained to ₹20-₹50.
- Premium formula implemented for fallback and training targets:
  - `trigger_probability * avg_income_lost_per_day * days_exposed`
  - Adjusted by city, peril type, and worker activity tier.
- Parametric claim flow:
  - Trigger fires -> Policy checked -> Fraud verified -> Payout released.
- Enhanced fraud checks:
  - GPS vs IP distance
  - GPS vs platform-login distance
  - Teleport/speed anomaly
  - GPS accuracy fingerprint
  - claim-frequency signal
- Actuarial monitoring:
  - BCR target band: 0.55-0.70
  - Loss ratio guardrail: >0.85 suspends new enrollments
  - 14-day monsoon stress-test utility included.

## Tech Stack
- React 18 + TypeScript + Vite
- TensorFlow.js (browser inference)
- Python notebook generation for Colab training
- OpenWeatherMap API for live weather severity

## Local Source Code - Build and Run
### 1. Prerequisites
- Node.js 18+
- npm 9+
- Python 3.10+ (only for notebook generation)

### 2. Install dependencies
```bash
npm install
```

### 3. Environment setup
Create `.env` in repo root:
```bash
VITE_OPENWEATHER_API_KEY=your_key_here
VITE_SMS_API_URL=http://localhost:8787/api/sms/send
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_FROM_NUMBER=+1XXXXXXXXXX
SMS_GATEWAY_PORT=8787
```

### 4. Run app locally
```bash
npm run dev
```
Open: `http://localhost:5173`

### 4a. Start live SMS gateway (Twilio)
```bash
npm run sms:server
```
Gateway URL: `http://localhost:8787/api/sms/send`

### 5. Production build
```bash
npm run build
npm run preview
```

## Premium Model Training (Colab)
1. Open `InsureGig_Colab.ipynb` in Google Colab.
2. Upload 3 CSVs when prompted:
- `train.csv`
- `Rider-Info.csv`
- `Food_Delivery_Times.csv`
3. Run all cells.
4. Download `premium_model.zip`.
5. Extract to:
- `public/premium_model/`

Required files:
- `model.json`
- `group1-shard1of1.bin`
- `model_config.json`

## Packaged Solution
For submission package:
1. Build dist bundle:
```bash
npm run build
```
2. Include:
- `dist/`
- `src/`
- `public/`
- `package.json`
- `package-lock.json`
- `.env.example` (recommended)
- `README.md`

## Key Service Files
- `src/services/mlEngine.ts`
  - premium model loading, prediction, actuarial fallback math.
- `src/services/mockApi.ts`
  - premium API, parametric claim flow, fraud verification, actuarial metrics, stress test.
- `src/services/smsApi.ts`
  - live SMS call to backend gateway endpoint.
- `sms-gateway/server.mjs`
  - Node SMS gateway that sends real SMS via Twilio API.
- `src/app/pages/auth-page.tsx`
  - weekly premium signup UX.
- `src/app/pages/claims-page.tsx`
  - demo flow for automated parametric claims.
- `ai_model/write_notebook.py`
  - regenerates `InsureGig_Colab.ipynb` with updated Phase 2 logic.

## Notes
- If pretrained model is unavailable, app uses actuarial fallback automatically.
- Claims demo button emulates the same automated trigger pipeline used in production logic.
