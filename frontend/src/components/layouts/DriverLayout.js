import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Car, Home, DollarSign, Clock, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const DriverLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/driver/home', label: 'Home', icon: Home },
    { path: '/driver/earnings', label: 'Earnings', icon: DollarSign },
    { path: '/driver/history', label: 'History', icon: Clock },
    { path: '/driver/profile', label: 'Account', icon: User },
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <Car className="w-6 h-6 text-gray-900" />
          </div>
          <div>
            <span className="text-xl font-bold">Driver Portal</span>
            <div className="text-xs text-gray-400">Hermes & Eshu</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-right">
            <div className="font-semibold">{user?.name}</div>
            <div className="text-sm text-gray-400">{user?.rating} ★</div>
          </div>
          <Avatar className="cursor-pointer" onClick={() => navigate('/driver/profile')}>
            <AvatarImage src={user?.picture} />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 bg-gray-900 text-white">
          <nav className="p-4 space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-white text-gray-900' 
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-900 text-red-400 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>

      {/* Bottom Navigation - Mobile */}
      <nav className="lg:hidden bg-gray-900 text-white flex items-center justify-around py-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all ${
                isActive ? 'text-white' : 'text-gray-400'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default DriverLayout;