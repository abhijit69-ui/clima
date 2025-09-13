import CurrentWeather from '@/components/CurrentWeather';
import HourlyTemp from '@/components/HourlyTemp';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import WeatherDetails from '@/components/WeatherDetails';
import { useGeolocation } from '@/hooks/useGeolocation';
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from '@/hooks/useWeather';
import { AlertTriangle, MapPin, RefreshCw } from 'lucide-react';

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (locationLoading) {
    return <LoadingSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant='destructive'>
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>{locationError}</p>
          <Button
            onClick={getLocation}
            variant='outline'
            className='w-fit cursor-pointer'
          >
            <MapPin className='mr-2 h-4 w-4' />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  if (!coordinates) {
    return (
      <Alert variant='destructive'>
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>Please enable location access to see your local weather.</p>
          <Button
            onClick={getLocation}
            variant='outline'
            className='w-fit cursor-pointer'
          >
            <MapPin className='mr-2 h-4 w-4' />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant='destructive'>
        <AlertTriangle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>Failed to fetch weather data. Please try again.</p>
          <Button
            onClick={handleRefresh}
            variant='outline'
            className='w-fit cursor-pointer'
          >
            <RefreshCw className='mr-2 h-4 w-4' />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <LoadingSkeleton />;
  }

  return (
    <div className='space-y-4'>
      {/* fav cities */}
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button
          className='cursor-pointer'
          variant={'outline'}
          size={'icon'}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw
            className={`h-4 w-4 ${
              weatherQuery.isFetching ? 'animate-spin' : ''
            }`}
          />
        </Button>
      </div>

      <div className='grid gap-6'>
        <div className='flex flex-col lg:flex-row gap-4'>
          {/* current and hourly weather */}
          <CurrentWeather
            data={weatherQuery.data}
            locationName={locationName}
          />

          <HourlyTemp data={forecastQuery.data} />
        </div>

        <div>
          {/* details */}
          <WeatherDetails data={weatherQuery.data} />
          {/* forecast */}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
