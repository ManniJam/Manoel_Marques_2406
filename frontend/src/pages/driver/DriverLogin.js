import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Car, Chrome } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockUsers } from '../../mock';

const DriverLogin = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.type === 'driver') {
      navigate('/driver/home');
    }
  }, [user, navigate]);

  const handleGoogleLogin = () => {
    setLoading(true);
    // Mock Google login - in production this will use Emergent Auth
    setTimeout(() => {
      const driverUser = mockUsers.find(u => u.type === 'driver');
      login(driverUser);
      navigate('/driver/home');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 border-0 shadow-2xl bg-white">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Car className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Driver Portal</h1>
          <p className="text-gray-600">Sign in to start earning</p>
        </div>

        <Button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 py-6 text-lg rounded-xl transition-all transform hover:scale-105"
        >
          <Chrome className="mr-2 h-5 w-5" />
          {loading ? 'Signing in...' : 'Continue with Google'}
        </Button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            By continuing, you agree to our Driver Terms and Privacy Policy
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            ← Back to home
          </button>
        </div>
      </Card>
    </div>
  );
};

export default DriverLogin;