import type {
  AirQualityData,
  Coordinates,
  ForecastData,
  GeocodingResponse,
  WeatherData,
} from './types';

class WeatherAPI {
  private baseProxy = '/api/weather-proxy';

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Proxy API Error: ${response.statusText}`);
    return response.json();
  }

  async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
    return this.fetchData<WeatherData>(
      `${this.baseProxy}?endpoint=weather&lat=${lat}&lon=${lon}`
    );
  }

  async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    return this.fetchData<ForecastData>(
      `${this.baseProxy}?endpoint=forecast&lat=${lat}&lon=${lon}`
    );
  }

  async reverseGeocode({
    lat,
    lon,
  }: Coordinates): Promise<GeocodingResponse[]> {
    return this.fetchData<GeocodingResponse[]>(
      `${this.baseProxy}?endpoint=reverse&lat=${lat}&lon=${lon}`
    );
  }

  async searchLocations(query: string): Promise<GeocodingResponse[]> {
    return this.fetchData<GeocodingResponse[]>(
      `${this.baseProxy}?endpoint=direct&q=${query}`
    );
  }

  async getAirQuality({ lat, lon }: Coordinates): Promise<AirQualityData> {
    return this.fetchData<AirQualityData>(
      `${this.baseProxy}?endpoint=air_pollution&lat=${lat}&lon=${lon}`
    );
  }
}

export const weatherAPI = new WeatherAPI();
