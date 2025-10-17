import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Car, Home, Clock, CreditCard, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const RiderLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/rider/home', label: 'Home', icon: Home },
    { path: '/rider/history', label: 'Activity', icon: Clock },
    { path: '/rider/payment', label: 'Payment', icon: CreditCard },
    { path: '/rider/profile', label: 'Account', icon: User },
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
            <Car className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">Joyze Livery</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block text-right">
            <div className="font-semibold">{user?.name}</div>
            <div className="text-sm text-gray-500">{user?.rating} ★</div>
          </div>
          <Avatar className="cursor-pointer" onClick={() => navigate('/rider/profile')}>
            <AvatarImage src={user?.picture} />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-64 bg-white border-r">
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
                      ? 'bg-black text-white' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-all"
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
      <nav className="lg:hidden bg-white border-t flex items-center justify-around py-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-lg transition-all ${
                isActive ? 'text-black' : 'text-gray-400'
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

export default RiderLayout;