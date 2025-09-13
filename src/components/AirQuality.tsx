import { Wind, AlertTriangle, Smile, Frown, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AirQualityData } from '@/api/types';

interface AirQualityProps {
  data?: AirQualityData | null;
  isLoading: boolean;
}

const AQI_LEVELS = [
  { label: 'Good', color: 'text-green-500', icon: Smile },
  { label: 'Fair', color: 'text-yellow-500', icon: Cloud },
  { label: 'Moderate', color: 'text-orange-500', icon: Wind },
  { label: 'Poor', color: 'text-red-500', icon: AlertTriangle },
  { label: 'Very Poor', color: 'text-purple-500', icon: Frown },
];

const AirQuality = ({ data, isLoading }: AirQualityProps) => {
  if (isLoading)
    return (
      <Card>
        <CardContent>Loading AQI...</CardContent>
      </Card>
    );
  if (!data)
    return (
      <Card>
        <CardContent>No air quality data available</CardContent>
      </Card>
    );

  const aqi = data.list[0].main.aqi;
  const components = data.list[0].components;

  const { label, color, icon: Icon } = AQI_LEVELS[aqi - 1];

  return (
    <Card className='h-full'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Air Quality Index</CardTitle>
        <Icon className={`h-6 w-6 ${color}`} />
      </CardHeader>
      <CardContent>
        <p className={`font-semibold text-2xl ${color}`}>
          AQI {aqi}: {label}
        </p>
        <p className='text-sm text-muted-foreground mb-3'>
          (Lower values mean cleaner, healthier air)
        </p>

        {/* Pollutants grid */}
        <div className='grid grid-cols-2 gap-3 text-base'>
          <div className='flex flex-col'>
            <span className='font-medium'>PM2.5</span>
            <span>{components.pm2_5} µg/m³</span>
          </div>
          <div className='flex flex-col'>
            <span className='font-medium'>PM10</span>
            <span>{components.pm10} µg/m³</span>
          </div>
          <div className='flex flex-col'>
            <span className='font-medium'>O₃</span>
            <span>{components.o3} µg/m³</span>
          </div>
          <div className='flex flex-col'>
            <span className='font-medium'>NO₂</span>
            <span>{components.no2} µg/m³</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirQuality;
