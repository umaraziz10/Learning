import { useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherDisplay from './components/WeatherDisplay'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Cloud, Link } from 'lucide-react'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (cityName) => {
    setLoading(true)
    setError(null)
    
    try {
      const url = `${import.meta.env.VITE_API_URL}/weather?city=${cityName}`;
      const response = await fetch(url);
      if(!response.ok){
        if(response.status === 404){
          throw new Error('City not found, check for spelling or find another city')
        } else {
          throw new Error('Internal server error, try again later')
        }
      }
      const data = await response.json();
      
      setWeatherData(data);
    } catch (err) {
      setError(err?.message || 'Failed to fetch')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Cloud className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Weather App</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Simple Weather App implementing Redis Client-Side for Caching
          </p>
        </div>

        {/* Search Section */}
        <div className="flex justify-center mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Loading State */}
        {loading && (
          <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <p>Fetching weather data...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="p-6">
              <p className="text-center text-red-500">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Weather Display */}
        {!loading && !error && (
          <div className="flex justify-center">
            <WeatherDisplay weatherData={weatherData} />
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 pb-8">
          <p className="text-gray-500 text-sm">
            Personal Project. Front Page by <a href="manus.im">Manus AI</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

