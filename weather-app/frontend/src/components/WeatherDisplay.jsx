import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sun, 
  Moon,
  Cloud,
  CloudRain
} from 'lucide-react'

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData?.data) {
    return (
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <p className="text-center text-gray-500">
            Discover the weather in any city around the world today
          </p>
        </CardContent>
      </Card>
    )
  }

  const { data } = weatherData
  const current = data.currentConditions || {}
  const today = data.days[0] || {}

  // Convert Fahrenheit to Celsius
  const toCelsius = (fahrenheit) => Math.round((fahrenheit - 32) * 5/9)
  
  const getIcon = (data) => {
    if (data?.currentConditions?.icon) {
      return data.currentConditions.icon;
    }
    if (data?.days?.[0]?.icon) {
      return data.days[0].icon;
    }
    return null;
  };

 const getWeatherIcon = (icon) => {
  switch (icon) {
    case 'rain':
      return (
        <div className="flex flex-col items-center">
          <CloudRain className="h-8 w-8 text-blue-500" />
          <span className="text-sm text-gray-600">Rain</span>
        </div>
      )
    case 'cloudy':
      return (
        <div className="flex flex-col items-center">
          <Cloud className="h-8 w-8 text-gray-500" />
          <span className="text-sm text-gray-600">Cloudy</span>
        </div>
      )
    case 'clear-day':
      return (
        <div className="flex flex-col items-center">
          <Sun className="h-8 w-8 text-yellow-500" />
          <span className="text-sm text-gray-600">Clear Day</span>
        </div>
      )
    case 'clear-night':
      return (
        <div className="flex flex-col items-center">
          <Moon className="h-8 w-8 text-blue-300" />
          <span className="text-sm text-gray-600">Clear Night</span>
        </div>
      )
    case 'partly-cloudy-day':
      return (
        <div className="flex flex-col items-center">
          <Cloud className="h-8 w-8 text-blue-300" />
          <span className="text-sm text-gray-600">Partly Cloudy</span>
        </div>
      )
    default:
      return (
        <div className="flex flex-col items-center">
          <Sun className="h-8 w-8 text-yellow-500" />
          <span className="text-sm text-gray-600">Sunny</span>
        </div>
      )
  }
}

const icon = getIcon(data)
  return (
    <div className="w-full max-w-4xl space-y-4">
      {/* Main Weather Card */}
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold capitalize">{data.resolvedAddress}</h2>
              <p className="text-sm text-gray-500">{data.timezone}</p>
            </div>
            {getWeatherIcon(icon)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Temperature */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-red-500" />
                <span className="text-3xl font-bold">{toCelsius(current.temp) || toCelsius(today.temp)}°C</span>
              </div>
              <p className="text-sm text-gray-600">
                Feels like {toCelsius(current.feelslike) || toCelsius(today.feelslike)}°C
              </p>
              <Badge variant="secondary">{current.conditions || today.conditions}</Badge>
            </div>

            {/* Temperature Range */}
            <div className="space-y-2">
              <h3 className="font-semibold">Today Temparature Range</h3>
              <div className="flex justify-between">
                <span>Min: {toCelsius(today.tempmin)}°C</span>
                <span>Max: {toCelsius(today.tempmax)}°C</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Humidity */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Humidity</p>
                <p className="text-xl font-semibold">{Math.round(current.humidity) || Math.round(today.humidity)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wind */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Wind Speed</p>
                <p className="text-xl font-semibold">{current.windspeed || today.windspeed} km/h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visibility */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Visibility</p>
                <p className="text-xl font-semibold">{current.visibility || today.visibility} km</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pressure */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Pressure</p>
                <p className="text-xl font-semibold">{current.pressure || today.pressure} mb</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* UV Index */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">UV Index</p>
                <p className="text-xl font-semibold">{current.uvindex || today.uvindex}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Precipitation */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CloudRain className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Precipitation</p>
                <p className="text-xl font-semibold">{current.precip || today.precip} mm</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sunrise/Sunset */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-around">
            <div className="text-center">
              <Sun className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Sunrise</p>
              <p className="font-semibold">{current.sunrise || today.sunrise}</p>
            </div>
            <div className="text-center">
              <Moon className="h-6 w-6 text-blue-300 mx-auto mb-1" />
              <p className="text-sm text-gray-600">Sunset</p>
              <p className="font-semibold">{current.sunset || today.sunset}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default WeatherDisplay

