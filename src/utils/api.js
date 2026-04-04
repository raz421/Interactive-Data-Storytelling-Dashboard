const palette = {
  primary: "#4F46E5",
  secondary: "#6366F1",
  accent: "#FACC15",
};

function toNumber(value, fallback = 0) {
  const nextValue = Number(value);
  return Number.isFinite(nextValue) ? nextValue : fallback;
}

function buildFallbackBundle(dataset, days) {
  const labels = Array.from({ length: days }, (_, index) => `Day ${index + 1}`);
  const baseline =
    dataset === "covid" ? 42000 : dataset === "weather" ? 16 : 52000;

  const lineSeries = labels.map((label, index) => ({
    label,
    value: Math.round(
      baseline + Math.sin(index / 2) * baseline * 0.08 + index * 41,
    ),
  }));

  const barSeries = [
    { label: "North America", value: baseline * 0.35 },
    { label: "Europe", value: baseline * 0.2 },
    { label: "Asia", value: baseline * 0.3 },
    { label: "Other", value: baseline * 0.15 },
  ];

  const pieSeries = [
    { label: "Category A", value: 44 },
    { label: "Category B", value: 21 },
    { label: "Category C", value: 19 },
    { label: "Category D", value: 16 },
  ];

  const stats = [
    {
      label: "Current Index",
      value: lineSeries[lineSeries.length - 1].value.toLocaleString(),
    },
    {
      label: "7-day Delta",
      value: `${((lineSeries[lineSeries.length - 1].value / lineSeries[0].value - 1) * 100).toFixed(1)}%`,
    },
    { label: "Coverage", value: "Global" },
  ];

  return {
    lineSeries,
    barSeries,
    pieSeries,
    stats,
    colors: palette,
  };
}

async function fetchCryptoBundle(days) {
  const marketChartUrl = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`;
  const topCoinsUrl =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=1";

  const [marketChartResponse, topCoinsResponse] = await Promise.all([
    fetch(marketChartUrl),
    fetch(topCoinsUrl),
  ]);

  if (!marketChartResponse.ok || !topCoinsResponse.ok) {
    throw new Error("Crypto API unavailable");
  }

  const marketChartData = await marketChartResponse.json();
  const topCoinsData = await topCoinsResponse.json();

  const lineSeries = (marketChartData.prices || []).map(
    ([timestamp, price]) => ({
      label: new Date(timestamp).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      value: toNumber(price),
    }),
  );

  const barSeries = topCoinsData.map((coin) => ({
    label: coin.symbol.toUpperCase(),
    value: toNumber(coin.market_cap),
  }));

  const pieSeries = topCoinsData.map((coin) => ({
    label: coin.symbol.toUpperCase(),
    value: toNumber(coin.market_cap),
  }));

  const latest = topCoinsData[0];
  const stats = [
    {
      label: "BTC Price",
      value: `$${toNumber(latest?.current_price).toLocaleString()}`,
    },
    {
      label: "BTC 24h",
      value: `${toNumber(latest?.price_change_percentage_24h).toFixed(2)}%`,
    },
    { label: "Tracked Coins", value: `${topCoinsData.length}` },
  ];

  return {
    lineSeries,
    barSeries,
    pieSeries,
    stats,
    colors: palette,
  };
}

async function fetchCovidBundle(days) {
  const timelineUrl = `https://disease.sh/v3/covid-19/historical/all?lastdays=${days}`;
  const countriesUrl = "https://disease.sh/v3/covid-19/countries?sort=cases";

  const [timelineResponse, countriesResponse] = await Promise.all([
    fetch(timelineUrl),
    fetch(countriesUrl),
  ]);

  if (!timelineResponse.ok || !countriesResponse.ok) {
    throw new Error("COVID API unavailable");
  }

  const timelineData = await timelineResponse.json();
  const countriesData = await countriesResponse.json();

  const lineSeries = Object.entries(timelineData.cases || {}).map(
    ([label, value]) => ({
      label,
      value: toNumber(value),
    }),
  );

  const topCountries = countriesData.slice(0, 6);

  const barSeries = topCountries.map((country) => ({
    label: country.country,
    value: toNumber(country.todayCases),
  }));

  const pieSeries = topCountries.map((country) => ({
    label: country.country,
    value: toNumber(country.cases),
  }));

  const stats = [
    {
      label: "Global Cases",
      value: toNumber(countriesData[0]?.cases).toLocaleString(),
    },
    {
      label: "New Cases",
      value: toNumber(countriesData[0]?.todayCases).toLocaleString(),
    },
    {
      label: "Recovered",
      value: toNumber(countriesData[0]?.recovered).toLocaleString(),
    },
  ];

  return {
    lineSeries,
    barSeries,
    pieSeries,
    stats,
    colors: palette,
  };
}

