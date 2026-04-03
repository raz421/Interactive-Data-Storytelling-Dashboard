# Interactive Data Storytelling Dashboard

A modern React dashboard for exploring live public datasets through animated charts, summary cards, and a 3D globe view.

## Features

- Interactive filters for dataset, time range, and category
- Animated UI transitions with Framer Motion
- Line, bar, and pie charts powered by Chart.js
- 3D globe visualization powered by react-globe.gl and three.js
- Light and dark mode toggle (dark mode default)
- Lazy-loaded heavy modules for improved initial load performance
- Fallback data when external APIs are unavailable

## Data Sources

- Crypto: CoinGecko API
- COVID: disease.sh API
- Weather: Open-Meteo API

Note: Data updates happen when filters change. The app does not use continuous streaming (WebSocket or SSE).

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS
- Chart.js + react-chartjs-2
- Framer Motion

## Project Structure

```
DataStoryDashboard/
	src/
		components/
		context/
		utils/
```

## Getting Started

1. Install dependencies:

```bash
cd DataStoryDashboard
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open the app in your browser:

```
http://localhost:5173
```

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Build production assets
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks

## Build

```bash
npm run build
```

Production files are generated in `dist/`.

## Notes

- Some large chunk warnings may appear due to 3D globe dependencies. This is expected for globe rendering libraries.
- The dashboard gracefully falls back to generated demo data if an external API call fails.
