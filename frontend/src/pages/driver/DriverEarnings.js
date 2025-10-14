import React from 'react';
import { Card } from '../../components/ui/card';
import { DollarSign, TrendingUp, Calendar, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import DriverLayout from '../../components/layouts/DriverLayout';

const DriverEarnings = () => {
  const { user } = useAuth();

  const earnings = {
    today: 127.50,
    week: 892.30,
    month: 3456.75,
    total: user?.earnings || 15240.50
  };

  const stats = [
    { label: 'Trips today', value: 8, icon: Calendar },
    { label: 'This week', value: 47, icon: TrendingUp },
    { label: 'Rating', value: user?.rating || 4.9, icon: Award },
  ];

  const recentEarnings = [
    { date: 'Today', time: '2:30 PM', fare: 18.50, distance: '5.2 km' },
    { date: 'Today', time: '1:15 PM', fare: 32.00, distance: '9.5 km' },
    { date: 'Today', time: '11:45 AM', fare: 22.30, distance: '7.8 km' },
    { date: 'Yesterday', time: '8:20 PM', fare: 45.20, distance: '12.3 km' },
    { date: 'Yesterday', time: '6:45 PM', fare: 15.80, distance: '4.1 km' },
  ];

  return (
    <DriverLayout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Earnings</h1>

        {/* Main Earnings Card */}
        <Card className="p-8 mb-6 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-sm text-green-100 mb-1">Total Earnings</div>
              <div className="text-5xl font-bold">${earnings.total.toLocaleString()}</div>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-green-500">
            <div>
              <div className="text-sm text-green-100">Today</div>
              <div className="text-2xl font-bold">${earnings.today}</div>
            </div>
            <div>
              <div className="text-sm text-green-100">This week</div>
              <div className="text-2xl font-bold">${earnings.week}</div>
            </div>
            <div>
              <div className="text-sm text-green-100">This month</div>
              <div className="text-2xl font-bold">${earnings.month}</div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <Icon className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
              </Card>
            );
          })}
        </div>

        {/* Recent Earnings */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Recent trips</h2>
          <div className="space-y-3">
            {recentEarnings.map((earning, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-semibold">{earning.date}</div>
                  <div className="text-sm text-gray-600">{earning.time}</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-sm text-gray-600">Distance</div>
                  <div className="font-medium">{earning.distance}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Fare</div>
                  <div className="text-2xl font-bold text-green-600">${earning.fare}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DriverLayout>
  );
};

export default DriverEarnings;