function averageDailyTemperature(hourlyTimes, hourlyValues) {
  const buckets = {};

  hourlyTimes.forEach((time, index) => {
    const day = time.slice(5, 10);
    if (!buckets[day]) {
      buckets[day] = { total: 0, count: 0 };
    }
    buckets[day].total += toNumber(hourlyValues[index]);
    buckets[day].count += 1;
  });

  return Object.entries(buckets).map(([day, values]) => ({
    label: day,
    value: values.total / values.count,
  }));
}

async function fetchWeatherBundle(days) {
  const cityRequests = [
    { label: "New York", latitude: 40.7128, longitude: -74.006 },
    { label: "London", latitude: 51.5072, longitude: -0.1276 },
    { label: "Tokyo", latitude: 35.6762, longitude: 139.6503 },
    { label: "Sydney", latitude: -33.8688, longitude: 151.2093 },
  ];

  const forecastDays = Math.min(days, 16);
  const baseWeatherUrl = `https://api.open-meteo.com/v1/forecast?hourly=temperature_2m&current=temperature_2m&timezone=auto&forecast_days=${forecastDays}`;

  const globalResponse = await fetch(
    `${baseWeatherUrl}&latitude=20&longitude=0`,
  );
  if (!globalResponse.ok) {
    throw new Error("Weather API unavailable");
  }

  const globalData = await globalResponse.json();
  const lineSeries = averageDailyTemperature(
    globalData.hourly?.time || [],
    globalData.hourly?.temperature_2m || [],
  );

  const cityResponses = await Promise.all(
    cityRequests.map(async (city) => {
      const cityResponse = await fetch(
        `${baseWeatherUrl}&latitude=${city.latitude}&longitude=${city.longitude}`,
      );
      const cityData = await cityResponse.json();
      return {
        label: city.label,
        value: toNumber(cityData.current?.temperature_2m),
      };
    }),
  );

  const barSeries = cityResponses;
  const pieSeries = cityResponses;

  const stats = [
    { label: "Avg Temp", value: `${lineSeries.at(-1)?.value.toFixed(1)} C` },
    {
      label: "Warmest City",
      value: cityResponses.sort((a, b) => b.value - a.value)[0]?.label,
    },
    { label: "Cities Tracked", value: `${cityResponses.length}` },
  ];

  return {
    lineSeries,
    barSeries,
    pieSeries,
    stats,
    colors: palette,
  };
}

export async function getDatasetBundle(filters) {
  const days = toNumber(filters.timeRange, 30);

  try {
    if (filters.dataset === "crypto") {
      return await fetchCryptoBundle(days);
    }

    if (filters.dataset === "covid") {
      return await fetchCovidBundle(days);
    }

    if (filters.dataset === "weather") {
      return await fetchWeatherBundle(days);
    }

    return buildFallbackBundle(filters.dataset, days);
  } catch {
    return buildFallbackBundle(filters.dataset, days);
  }
}

export async function getGlobePoints(dataset) {
  if (dataset === "covid") {
    const response = await fetch("https://disease.sh/v3/covid-19/countries");
    if (!response.ok) {
      throw new Error("Unable to load globe points");
    }

    const countries = await response.json();
    return countries.slice(0, 120).map((country) => ({
      name: country.country,
      lat: toNumber(country.countryInfo?.lat),
      lng: toNumber(country.countryInfo?.long),
      value: toNumber(country.todayCases),
    }));
  }

  const fallbackHubs = [
    { name: "New York", lat: 40.7128, lng: -74.006, value: 88 },
    { name: "London", lat: 51.5072, lng: -0.1276, value: 73 },
    { name: "Singapore", lat: 1.3521, lng: 103.8198, value: 69 },
    { name: "Dubai", lat: 25.2048, lng: 55.2708, value: 62 },
    { name: "Tokyo", lat: 35.6762, lng: 139.6503, value: 81 },
  ];

  return fallbackHubs;
}
