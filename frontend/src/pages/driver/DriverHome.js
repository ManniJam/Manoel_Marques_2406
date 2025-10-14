import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Switch } from '../../components/ui/switch';
import { MapPin, Navigation, User, Star, DollarSign, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { mockDriverRides, mockUsers } from '../../mock';
import DriverLayout from '../../components/layouts/DriverLayout';
import { useToast } from '../../hooks/use-toast';

const DriverHome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(false);
  const [availableRides, setAvailableRides] = useState([]);

  useEffect(() => {
    if (isOnline) {
      // Simulate receiving ride requests
      setTimeout(() => {
        setAvailableRides(mockDriverRides);
        toast({
          title: "New ride requests!",
          description: `${mockDriverRides.length} riders nearby need a ride`,
        });
      }, 2000);
    } else {
      setAvailableRides([]);
    }
  }, [isOnline, toast]);

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      toast({
        title: "You're online!",
        description: "You'll start receiving ride requests",
      });
    } else {
      toast({
        title: "You're offline",
        description: "You won't receive new ride requests",
      });
    }
  };

  const handleAcceptRide = (ride) => {
    navigate('/driver/active-ride', { state: { ride } });
  };

  return (
    <DriverLayout>
      <div className="flex flex-col lg:flex-row h-full">
        {/* Map Section */}
        <div className="lg:w-2/3 h-96 lg:h-full bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {isOnline ? (
                <>
                  <Navigation className="w-16 h-16 text-green-600 mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-700 text-lg font-semibold">You're Online</p>
                  <p className="text-gray-500 text-sm">Searching for nearby riders...</p>
                </>
              ) : (
                <>
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">You're Offline</p>
                  <p className="text-gray-400 text-sm">Go online to start earning</p>
                </>
              )}
            </div>
          </div>
          {/* Your location marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className={`w-6 h-6 rounded-full border-4 border-white shadow-lg ${
              isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
            }`}></div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="lg:w-1/3 bg-white p-6 overflow-y-auto">
          {/* Online Toggle */}
          <Card className="p-6 mb-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">Status</h3>
                <p className="text-sm text-gray-300">
                  {isOnline ? "You're receiving requests" : "Go online to earn"}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">{isOnline ? 'Online' : 'Offline'}</span>
                <Switch
                  checked={isOnline}
                  onCheckedChange={handleToggleOnline}
                  className="data-[state=checked]:bg-green-500"
                />
              </div>
            </div>
          </Card>

          {!isOnline ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">You're offline</h3>
              <p className="text-gray-600 mb-6">Turn on to start receiving ride requests</p>
            </div>
          ) : availableRides.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Navigation className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Searching...</h3>
              <p className="text-gray-600">Looking for ride requests nearby</p>
            </div>
          ) : (
            <div>
              <h3 className="font-semibold mb-4">Available rides ({availableRides.length})</h3>
              <div className="space-y-4">
                {availableRides.map(ride => (
                  <Card key={ride.id} className="p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${ride.riderId}`} />
                          <AvatarFallback>{ride.riderName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{ride.riderName}</div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                            {ride.riderRating}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${ride.fare}</div>
                        <div className="text-sm text-gray-500">{ride.distance} km</div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-3 h-3 rounded-full bg-black mt-2"></div>
                        <div>
                          <div className="text-sm text-gray-500">Pickup</div>
                          <div className="font-medium">{ride.pickup.name}</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-black mt-1" />
                        <div>
                          <div className="text-sm text-gray-500">Drop-off</div>
                          <div className="font-medium">{ride.dropoff.name}</div>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleAcceptRide(ride)}
                      className="w-full bg-black hover:bg-gray-800 py-6 text-lg rounded-xl"
                    >
                      Accept Ride
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </DriverLayout>
  );
};

export default DriverHome;