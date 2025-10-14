import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { MapPin, Phone, MessageSquare, Navigation, CheckCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import DriverLayout from '../../components/layouts/DriverLayout';
import { useToast } from '../../hooks/use-toast';

const ActiveRide = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { ride } = location.state || {};
  const [status, setStatus] = useState('going_to_pickup'); // going_to_pickup, arrived, in_progress, completed
  const [eta, setEta] = useState(5);

  useEffect(() => {
    if (status === 'going_to_pickup' && eta > 0) {
      const timer = setInterval(() => {
        setEta(prev => {
          if (prev <= 1) {
            setStatus('arrived');
            toast({
              title: "Arrived at pickup",
              description: "Waiting for rider",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 2000);
      return () => clearInterval(timer);
    }
  }, [status, eta, toast]);

  const handleStartTrip = () => {
    setStatus('in_progress');
    toast({
      title: "Trip started",
      description: "Navigate to destination",
    });
  };

  const handleCompleteTrip = () => {
    setStatus('completed');
    toast({
      title: "Trip completed!",
      description: `You earned $${ride.fare}`,
    });
    setTimeout(() => {
      navigate('/driver/home');
    }, 2000);
  };

  if (!ride) {
    navigate('/driver/home');
    return null;
  }

  return (
    <DriverLayout>
      <div className="flex flex-col lg:flex-row h-full">
        {/* Map Section */}
        <div className="lg:w-2/3 h-96 lg:h-full bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-16 h-16 text-gray-600 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-700 text-lg font-semibold">Navigation Active</p>
              <p className="text-gray-500 text-sm">Following the best route</p>
            </div>
          </div>
          
          {/* Markers */}
          <div className="absolute top-1/3 left-1/3">
            <div className="w-4 h-4 bg-black rounded-full animate-pulse"></div>
          </div>
          <div className="absolute bottom-1/3 right-1/3">
            <MapPin className="w-6 h-6 text-black" />
          </div>
        </div>

        {/* Control Panel */}
        <div className="lg:w-1/3 bg-white p-6 overflow-y-auto">
          {/* Status Banner */}
          <div className="mb-6">
            {status === 'going_to_pickup' && (
              <div className="bg-blue-100 text-blue-900 p-4 rounded-xl">
                <div className="font-semibold mb-1">Heading to pickup</div>
                <div className="text-2xl font-bold">{eta} min away</div>
              </div>
            )}
            {status === 'arrived' && (
              <div className="bg-green-100 text-green-900 p-4 rounded-xl">
                <div className="font-semibold mb-1">Arrived at pickup</div>
                <div className="text-sm">Waiting for rider</div>
              </div>
            )}
            {status === 'in_progress' && (
              <div className="bg-purple-100 text-purple-900 p-4 rounded-xl">
                <div className="font-semibold mb-1">Trip in progress</div>
                <div className="text-sm">Navigate to destination</div>
              </div>
            )}
            {status === 'completed' && (
              <div className="bg-green-100 text-green-900 p-4 rounded-xl flex items-center">
                <CheckCircle className="w-6 h-6 mr-3" />
                <div>
                  <div className="font-semibold">Trip completed!</div>
                  <div className="text-sm">Great job!</div>
                </div>
              </div>
            )}
          </div>

          {/* Rider Info */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${ride.riderId}`} />
                  <AvatarFallback>{ride.riderName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-lg">{ride.riderName}</div>
                  <div className="text-sm text-gray-600">★ {ride.riderRating}</div>
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
          </Card>

          {/* Trip Details */}
          <Card className="p-6 mb-6">
            <h3 className="font-semibold mb-4">Trip details</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-3 h-3 rounded-full bg-black mt-2"></div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500">
                    {status === 'going_to_pickup' ? 'Pickup location' : 'Picked up from'}
                  </div>
                  <div className="font-semibold">{ride.pickup.name}</div>
                  <div className="text-sm text-gray-600">{ride.pickup.address}</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-black mt-1" />
                <div className="flex-1">
                  <div className="text-sm text-gray-500">Drop-off</div>
                  <div className="font-semibold">{ride.dropoff.name}</div>
                  <div className="text-sm text-gray-600">{ride.dropoff.address}</div>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-500">Fare</div>
                    <div className="text-2xl font-bold">${ride.fare}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Distance</div>
                    <div className="text-lg font-semibold">{ride.distance} km</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            {status === 'arrived' && (
              <Button
                onClick={handleStartTrip}
                className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg rounded-xl"
              >
                Start Trip
              </Button>
            )}
            {status === 'in_progress' && (
              <Button
                onClick={handleCompleteTrip}
                className="w-full bg-black hover:bg-gray-800 py-6 text-lg rounded-xl"
              >
                Complete Trip
              </Button>
            )}
            {status === 'going_to_pickup' && (
              <Button
                disabled
                className="w-full py-6 text-lg rounded-xl"
              >
                Navigating to pickup...
              </Button>
            )}
          </div>
        </div>
      </div>
    </DriverLayout>
  );
};

export default ActiveRide;