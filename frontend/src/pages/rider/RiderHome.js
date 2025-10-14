import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { MapPin, Search, Clock, Star, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockLocations, mockVehicleTypes } from '../../mock';
import RiderLayout from '../../components/layouts/RiderLayout';

const RiderHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);

  const handleBookRide = () => {
    if (pickup && dropoff) {
      navigate('/rider/book-ride', { 
        state: { 
          pickup: mockLocations.find(l => l.name.toLowerCase().includes(pickup.toLowerCase())) || mockLocations[0],
          dropoff: mockLocations.find(l => l.name.toLowerCase().includes(dropoff.toLowerCase())) || mockLocations[1]
        } 
      });
    }
  };

  const selectPickup = (location) => {
    setPickup(location.name);
    setShowPickupSuggestions(false);
  };

  const selectDropoff = (location) => {
    setDropoff(location.name);
    setShowDropoffSuggestions(false);
  };

  return (
    <RiderLayout>
      <div className="flex flex-col lg:flex-row h-full">
        {/* Map Section */}
        <div className="lg:w-2/3 h-64 lg:h-full bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          {/* Mock Map */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Map View</p>
              <p className="text-gray-400 text-sm">Interactive map coming soon</p>
            </div>
          </div>
          {/* Current Location Marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-black rounded-full border-4 border-white shadow-lg animate-pulse"></div>
          </div>
        </div>

        {/* Booking Panel */}
        <div className="lg:w-1/3 bg-white p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Where to?</h2>
            <p className="text-gray-600">Plan your trip</p>
          </div>

          {/* Pickup Input */}
          <div className="mb-4 relative">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                onFocus={() => setShowPickupSuggestions(true)}
                className="pl-11 py-6 text-lg rounded-xl"
              />
            </div>
            {showPickupSuggestions && pickup && (
              <Card className="absolute z-10 w-full mt-2 max-h-60 overflow-y-auto">
                {mockLocations
                  .filter(loc => loc.name.toLowerCase().includes(pickup.toLowerCase()))
                  .map(location => (
                    <button
                      key={location.id}
                      onClick={() => selectPickup(location)}
                      className="w-full text-left p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                    >
                      <div className="font-semibold">{location.name}</div>
                      <div className="text-sm text-gray-600">{location.address}</div>
                    </button>
                  ))}
              </Card>
            )}
          </div>

          {/* Dropoff Input */}
          <div className="mb-6 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Drop-off location"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                onFocus={() => setShowDropoffSuggestions(true)}
                className="pl-11 py-6 text-lg rounded-xl"
              />
            </div>
            {showDropoffSuggestions && dropoff && (
              <Card className="absolute z-10 w-full mt-2 max-h-60 overflow-y-auto">
                {mockLocations
                  .filter(loc => loc.name.toLowerCase().includes(dropoff.toLowerCase()))
                  .map(location => (
                    <button
                      key={location.id}
                      onClick={() => selectDropoff(location)}
                      className="w-full text-left p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                    >
                      <div className="font-semibold">{location.name}</div>
                      <div className="text-sm text-gray-600">{location.address}</div>
                    </button>
                  ))}
              </Card>
            )}
          </div>

          <Button
            onClick={handleBookRide}
            disabled={!pickup || !dropoff}
            className="w-full bg-black hover:bg-gray-800 py-6 text-lg rounded-xl transition-all"
          >
            See prices
          </Button>

          {/* Recent Trips */}
          <div className="mt-8">
            <h3 className="font-semibold mb-4 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Recent
            </h3>
            <div className="space-y-3">
              {mockLocations.slice(0, 3).map(location => (
                <button
                  key={location.id}
                  onClick={() => selectDropoff(location)}
                  className="w-full text-left p-4 rounded-xl hover:bg-gray-50 transition-colors border"
                >
                  <div className="font-semibold">{location.name}</div>
                  <div className="text-sm text-gray-600">{location.address}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RiderLayout>
  );
};

export default RiderHome;