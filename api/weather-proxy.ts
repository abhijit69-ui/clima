import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { endpoint, lat, lon, q } = req.query;

  if (!endpoint) {
    return res.status(400).json({ error: "Missing 'endpoint' parameter" });
  }

  let url = '';

  if (endpoint === 'weather') {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;
  } else if (endpoint === 'forecast') {
    url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;
  } else if (endpoint === 'air_pollution') {
    url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`;
  } else if (endpoint === 'reverse') {
    url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.OPENWEATHER_API_KEY}`;
  } else if (endpoint === 'direct') {
    url = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=5&appid=${process.env.OPENWEATHER_API_KEY}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*'); // ✅ allows your frontend
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch OpenWeather data' });
  }
}
