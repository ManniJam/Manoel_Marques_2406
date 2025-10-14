import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Car, Users, Crown, Truck, Clock, MapPin, CreditCard } from 'lucide-react';
import { mockVehicleTypes, calculateFare, mockPaymentMethods } from '../../mock';
import RiderLayout from '../../components/layouts/RiderLayout';
import { useToast } from '../../hooks/use-toast';

const BookRide = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { pickup, dropoff } = location.state || {};
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(mockPaymentMethods.find(p => p.isDefault));

  const distance = 5.2; // Mock distance

  const getVehicleIcon = (iconName) => {
    switch(iconName) {
      case 'Car': return Car;
      case 'Truck': return Truck;
      case 'Crown': return Crown;
      default: return Car;
    }
  };

  const handleBookRide = () => {
    if (!selectedVehicle) return;
    
    toast({
      title: "Ride requested!",
      description: "Finding a nearby driver...",
    });

    setTimeout(() => {
      navigate('/rider/track-ride', { 
        state: { 
          pickup, 
          dropoff, 
          vehicle: selectedVehicle,
          fare: calculateFare(selectedVehicle.id, distance)
        } 
      });
    }, 1500);
  };

  if (!pickup || !dropoff) {
    navigate('/rider/home');
    return null;
  }

  return (
    <RiderLayout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Route Info */}
        <Card className="p-6 mb-6">
          <div className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-black"></div>
              <div className="w-0.5 h-12 bg-gray-300"></div>
              <MapPin className="w-5 h-5 text-black" />
            </div>
            <div className="flex-1">
              <div className="mb-8">
                <div className="text-sm text-gray-500 mb-1">Pickup</div>
                <div className="font-semibold text-lg">{pickup.name}</div>
                <div className="text-sm text-gray-600">{pickup.address}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Drop-off</div>
                <div className="font-semibold text-lg">{dropoff.name}</div>
                <div className="text-sm text-gray-600">{dropoff.address}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Distance</div>
              <div className="font-semibold text-xl">{distance} km</div>
            </div>
          </div>
        </Card>

        {/* Vehicle Selection */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Choose a ride</h2>
          <div className="space-y-3">
            {mockVehicleTypes.map(vehicle => {
              const Icon = getVehicleIcon(vehicle.icon);
              const fare = calculateFare(vehicle.id, distance);
              return (
                <Card
                  key={vehicle.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                    selectedVehicle?.id === vehicle.id ? 'ring-2 ring-black' : ''
                  }`}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-lg flex items-center">
                          {vehicle.name}
                          <Users className="w-4 h-4 ml-2 text-gray-400" />
                          <span className="text-sm text-gray-500 ml-1">{vehicle.capacity}</span>
                        </div>
                        <div className="text-sm text-gray-600">{vehicle.description}</div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {vehicle.estimatedTime} away
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">${fare}</div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Payment Method */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Method
          </h3>
          <div className="space-y-2">
            {mockPaymentMethods.map(method => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedPayment?.id === method.id 
                    ? 'border-black bg-gray-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {method.type === 'card' ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{method.brand} •••• {method.last4}</div>
                      {method.isDefault && (
                        <div className="text-xs text-gray-500">Default</div>
                      )}
                    </div>
                    <CreditCard className="w-5 h-5 text-gray-400" />
                  </div>
                ) : (
                  <div className="font-semibold">Cash</div>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Confirm Button */}
        <Button
          onClick={handleBookRide}
          disabled={!selectedVehicle}
          className="w-full bg-black hover:bg-gray-800 py-6 text-lg rounded-xl transition-all"
        >
          Request {selectedVehicle?.name || 'ride'}
        </Button>
      </div>
    </RiderLayout>
  );
};

export default BookRide;