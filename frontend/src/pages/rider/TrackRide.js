import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { MapPin, Phone, MessageSquare, Star, Navigation, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { mockUsers } from '../../mock';
import RiderLayout from '../../components/layouts/RiderLayout';
import { useToast } from '../../hooks/use-toast';

const TrackRide = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { pickup, dropoff, vehicle, fare } = location.state || {};
  const [status, setStatus] = useState('finding'); // finding, arriving, onboard, completed
  const [driver, setDriver] = useState(null);
  const [eta, setEta] = useState(3);

  useEffect(() => {
    // Simulate ride progression
    const timer1 = setTimeout(() => {
      const assignedDriver = mockUsers.find(u => u.type === 'driver');
      setDriver(assignedDriver);
      setStatus('arriving');
      toast({
        title: "Driver assigned!",
        description: `${assignedDriver.name} is on the way`,
      });
    }, 2000);

    const timer2 = setTimeout(() => {
      setStatus('onboard');
      toast({
        title: "Trip started",
        description: "Enjoy your ride!",
      });
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [toast]);

  useEffect(() => {
    if (status === 'arriving' && eta > 0) {
      const timer = setInterval(() => {
        setEta(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [status, eta]);

  const handleCompleteRide = () => {
    navigate('/rider/rate-ride', { 
      state: { 
        driver,
        pickup,
        dropoff,
        fare
      } 
    });
  };

  if (!pickup || !dropoff) {
    navigate('/rider/home');
    return null;
  }

  return (
    <RiderLayout>
      <div className="flex flex-col lg:flex-row h-full">
        {/* Map Section */}
        <div className="lg:w-2/3 h-96 lg:h-full bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-500 text-lg">Live Tracking</p>
              <p className="text-gray-400 text-sm">Real-time location updates</p>
            </div>
          </div>
          
          {/* Driver location marker */}
          {driver && (
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Car className="w-6 h-6 text-white" />
              </div>
            </div>
          )}
          
          {/* Pickup marker */}
          <div className="absolute top-1/2 left-1/4">
            <div className="w-3 h-3 bg-black rounded-full"></div>
          </div>
          
          {/* Dropoff marker */}
          <div className="absolute bottom-1/4 right-1/4">
            <MapPin className="w-6 h-6 text-black" />
          </div>
        </div>

        {/* Info Panel */}
        <div className="lg:w-1/3 bg-white p-6 overflow-y-auto">
          {status === 'finding' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-black rounded-full mx-auto mb-4 animate-pulse"></div>
              <h2 className="text-2xl font-bold mb-2">Finding your driver...</h2>
              <p className="text-gray-600">This will only take a moment</p>
            </div>
          )}

          {driver && (
            <>
              {/* Status Header */}
              <div className="mb-6">
                {status === 'arriving' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Driver is arriving</h2>
                    <div className="text-3xl font-bold">{eta} min</div>
                  </div>
                )}
                {status === 'onboard' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-2">On your way</h2>
                    <p className="text-gray-600">Arriving in ~15 min</p>
                  </div>
                )}
              </div>

              {/* Driver Info */}
              <Card className="p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={driver.picture} />
                      <AvatarFallback>{driver.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-lg">{driver.name}</div>
                      <div className="flex items-center text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        {driver.rating} • {driver.totalRides} trips
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="icon" variant="outline" className="rounded-full">
                      <Phone className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="outline" className="rounded-full">
                      <MessageSquare className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-600 mb-1">Vehicle</div>
                  <div className="font-semibold">
                    {driver.vehicle.color} {driver.vehicle.make} {driver.vehicle.model}
                  </div>
                  <div className="text-lg font-bold mt-1">{driver.vehicle.plate}</div>
                </div>
              </Card>

              {/* Trip Details */}
              <Card className="p-6 mb-6">
                <h3 className="font-semibold mb-4">Trip details</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 rounded-full bg-black mt-2"></div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500">Pickup</div>
                      <div className="font-semibold">{pickup.name}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-black mt-1" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-500">Drop-off</div>
                      <div className="font-semibold">{dropoff.name}</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t flex justify-between items-center">
                    <span className="text-gray-600">Total fare</span>
                    <span className="text-2xl font-bold">${fare}</span>
                  </div>
                </div>
              </Card>

              {/* Test Complete Button */}
              {status === 'onboard' && (
                <Button
                  onClick={handleCompleteRide}
                  className="w-full bg-black hover:bg-gray-800 py-6 text-lg rounded-xl"
                >
                  Complete Ride (Test)
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </RiderLayout>
  );
};

const Car = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 11l1.5-4.5h11L19 11m-1.5 5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m-11 0A1.5 1.5 0 0 1 5 14.5A1.5 1.5 0 0 1 6.5 13A1.5 1.5 0 0 1 8 14.5A1.5 1.5 0 0 1 6.5 16M18.92 6c-.2-.58-.76-1-1.42-1h-11c-.66 0-1.22.42-1.42 1L3 12v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8l-2.08-6z"/>
  </svg>
);

export default TrackRide;