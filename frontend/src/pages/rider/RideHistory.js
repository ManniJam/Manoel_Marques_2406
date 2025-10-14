import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { MapPin, Calendar, Star, ChevronRight } from 'lucide-react';
import { mockRides, mockUsers, mockVehicleTypes } from '../../mock';
import RiderLayout from '../../components/layouts/RiderLayout';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

const RideHistory = () => {
  const [selectedTab, setSelectedTab] = useState('all');

  const completedRides = mockRides.filter(r => r.status === 'completed');
  const activeRides = mockRides.filter(r => r.status === 'active');

  const RideCard = ({ ride }) => {
    const driver = mockUsers.find(u => u.id === ride.driverId);
    const vehicleType = mockVehicleTypes.find(v => v.id === ride.vehicleType);

    return (
      <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-3 h-3 rounded-full bg-black"></div>
              <div>
                <div className="font-semibold">{ride.pickup.name}</div>
                <div className="text-sm text-gray-500">{ride.pickup.address}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <MapPin className="w-5 h-5 text-black" />
              <div>
                <div className="font-semibold">{ride.dropoff.name}</div>
                <div className="text-sm text-gray-500">{ride.dropoff.address}</div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${ride.fare}</div>
            <div className="text-sm text-gray-500">{ride.distance} km</div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-3">
            {driver && (
              <>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={driver.picture} />
                  <AvatarFallback>{driver.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{driver.name}</div>
                  <div className="text-sm text-gray-500">{vehicleType?.name}</div>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {ride.status === 'completed' && ride.rating && (
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < ride.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mt-3">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(ride.requestedAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>

        {ride.status === 'active' && (
          <div className="mt-4">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Active ride
            </div>
          </div>
        )}
      </Card>
    );
  };

  return (
    <RiderLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your trips</h1>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All trips</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {mockRides.length === 0 ? (
              <Card className="p-12 text-center">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No trips yet</h3>
                <p className="text-gray-600">Your ride history will appear here</p>
              </Card>
            ) : (
              mockRides.map(ride => <RideCard key={ride.id} ride={ride} />)
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4 mt-6">
            {activeRides.length === 0 ? (
              <Card className="p-12 text-center">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No active rides</h3>
                <p className="text-gray-600">Book a ride to get started</p>
              </Card>
            ) : (
              activeRides.map(ride => <RideCard key={ride.id} ride={ride} />)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </RiderLayout>
  );
};

export default RideHistory;