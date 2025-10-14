import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Textarea } from '../../components/ui/textarea';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import RiderLayout from '../../components/layouts/RiderLayout';
import { useToast } from '../../hooks/use-toast';

const RateRide = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { driver, pickup, dropoff, fare } = location.state || {};
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Please rate your ride",
        description: "Select a star rating before submitting",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Thank you for your feedback!",
      description: "Your rating helps us improve",
    });

    setTimeout(() => {
      navigate('/rider/home');
    }, 1000);
  };

  if (!driver) {
    navigate('/rider/home');
    return null;
  }

  return (
    <RiderLayout>
      <div className="max-w-2xl mx-auto p-6">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Ride completed!</h1>
            <p className="text-gray-600">You've arrived at your destination</p>
          </div>

          {/* Trip Summary */}
          <div className="bg-gray-50 p-6 rounded-xl mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total fare</span>
              <span className="text-3xl font-bold">${fare}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">From</span>
                <span className="font-medium">{pickup.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">To</span>
                <span className="font-medium">{dropoff.name}</span>
              </div>
            </div>
          </div>

          {/* Driver Info */}
          <div className="flex items-center space-x-4 mb-8 pb-8 border-b">
            <Avatar className="w-16 h-16">
              <AvatarImage src={driver.picture} />
              <AvatarFallback>{driver.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-bold text-lg">{driver.name}</div>
              <div className="text-sm text-gray-600">
                {driver.vehicle.color} {driver.vehicle.make} {driver.vehicle.model}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-8">
            <h3 className="font-semibold text-lg mb-4 text-center">How was your ride?</h3>
            <div className="flex justify-center space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-12 h-12 ${
                      (hoveredRating || rating) >= star
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">Add a comment (optional)</label>
            <Textarea
              placeholder="Tell us about your experience..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Submit */}
          <div className="space-y-3">
            <Button
              onClick={handleSubmit}
              className="w-full bg-black hover:bg-gray-800 py-6 text-lg rounded-xl"
            >
              Submit rating
            </Button>
            <Button
              onClick={() => navigate('/rider/home')}
              variant="ghost"
              className="w-full py-6 text-lg"
            >
              Skip
            </Button>
          </div>
        </Card>
      </div>
    </RiderLayout>
  );
};

export default RateRide;