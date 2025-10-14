import React from 'react';
import { Card } from '../../components/ui/card';
import { MapPin, Calendar, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import DriverLayout from '../../components/layouts/DriverLayout';

const DriverHistory = () => {
  const completedTrips = [
    {
      id: 1,
      rider: { name: 'John Doe', rating: 4.8, picture: 'https://i.pravatar.cc/150?img=12' },
      pickup: { name: 'Downtown Plaza', address: '123 Main St' },
      dropoff: { name: 'Central Park', address: '456 Park Ave' },
      fare: 18.50,
      distance: 5.2,
      rating: 5,
      date: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      rider: { name: 'Jane Smith', rating: 4.9, picture: 'https://i.pravatar.cc/150?img=9' },
      pickup: { name: 'Airport Terminal', address: '789 Airport Rd' },
      dropoff: { name: 'Downtown Plaza', address: '123 Main St' },
      fare: 45.20,
      distance: 12.3,
      rating: 5,
      date: new Date(Date.now() - 5 * 60 * 60 * 1000)
    },
    {
      id: 3,
      rider: { name: 'Mike Johnson', rating: 4.7, picture: 'https://i.pravatar.cc/150?img=15' },
      pickup: { name: 'Shopping Mall', address: '321 Commerce St' },
      dropoff: { name: 'Business District', address: '654 Corporate Dr' },
      fare: 22.30,
      distance: 7.8,
      rating: 4,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
  ];

  return (
    <DriverLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Trip history</h1>

        <div className="space-y-4">
          {completedTrips.map(trip => (
            <Card key={trip.id} className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={trip.rider.picture} />
                      <AvatarFallback>{trip.rider.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-lg">{trip.rider.name}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {trip.rider.rating}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 rounded-full bg-black mt-2"></div>
                      <div>
                        <div className="text-sm text-gray-500">Pickup</div>
                        <div className="font-semibold">{trip.pickup.name}</div>
                        <div className="text-sm text-gray-600">{trip.pickup.address}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-black mt-1" />
                      <div>
                        <div className="text-sm text-gray-500">Drop-off</div>
                        <div className="font-semibold">{trip.dropoff.name}</div>
                        <div className="text-sm text-gray-600">{trip.dropoff.address}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">${trip.fare}</div>
                  <div className="text-sm text-gray-500">{trip.distance} km</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {trip.date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Rider rated you</span>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < trip.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DriverLayout>
  );
};

export default DriverHistory;